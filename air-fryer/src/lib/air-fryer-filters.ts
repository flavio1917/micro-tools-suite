import type { AirFryerModel, AirFryerFiltersState } from '../types/air-fryer';

/**
 * Normalize string for case-insensitive and accent-insensitive search
 */
export function normalizeString(str: string): string {
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

/**
 * Creates the default empty filter state
 */
export function createDefaultFilters(): AirFryerFiltersState {
  return {
    q: '',
    brand: '',
    messageType: 'all',
    dualBasketOnly: false,
    explicitCodesOnly: false,
  };
}

/**
 * Parse filters from a URL or URLSearchParams object
 */
export function parseFiltersFromUrl(url: URL | string): AirFryerFiltersState {
  const searchParams = typeof url === 'string' ? new URL(url).searchParams : url.searchParams;
  
  return {
    q: searchParams.get('q') || '',
    brand: searchParams.get('brand') || '',
    messageType: searchParams.get('message') || 'all',
    dualBasketOnly: searchParams.get('dual') === 'true',
    explicitCodesOnly: searchParams.get('codes') === 'true',
  };
}

/**
 * Generate a new URL with the applied filters
 */
export function writeFiltersToUrl(filters: AirFryerFiltersState, currentUrl: URL | string): URL {
  const url = new URL(currentUrl.toString());
  
  if (filters.q) url.searchParams.set('q', filters.q);
  else url.searchParams.delete('q');
  
  if (filters.brand) url.searchParams.set('brand', filters.brand);
  else url.searchParams.delete('brand');
  
  if (filters.messageType && filters.messageType !== 'all') url.searchParams.set('message', filters.messageType);
  else url.searchParams.delete('message');
  
  if (filters.dualBasketOnly) url.searchParams.set('dual', 'true');
  else url.searchParams.delete('dual');
  
  if (filters.explicitCodesOnly) url.searchParams.set('codes', 'true');
  else url.searchParams.delete('codes');
  
  return url;
}

/**
 * Filter and sort a list of models based on the filter state
 */
export function filterAirFryerModels(models: AirFryerModel[], filters: AirFryerFiltersState): AirFryerModel[] {
  let filtered = [...models];

  // 1. Filter by Brand
  if (filters.brand) {
    filtered = filtered.filter(m => m.brand === filters.brand);
  }

  // 2. Filter by Dual Basket
  if (filters.dualBasketOnly) {
    filtered = filtered.filter(m => m.dual_zone || m.model_type === 'dual_basket');
  }

  // 3. Filter by Explicit Codes
  if (filters.explicitCodesOnly) {
    filtered = filtered.filter(m => m.has_explicit_codes);
  }

  // 4. Text Search (q)
  if (filters.q) {
    const qNorm = normalizeString(filters.q);
    filtered = filtered.filter(m => {
      const brandMatch = normalizeString(m.brand).includes(qNorm);
      const modelMatch = normalizeString(m.actual_model).includes(qNorm) || normalizeString(m.user_label).includes(qNorm);
      
      // Also check inside error codes for matching code string
      const codeMatch = m.error_codes?.some(ec => normalizeString(ec.code).includes(qNorm));
      
      return brandMatch || modelMatch || codeMatch;
    });
  }

  // 5. Message Type
  if (filters.messageType && filters.messageType !== 'all') {
    filtered = filtered.filter(m => {
      if (!m.error_codes || m.error_codes.length === 0) {
        // If they filter by 'error' or 'status' but this model has no explicit codes, it shouldn't match
        return false;
      }
      
      if (filters.messageType === 'error') {
        return m.error_codes.some(ec => ec.type === 'error' || ec.type === 'warning');
      }
      if (filters.messageType === 'status') {
        return m.error_codes.some(ec => ec.type === 'status' || ec.type === 'feature_message');
      }
      
      return true;
    });
  }

  // 6. Sorting: brand alphabetically, then model alphabetically
  filtered.sort((a, b) => {
    const brandCompare = a.brand.localeCompare(b.brand);
    if (brandCompare !== 0) return brandCompare;
    return a.actual_model.localeCompare(b.actual_model);
  });

  return filtered;
}
