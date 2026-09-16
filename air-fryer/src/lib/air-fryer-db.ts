import type { AirFryerModel as LegacyAirFryerModel } from '../types/air-fryer';
import type { AirFryerModelV2 } from '../types/air-fryer-v2';
import rawDbData from '../data/air-fryer-dataset';

// Detect if data is V2 by checking for canonical_slug
export const rawV2Models: AirFryerModelV2[] = rawDbData as any[];
const isV2 = rawDbData.length > 0 && ('canonical_slug' in rawDbData[0]);

// Cast and normalize the JSON data
export const airFryerModels: LegacyAirFryerModel[] = isV2 
  ? (rawDbData as any[])
      .filter((item: AirFryerModelV2) => {
        // DO NOT expose unverified models to the legacy verified views
        const isVerified = item.is_deduplication_validated !== false && item.metadata?.parsing_status !== 'manual_review';
        // Also check if they have valid error codes (if evidence_level or severity was missing they wouldn't be verified, but V2 schema enforces them)
        return isVerified;
      })
      .map((item: AirFryerModelV2, index) => {
      return {
        id: item.canonical_slug,
        brand: item.brand_slug,
        actual_model: item.model_spec,
        user_label: item.primary_display_name,
        model_spec: item.model_spec,
        primary_display_name: item.primary_display_name,
        manual_url: item.source?.manual_url,
        capacity_l: item.specs?.capacity_liters ?? null,
        capacity_kg_fries: null,
        dual_zone: item.specs?.basket_count === 2,
        model_type: item.specs?.basket_count === 2 ? 'dual_basket' : 'single_zone',
        notable_features: [],
        error_codes: item.error_codes.map(ec => {
          return {
            code: ec.code,
            display_code: ec.display_code,
            aliases: ec.aliases,
            source_text: ec.source_text,
            description: ec.source_text,
            meaning: ec.source_text ? 'Vedi descrizione' : 'Errore tecnico',
            suggestions: [],
            type: 'error',
            action_level: ec.action_level,
            severity: ec.severity,
            evidence_level: ec.evidence_level,
            diy_fixable: ec.diy_fixable,
            source_language: ec.source_language || ec.source?.source_language
          };
        }),
        has_explicit_codes: item.error_codes.length > 0,
        error_note: '',
        generic_suggestions: [],
        notes: ''
      } as LegacyAirFryerModel;
    })
  : (rawDbData as any[]).map((item, index) => {
      const id = item.id || `model-${item.brand}-${item.actual_model}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return {
        ...item,
        id,
        capacity_l: item.capacity_l ?? null,
        capacity_kg_fries: item.capacity_kg_fries ?? null,
        dual_zone: Boolean(item.dual_zone),
        notable_features: item.notable_features || [],
        error_codes: item.error_codes || [],
        has_explicit_codes: Boolean(item.has_explicit_codes),
        generic_suggestions: item.generic_suggestions || [],
      };
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
