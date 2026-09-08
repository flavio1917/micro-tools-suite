import fs from 'fs';
import path from 'path';
import { rawV2Models } from './air-fryer-db';
import { errorsUiTranslations } from '../data/i18n/errors-ui';
import type { SupportedLanguage } from '../types/air-fryer-v2';

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

export function getSearchIndex(lang: SupportedLanguage): SearchIndexItem[] {
  const t = errorsUiTranslations[lang] || errorsUiTranslations.it;
  // Use type assertion here safely, since we just added it to the translation file
  const symptomLabels = (t as any).symptomLabels || {};

  return rawV2Models
    .map(model => {
      const isAmbiguous = !model.is_deduplication_validated || model.metadata?.parsing_status === 'manual_review' || !!model.metadata?.duplicate_group;
      const variantSlug = isAmbiguous ? slugify(model.primary_display_name) : undefined;
      
      const imgFileName = isAmbiguous 
        ? `${model.canonical_slug}-${variantSlug}.webp` 
        : `${model.canonical_slug}.webp`;
        
      const imgPath = `/images/air-fryers/${model.brand_slug}/${imgFileName}`;
      
      let hasImage = false;
      try {
        const fullPath = path.join(process.cwd(), 'public', imgPath);
        hasImage = fs.existsSync(fullPath);
      } catch (e) {
        hasImage = false;
      }
      
      const imageReferenceStatus = isAmbiguous ? 'variant_reference' : 'verified_model';
      
      return {
        type: 'model',
        canonical_slug: model.canonical_slug,
        brand_slug: model.brand_slug,
        brand_display_name: model.brand_slug.toUpperCase(),
        model_spec: model.model_spec,
        primary_display_name: model.primary_display_name,
        display_names: model.display_names,
        seo_status: model.seo_status,
        is_ambiguous: isAmbiguous,
        searchable_codes: model.error_codes.map(ec => ec.code),
        searchable_symptoms: model.symptoms.map(sym => ({
          key: sym.key,
          label: symptomLabels[sym.key] || sym.key.replace(/-/g, ' ')
        })),
        has_market_variants: Array.isArray(model.market_variants) && model.market_variants.length > 0,
        image_path: hasImage ? imgPath : undefined,
        image_reference_status: imageReferenceStatus,
        variant_slug: variantSlug
      };
    });
}
