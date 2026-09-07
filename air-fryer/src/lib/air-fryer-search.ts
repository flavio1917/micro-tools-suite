import type { SearchIndexItem } from './air-fryer-search-index';

export type SearchResultType = 'model' | 'brand' | 'code' | 'symptom' | 'fuzzy';

export interface SearchResult {
  type: SearchResultType;
  label: string;
  subLabel?: string;
  value: string;
  brand?: string;
  score: number;
  ambiguous?: boolean;
}

export function normalizeSearchStr(str: string): string {
  if (!str) return '';
  return str.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // rimuovi accenti
    .replace(/['’]/g, "") // rimuovi apostrofi
    .replace(/[-_]/g, " ") // trattini in spazi
    .replace(/air fryer/g, "airfryer") // normalizza
    .replace(/friggitrice ad aria/g, "airfryer")
    .replace(/\s+/g, " ") // collassa spazi multipli
    .trim();
}

const TYPO_MAP: Record<string, string> = {
  'filips': 'philips',
  'cosory': 'cosori',
  'molinex': 'moulinex',
  'ninjia': 'ninja'
};

export function fixTypos(str: string): string {
  let res = str;
  for (const [typo, fix] of Object.entries(TYPO_MAP)) {
    res = res.replace(new RegExp(`\\b${typo}\\b`, 'g'), fix);
  }
  return res;
}

export function performDiagnosticSearch(
  query: string,
  models: SearchIndexItem[]
): SearchResult[] {
  if (!query || query.length < 2) return [];

  const rawQuery = normalizeSearchStr(query);
  const q = fixTypos(rawQuery);
  const results = new Map<string, SearchResult>();

  const addResult = (id: string, result: SearchResult) => {
    if (!results.has(id) || results.get(id)!.score < result.score) {
      results.set(id, result);
    }
  };

  for (const m of models) {
    const isAmbiguous = m.is_ambiguous;

    // 1. Model Spec Exact (100)
    if (normalizeSearchStr(m.model_spec) === q) {
      addResult(`model_${m.canonical_slug}`, {
        type: 'model', label: m.primary_display_name, subLabel: m.model_spec, value: m.canonical_slug, brand: m.brand_slug, score: 100, ambiguous: isAmbiguous
      });
    }

    // 2. Alias Exact (95)
    for (const alias of m.display_names) {
      if (normalizeSearchStr(alias) === q) {
        addResult(`model_${m.canonical_slug}`, {
          type: 'model', label: m.primary_display_name, subLabel: alias, value: m.canonical_slug, brand: m.brand_slug, score: 95, ambiguous: isAmbiguous
        });
      }
    }

    // 3. Primary display name exact / starts-with (90/85)
    const normPrimary = normalizeSearchStr(m.primary_display_name);
    if (normPrimary === q) {
      addResult(`model_${m.canonical_slug}`, {
        type: 'model', label: m.primary_display_name, subLabel: m.brand_display_name, value: m.canonical_slug, brand: m.brand_slug, score: 90, ambiguous: isAmbiguous
      });
    } else if (normPrimary.startsWith(q)) {
      addResult(`model_${m.canonical_slug}`, {
        type: 'model', label: m.primary_display_name, subLabel: m.brand_display_name, value: m.canonical_slug, brand: m.brand_slug, score: 85, ambiguous: isAmbiguous
      });
    }

    // 4. Brand Exact Match (80)
    const normBrand = normalizeSearchStr(m.brand_slug);
    if (normBrand === q) {
      addResult(`brand_${m.brand_slug}`, {
        type: 'brand', label: m.brand_slug.toUpperCase(), value: m.brand_slug, score: 80
      });
    } else if (normBrand.startsWith(q)) {
      addResult(`brand_${m.brand_slug}`, {
        type: 'brand', label: m.brand_slug.toUpperCase(), value: m.brand_slug, score: 75
      });
    }

    // 5. Error code exact (70)
    for (const ec of m.searchable_codes) {
      const normCode = normalizeSearchStr(ec);
      if (normCode === q) {
        addResult(`code_${ec}`, {
          type: 'code', label: ec.toUpperCase(), value: ec, score: 70
        });
      }
    }

    // 6. Symptom exact/starts-with (60/55)
    for (const sym of m.searchable_symptoms) {
      const normSymLabel = normalizeSearchStr(sym.label);
      if (normSymLabel === q) {
        addResult(`symptom_${sym.key}`, {
          type: 'symptom', label: sym.label, value: sym.key, score: 60
        });
      } else if (normSymLabel.startsWith(q) || normSymLabel.includes(q)) {
        addResult(`symptom_${sym.key}`, {
          type: 'symptom', label: sym.label, value: sym.key, score: 55
        });
      }
    }
    
    // 7. Fuzzy match on model string (30)
    if (normPrimary.includes(q) || normalizeSearchStr(m.model_spec).includes(q)) {
      // Don't override higher scores
      if (!results.has(`model_${m.canonical_slug}`)) {
        addResult(`fuzzy_model_${m.canonical_slug}`, {
          type: 'fuzzy', label: m.primary_display_name, value: m.canonical_slug, brand: m.brand_slug, score: 30, ambiguous: isAmbiguous
        });
      }
    }
  }

  // Sort and deduplicate
  const finalResults = Array.from(results.values()).sort((a, b) => b.score - a.score);
  const uniqueResults: SearchResult[] = [];
  const seen = new Set<string>();
  
  for (const r of finalResults) {
    const key = `${r.type}_${r.value}`;
    if (!seen.has(key)) {
      seen.add(key);
      uniqueResults.push(r);
    }
    if (uniqueResults.length >= 10) break;
  }

  return uniqueResults;
}
