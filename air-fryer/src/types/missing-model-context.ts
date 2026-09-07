export interface MissingModelContext {
  original_query?: string;
  brand?: string;
  model?: string;
  model_spec?: string;
  error_code?: string;
  symptom_key?: string;
  lang: 'it' | 'fr' | 'es' | 'en';
  reason:
    | 'missing_model'
    | 'missing_code'
    | 'missing_symptom'
    | 'ambiguous_variant';
}
