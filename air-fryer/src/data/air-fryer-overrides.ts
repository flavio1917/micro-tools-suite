export type SeoStatus = 'indexable' | 'noindex' | 'fallback_only';
export type Severity = 'safe_check' | 'caution' | 'stop_and_support' | 'manual_review';
export type EvidenceLevel = 'model_specific' | 'brand_inferred' | 'generic';

export interface ErrorOverride {
  severity?: Severity;
  evidence_level?: EvidenceLevel;
}

export interface ModelOverrides {
  route_slug?: string;
  seo_status_override?: SeoStatus;
  is_deduplication_validated?: boolean;
  errors?: Record<string, ErrorOverride>;
}

export const overrides: Record<string, ModelOverrides> = {
  'philips-na351': {
    route_slug: 'na351',
    seo_status_override: 'indexable',
    is_deduplication_validated: true,
    errors: {
      'E1': { severity: 'caution' },
      'E4': { severity: 'caution' },
      'E12': { severity: 'caution' },
    }
  },
  'philips-na220-na221': {
    route_slug: 'na220-na221',
    seo_status_override: 'indexable',
    is_deduplication_validated: true,
    errors: {
      'E1': { severity: 'caution' },
      'E4': { severity: 'caution' },
      'E6': { severity: 'caution' },
      'E9': { severity: 'caution' },
      'E12': { severity: 'caution' },
    }
  }
};

// Stato SEO effettivo di una pagina modello. Regola: indicizzabile SOLO se
// esplicitamente validata qui con seo_status_override: 'indexable'; tutto il resto
// è noindex (pagine generate dal database, non ancora verificate a mano).
// Deve restare allineato con INDEXABLE_OVERRIDES in astro.config.mjs (sitemap):
// scripts/seo-check.mjs segnala ogni pagina indicizzabile assente dalla sitemap.
export function getEffectiveSeoStatus(canonicalSlug: string): SeoStatus {
  return overrides[canonicalSlug]?.seo_status_override === 'indexable' ? 'indexable' : 'noindex';
}
