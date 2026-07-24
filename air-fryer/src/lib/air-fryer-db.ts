import type { AirFryerModel } from '../types/air-fryer';
import rawDbData from '../data/air-fryer-db.json';

// Cast and normalize the JSON data
export const airFryerModels: AirFryerModel[] = (rawDbData as any[]).map((item, index) => {
  // Ensure we have a stable ID if one is missing, although the schema says it's there
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

/**
 * Get a sorted list of all unique brands
 */
export function getBrands(): string[] {
  const brands = airFryerModels.map(model => model.brand).filter(Boolean);
  return [...new Set(brands)].sort();
}

/**
 * Get a specific model by ID
 */
export function getModelById(id: string): AirFryerModel | undefined {
  return airFryerModels.find(model => model.id === id);
}

/**
 * Get all models that have explicit error codes
 */
export function getModelsWithExplicitCodes(): AirFryerModel[] {
  return airFryerModels.filter(model => model.has_explicit_codes);
}
