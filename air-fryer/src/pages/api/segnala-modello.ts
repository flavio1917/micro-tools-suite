import type { APIRoute } from 'astro';
import * as fs from 'fs';
import * as path from 'path';

// Utility per sanificare le stringhe prevenendo XSS injection
function sanitize(input: any, maxLength: number = 250): string {
  if (typeof input !== 'string' || !input) return '';
  const trimmed = input.trim();
  const truncated = trimmed.substring(0, maxLength);
  
  // Escape dei caratteri pericolosi
  return truncated
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // Estrazione e check del JSON in ingresso
    const body = await request.json().catch(() => null);
    
    if (!body) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Payload mancante o formato non valido.'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Estrazione e sanificazione dei campi
    const brand = sanitize(body.brand, 100);
    const model = sanitize(body.model, 100);
    const symptom = sanitize(body.symptom, 500);
    const manualUrl = sanitize(body.manual_url, 300);
    const consent = body.consent === true || body.consent === 'true';

    // Validazione base
    if (!brand || !model || !symptom || !consent) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Dati obbligatori mancanti o consenso privacy non prestato.'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Strutturazione del report finale
    const reportData = {
      timestamp: new Date().toISOString(),
      brand,
      model,
      symptom,
      manualUrl,
      consent
    };

    // Logica di Salvataggio
    // Supporto per variabili d'ambiente Astro `import.meta.env` e Node `process.env`
    const webhookUrl = (import.meta as any).env?.WEBHOOK_URL || process.env.WEBHOOK_URL;

    if (webhookUrl) {
      // Invia i dati al Webhook configurato
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `🔔 *Nuova segnalazione modello (Friggitrice ad Aria)*\n` +
                `- *Brand*: ${brand}\n` +
                `- *Modello*: ${model}\n` +
                `- *Sintomo*: ${symptom}\n` +
                `- *Manuale*: ${manualUrl || 'Nessuno'}`
        })
      });

      if (!response.ok) {
        console.error('Errore webhook:', await response.text());
        throw new Error('Impossibile contattare il webhook esterno.');
      }
    } else {
      // Fallback: scrivi su un file locale `pending-models.jsonl`
      const dataDir = path.resolve(process.cwd(), 'src/data');
      const filePath = path.join(dataDir, 'pending-models.jsonl');
      const logLine = JSON.stringify(reportData) + '\n';
      
      try {
        // Garantisce che la cartella esista
        if (!fs.existsSync(dataDir)) {
          fs.mkdirSync(dataDir, { recursive: true });
        }
        fs.appendFileSync(filePath, logLine, 'utf8');
      } catch (err) {
        // Fallback estremo per ambienti serverless read-only
        console.error('Errore scrittura fallback file FS:', err);
        console.log('[Missing Model Report]', JSON.stringify(reportData));
      }
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Segnalazione acquisita con successo.'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Errore Server nell\'API segnala-modello:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Si è verificato un errore interno. Riprova più tardi.'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
