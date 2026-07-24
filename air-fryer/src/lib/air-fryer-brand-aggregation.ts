import type { AirFryerModel, AirFryerErrorCode } from '../types/air-fryer';

export interface AggregatedMessage extends AirFryerErrorCode {
  sourceModelId: string;
  sourceModelName: string;
}

export function getModelsByBrand(models: AirFryerModel[], brand: string): AirFryerModel[] {
  return models.filter(m => m.brand === brand);
}

export function aggregateBrandMessages(brandModels: AirFryerModel[]): AggregatedMessage[] {
  const aggregated: AggregatedMessage[] = [];

  for (const model of brandModels) {
    if (model.has_explicit_codes && model.error_codes) {
      for (const ec of model.error_codes) {
        aggregated.push({
          ...ec,
          sourceModelId: model.id,
          sourceModelName: model.actual_model
        });
      }
    }
  }

  // Sort by code alphabetically, then by model name
  return aggregated.sort((a, b) => {
    const codeCmp = a.code.localeCompare(b.code);
    if (codeCmp !== 0) return codeCmp;
    return a.sourceModelName.localeCompare(b.sourceModelName);
  });
}

export function aggregateBrandSuggestions(brandModels: AirFryerModel[]): string[] {
  const allSuggestions: string[] = [];

  for (const model of brandModels) {
    if (model.generic_suggestions) {
      allSuggestions.push(...model.generic_suggestions);
    }
  }

  // Deduplicate identical or very similar suggestions
  const uniqueSuggestions: string[] = [];
  const seenNormalized = new Set<string>();

  for (const sugg of allSuggestions) {
    // Normalize string for comparison: lowercase, remove punctuation, remove extra spaces
    const normalized = sugg.toLowerCase().replace(/[.,!?;:]/g, '').replace(/\s+/g, ' ').trim();
    
    // Very simple fuzzy matching: if a suggestion is a direct substring or very close, skip
    // For simplicity, we just use strict normalized equality here, which handles 90% of duplicates
    if (!seenNormalized.has(normalized)) {
      seenNormalized.add(normalized);
      uniqueSuggestions.push(sugg);
    }
  }

  return uniqueSuggestions;
}
