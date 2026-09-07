import { rawV2Models } from './air-fryer-db';
import { errorsUiTranslations } from '../data/i18n/errors-ui';
import type { SupportedLanguage } from '../types/air-fryer-v2';

export interface SearchIndexItem {
  canonical_slug: string;
  brand_slug: string;
  brand_display_name: string;
  model_spec: string;
  primary_display_name: string;
  display_names: string[];
  seo_status: 'indexable' | 'noindex' | 'fallback_only';
  is_ambiguous: boolean;
  searchable_codes: string[];
  searchable_symptoms: Array<{
    key: string;
    label: string;
  }>;
  has_market_variants?: boolean;
}

export function getSearchIndex(lang: SupportedLanguage): SearchIndexItem[] {
  const t = errorsUiTranslations[lang] || errorsUiTranslations.it;
  // Use type assertion here safely, since we just added it to the translation file
  const symptomLabels = (t as any).symptomLabels || {};

  return rawV2Models.map(model => ({
    canonical_slug: model.canonical_slug,
    brand_slug: model.brand_slug,
    brand_display_name: model.brand_slug.toUpperCase(),
    model_spec: model.model_spec,
    primary_display_name: model.primary_display_name,
    display_names: model.display_names,
    seo_status: model.seo_status,
    is_ambiguous: model.metadata?.parsing_status === 'manual_review' || !model.is_deduplication_validated,
    searchable_codes: model.error_codes.map(ec => ec.code),
    searchable_symptoms: model.symptoms.map(sym => ({
      key: sym.key,
      label: symptomLabels[sym.key] || sym.key.replace(/-/g, ' ') // localized label or technical fallback
    })),
    has_market_variants: Array.isArray(model.market_variants) && model.market_variants.length > 0
  }));
}
