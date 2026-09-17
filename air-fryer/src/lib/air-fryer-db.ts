import type { AirFryerModel as LegacyAirFryerModel } from '../types/air-fryer';
import rawDbData from '../data/air-fryer-db.json';
import { overrides } from '../data/air-fryer-overrides';

// The new DB format has localized model names and error content directly.
export const rawV2Models: any[] = rawDbData as any[];

// Cast and normalize the JSON data into the legacy model format
export const airFryerModels: LegacyAirFryerModel[] = (rawDbData as any[])
  .map((item: any) => {
    const override = overrides[item.canonical_slug];

    // Apply route_slug override
    if (override?.route_slug) {
      item.route_slug = override.route_slug;
    }
    if (override?.is_deduplication_validated !== undefined) {
      item.is_deduplication_validated = override.is_deduplication_validated;
    }

    // Default route_slug if not set
    if (!item.route_slug) {
      item.route_slug = item.canonical_slug.split('-').slice(1).join('-');
    }

    return {
      id: item.canonical_slug,
      brand: item.brand_slug,
      actual_model: item.model_spec,
      user_label: item.model_names?.it || item.model_names?.en || '',
      model_spec: item.model_spec,
      primary_display_name: item.model_names?.it || item.model_names?.en || '',
      manual_url: item.source?.manual_url,
      capacity_l: item.specs?.capacity_liters ?? null,
      capacity_kg_fries: null,
      dual_zone: item.specs?.basket_count === 2,
      model_type: item.specs?.basket_count === 2 ? 'dual_basket' : 'single_zone',
      notable_features: [],
      error_codes: (item.error_codes || []).map((ec: any) => {
        return {
          code: ec.code,
          display_code: ec.display_code,
          aliases: ec.aliases || [],
          // Pass through the full localized structure
          localized: ec.localized,
          severity_level: ec.severity_level,
          color: ec.color,
          source_language: ec.source_language,
          description: '',
          meaning: '',
          suggestions: [],
          type: 'error',
          action_level: '',
          severity: ec.severity_level || 'unknown',
          evidence_level: 'model_specific',
          diy_fixable: false,
          source: ec.source,
        };
      }),
      has_explicit_codes: (item.error_codes || []).length > 0,
      error_note: '',
      generic_suggestions: [],
      notes: ''
    } as LegacyAirFryerModel;
  });

export function getBrands(): string[] {
  const brands = airFryerModels.map(model => model.brand).filter(Boolean);
  return [...new Set(brands)].sort();
}

export function getModelById(id: string): LegacyAirFryerModel | undefined {
  return airFryerModels.find(model => model.id === id);
}

export function getModelsWithExplicitCodes(): LegacyAirFryerModel[] {
  return airFryerModels.filter(model => model.has_explicit_codes);
}
