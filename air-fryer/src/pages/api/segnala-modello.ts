import type { APIRoute } from 'astro';

export const prerender = false;

// ─── Allowed values ──────────────────────────────────────────────────────────
const ALLOWED_REASONS = new Set([
  'missing_model',
  'missing_code',
  'missing_symptom',
  'ambiguous_variant',
]);

const ALLOWED_LANGS = new Set(['it', 'en', 'es', 'fr']);

// Max field lengths (chars)
const LIMITS = {
  brand: 100,
  model_spec: 100,
  error_code: 20,
  symptom_key: 100,
  lang: 2,
  reason: 30,
  original_query: 0,  // not accepted — blocked
  honeypot: 0,        // must be empty
};

// ─── Sanitize ─────────────────────────────────────────────────────────────────
function sanitize(input: unknown, maxLength: number): string {
  if (typeof input !== 'string') return '';
  const trimmed = input.trim().substring(0, maxLength);
  // Strip HTML/script tags and dangerous characters
  return trimmed
    .replace(/<[^>]*>/g, '')       // strip HTML tags
    .replace(/[<>'"\\]/g, '')      // strip remaining dangerous chars
    .trim();
}

// ─── Parse form body (multipart/urlencoded or JSON) ───────────────────────────
async function parseBody(request: Request): Promise<Record<string, string>> {
  const contentType = request.headers.get('content-type') || '';
  
  if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
    const formData = await request.formData();
    const result: Record<string, string> = {};
    for (const [key, value] of formData.entries()) {
      if (typeof value === 'string') result[key] = value;
    }
    return result;
  }
  
  if (contentType.includes('application/json')) {
    try {
      const json = await request.json();
      if (typeof json === 'object' && json !== null) return json as Record<string, string>;
    } catch { /* ignore */ }
  }
  
  return {};
}

// ─── Localised thank-you page redirect path ───────────────────────────────────
function thankYouPath(lang: string): string {
  const paths: Record<string, string> = {
    it: '/strumenti/codici-errore-friggitrice-ad-aria/?feedback=inviato',
    en: '/en/tools/air-fryer-error-codes/?feedback=inviato',
    es: '/es/herramientas/codigos-error-freidora-aire/?feedback=inviato',
    fr: '/fr/outils/codes-erreur-friteuse-air/?feedback=inviato',
  };
  return paths[lang] || paths['it'];
}

// ─── Rate limit via simple timestamp check ────────────────────────────────────
// Honeypot: if 'website' field (hidden, bots fill it) is non-empty → spam
function isHoneypotTriggered(body: Record<string, string>): boolean {
  return typeof body['website'] === 'string' && body['website'].length > 0;
}

// ─── Endpoint: reject GET ─────────────────────────────────────────────────────
export const GET: APIRoute = () => {
  return new Response('Method Not Allowed', {
    status: 405,
    headers: { Allow: 'POST' },
  });
};

// ─── Endpoint: POST ───────────────────────────────────────────────────────────
export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await parseBody(request);

    // Anti-spam: honeypot
    if (isHoneypotTriggered(body)) {
      // Silent success to not reveal detection to bots
      return Response.redirect(thankYouPath('it'), 303);
    }

    // ── Field extraction + sanitize ──
    const lang     = sanitize(body['lang'], 2);
    const reason   = sanitize(body['reason'], 30);
    const brand    = sanitize(body['brand'], 100);
    const model    = sanitize(body['model_spec'] || body['model'], 100);
    const code     = sanitize(body['error_code'], 20);
    const symptom  = sanitize(body['symptom_key'], 100);
    // NOTE: original_query is NOT saved — privacy rule
    // NOTE: email/name/phone are never in this form

    // ── Validation ──
    const validLang = ALLOWED_LANGS.has(lang) ? lang : 'it';
    
    if (!ALLOWED_REASONS.has(reason)) {
      const isHtmlForm = (request.headers.get('content-type') || '').includes('urlencoded') ||
                         (request.headers.get('content-type') || '').includes('form-data');
      if (isHtmlForm) {
        return Response.redirect(thankYouPath(validLang) + '&errore=reason', 303);
      }
      return new Response(JSON.stringify({ success: false, code: 'INVALID_REASON' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // At least one meaningful field must be present
    if (!brand && !model && !code && !symptom) {
      const isHtmlForm = (request.headers.get('content-type') || '').includes('urlencoded') ||
                         (request.headers.get('content-type') || '').includes('form-data');
      if (isHtmlForm) {
        return Response.redirect(thankYouPath(validLang) + '&errore=campi', 303);
      }
      return new Response(JSON.stringify({ success: false, code: 'MISSING_FIELDS' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // ── Build report (no PII) ──
    const report = {
      timestamp: new Date().toISOString(),
      lang: validLang,
      reason,
      brand:      brand   || null,
      model_spec: model   || null,
      error_code: code    || null,
      symptom_key: symptom || null,
      // original_query deliberately omitted
    };

    // ── Dispatch ──
    const webhookUrl =
      (typeof (import.meta as any).env?.WEBHOOK_URL === 'string'
        ? (import.meta as any).env.WEBHOOK_URL
        : undefined) ||
      (typeof process !== 'undefined' ? process.env?.WEBHOOK_URL : undefined);

    if (webhookUrl) {
      const lines = [
        `🔔 *Segnalazione Air Fryer*`,
        `• Lang: ${validLang}`,
        `• Reason: ${reason}`,
        brand      ? `• Brand: ${brand}`          : null,
        model      ? `• Modello: ${model}`         : null,
        code       ? `• Codice: ${code}`           : null,
        symptom    ? `• Sintomo: ${symptom}`       : null,
      ].filter(Boolean).join('\n');

      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: lines }),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } else {
      // Serverless-safe fallback: structured log only (no FS write in production)
      console.log('[segnala-modello]', JSON.stringify(report));
    }

    // ── Response ──
    const isHtmlForm = (request.headers.get('content-type') || '').includes('urlencoded') ||
                       (request.headers.get('content-type') || '').includes('form-data');
    if (isHtmlForm) {
      return Response.redirect(thankYouPath(validLang), 303);
    }
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error('[segnala-modello] Server error:', (err as Error).message);
    return new Response(JSON.stringify({ success: false, code: 'SERVER_ERROR' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
