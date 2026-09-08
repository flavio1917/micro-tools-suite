import type { SearchIndexItem } from './air-fryer-search-index';

export interface ValidatedDiagnosticState {
  brand?: string;
  model?: string;
  code?: string;
  symptom?: string;
  reviewModel?: string;
}

export function validateDiagnosticParams(
  params: URLSearchParams,
  index: SearchIndexItem[]
): ValidatedDiagnosticState {
  const sanitize = (val: string | null) => val ? val.replace(/[<>]/g, '').trim() : undefined;
  
  const rawBrand = sanitize(params.get('brand'));
  const rawModel = sanitize(params.get('model'));
  const rawCode = sanitize(params.get('code'));
  const rawSymptom = sanitize(params.get('symptom'));
  const rawReviewModel = sanitize(params.get('review-model'));
  
  const state: ValidatedDiagnosticState = {};
  
  // Validate code: ^[A-Z]{1,4}[0-9]{0,3}$ or known in index
  if (rawCode) {
    const isCodeFormatValid = /^[A-Z]{1,4}[0-9]{0,3}$/i.test(rawCode);
    const isCodeKnown = index.some(m => m.searchable_codes.some(c => c.toLowerCase() === rawCode.toLowerCase()));
    if (isCodeFormatValid || isCodeKnown) {
      // Keep original case if known, else uppercase
      const known = index.find(m => m.searchable_codes.some(c => c.toLowerCase() === rawCode.toLowerCase()))
        ?.searchable_codes.find(c => c.toLowerCase() === rawCode.toLowerCase());
      state.code = known || rawCode.toUpperCase();
    }
  }

  // Validate symptom: known in index
  if (rawSymptom) {
    const isSymptomKnown = index.some(m => m.searchable_symptoms.some(s => s.key === rawSymptom));
    if (isSymptomKnown) {
      state.symptom = rawSymptom;
    }
  }

  const rawSpec = sanitize(params.get('spec'));
  
  // Helper to normalize strings for comparison
  const normalize = (s?: string) => s ? s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') : '';

  // Validate model: known canonical_slug and not ambiguous
  if (rawModel) {
    let modelItem = undefined;

    // 1. brand + model + spec
    if (rawBrand && rawSpec) {
      modelItem = index.find(m => 
        m.brand_slug === normalize(rawBrand) &&
        (normalize(m.primary_display_name) === normalize(rawModel) || normalize(m.route_slug) === normalize(rawModel)) &&
        normalize(m.model_spec) === normalize(rawSpec)
      );
    }
    
    // 2. brand + model
    if (!modelItem && rawBrand) {
      modelItem = index.find(m => 
        m.brand_slug === normalize(rawBrand) &&
        (normalize(m.primary_display_name) === normalize(rawModel) || normalize(m.route_slug) === normalize(rawModel) || normalize(m.model_spec) === normalize(rawModel))
      );
    }

    // 3. canonical_slug legacy
    if (!modelItem) {
      modelItem = index.find(m => m.canonical_slug === rawModel);
    }

    if (modelItem && !modelItem.is_ambiguous) {
      state.model = modelItem.canonical_slug; // Internally we use canonical_slug
      state.brand = modelItem.brand_slug; // Auto-set valid brand
    }
  }

  // Validate review-model: known canonical_slug and is ambiguous
  if (rawReviewModel) {
    const modelItem = index.find(m => m.canonical_slug === rawReviewModel);
    if (modelItem && modelItem.is_ambiguous) {
      state.reviewModel = rawReviewModel;
      state.brand = modelItem.brand_slug;
    }
  }

  // Validate brand: known brand_slug (if not already set by model)
  if (rawBrand && !state.brand) {
    if (rawBrand === 'other') {
      state.brand = 'other';
    } else {
      const isBrandKnown = index.some(m => m.brand_slug === rawBrand);
      if (isBrandKnown) {
        state.brand = rawBrand;
      }
    }
  }

  return state;
}
