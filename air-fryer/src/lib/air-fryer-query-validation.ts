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

  // Validate model: known canonical_slug and not ambiguous
  if (rawModel) {
    const modelItem = index.find(m => m.canonical_slug === rawModel);
    if (modelItem && !modelItem.is_ambiguous) {
      state.model = rawModel;
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
    const isBrandKnown = index.some(m => m.brand_slug === rawBrand);
    if (isBrandKnown) {
      state.brand = rawBrand;
    }
  }

  return state;
}
