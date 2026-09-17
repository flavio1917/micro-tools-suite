import fs from 'fs';
import path from 'path';
import { rawV2Models } from './air-fryer-db';
import { errorsUiTranslations } from '../data/i18n/errors-ui';

export interface SearchIndexItem {
  type?: 'model' | 'brand' | 'code' | 'symptom';
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
  image_path?: string;
  image_reference_status?: 'verified_model' | 'variant_reference' | 'needs_review';
  variant_slug?: string;
}

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export function getSearchIndex(lang: string): SearchIndexItem[] {
  return rawV2Models
    .map((model: any) => {
      const isAmbiguous = model.is_deduplication_validated === false;
      const variantSlug = isAmbiguous ? slugify(model.model_names?.[lang] || model.model_names?.it || '') : undefined;
      
      // Use image_path from the database if available
      const imgPath = model.image_path || `/images/air-fryers/${model.brand_slug}/${model.canonical_slug}.webp`;
      
      let hasImage = false;
      try {
        const fullPath = path.join(process.cwd(), 'public', imgPath);
        hasImage = fs.existsSync(fullPath);
      } catch (e) {
        hasImage = false;
      }
      
      const imageReferenceStatus = isAmbiguous ? 'variant_reference' : 'verified_model';
      
      // Get display name from localized model_names
      const displayName = model.model_names?.[lang] || model.model_names?.it || model.model_spec;
      const allDisplayNames = Object.values(model.model_names || {}).filter(Boolean) as string[];

      return {
        type: 'model',
        canonical_slug: model.canonical_slug,
        brand_slug: model.brand_slug,
        brand_display_name: (model.brand || model.brand_slug).toUpperCase(),
        model_spec: model.model_spec,
        primary_display_name: displayName,
        display_names: allDisplayNames.length > 0 ? allDisplayNames : [model.model_spec],
        seo_status: model.seo_status || 'indexable',
        is_ambiguous: isAmbiguous,
        searchable_codes: (model.error_codes || []).map((ec: any) => ec.code),
        searchable_symptoms: [],
        has_market_variants: false,
        image_path: hasImage ? imgPath : undefined,
        image_reference_status: imageReferenceStatus,
        variant_slug: variantSlug
      };
    });
}
