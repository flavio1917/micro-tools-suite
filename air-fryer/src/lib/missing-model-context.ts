import type { MissingModelContext } from '../types/missing-model-context';

export function serializeMissingModelContext(ctx: MissingModelContext): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(ctx)) {
    if (value) params.set(key, value);
  }
  return params.toString();
}

export function parseMissingModelContext(params: URLSearchParams): Partial<MissingModelContext> {
  const ctx: Partial<MissingModelContext> = {};
  if (params.get('original_query')) ctx.original_query = params.get('original_query')!;
  if (params.get('brand')) ctx.brand = params.get('brand')!;
  if (params.get('model')) ctx.model = params.get('model')!;
  if (params.get('model_spec')) ctx.model_spec = params.get('model_spec')!;
  if (params.get('error_code')) ctx.error_code = params.get('error_code')!;
  if (params.get('symptom_key')) ctx.symptom_key = params.get('symptom_key')!;
  
  const lang = params.get('lang');
  if (lang === 'it' || lang === 'en' || lang === 'es' || lang === 'fr') ctx.lang = lang;
  
  const reason = params.get('reason');
  if (['missing_model', 'missing_code', 'missing_symptom', 'ambiguous_variant'].includes(reason as string)) {
    ctx.reason = reason as MissingModelContext['reason'];
  }
  
  return ctx;
}
