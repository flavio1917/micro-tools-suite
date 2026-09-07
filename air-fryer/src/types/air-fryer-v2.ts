export type SupportedLanguage = 'it' | 'fr' | 'es' | 'en';
export type SourceLanguage = SupportedLanguage | 'zh' | 'de' | 'nl' | 'ja' | 'ko' | string;

export type Severity =
  | 'safe_check'
  | 'caution'
  | 'stop_and_support';

export type EvidenceLevel =
  | 'model_specific'
  | 'brand_generic'
  | 'universal_guidance';

export type SeoStatus =
  | 'indexable'
  | 'noindex'
  | 'fallback_only';

export interface TechnicalSpecs {
  wattage?: number;
  voltage?: string;
  frequency_hz?: number;
  capacity_liters?: number;
  min_temp_celsius?: number;
  max_temp_celsius?: number;
  timer_max_minutes?: number;
  basket_count?: number;
  dimensions_mm?: {
    width?: number;
    depth?: number;
    height?: number;
  };
  weight_kg?: number;
  technology?: string;
  connectivity?: boolean;
}

export interface SourceReference {
  manual_url?: string;
  specs_url?: string;
  source_language?: SourceLanguage;
  source_name?: string;
  source_page?: number;
  retrieved_at?: string;
}

export interface ErrorCodeTechnicalRecord {
  code: string;
  severity: Severity;
  evidence_level: EvidenceLevel;
  diy_fixable: boolean;
  source: SourceReference;
}

export interface SymptomTechnicalRecord {
  key: string;
  severity: Severity;
  evidence_level: EvidenceLevel;
  source: SourceReference;
}

export interface MarketVariant {
  market: 'IT' | 'EU' | 'FR' | 'ES' | 'US' | 'CA' | 'UK' | 'AU' | 'GLOBAL';
  voltage?: string;
  frequency_hz?: number;
  specs_override?: Partial<TechnicalSpecs>;
  error_codes_override?: ErrorCodeTechnicalRecord[];
  manual_url?: string;
}

export interface DataQualityMetadata {
  source_row_numbers?: number[];
  raw_model_spec?: string;
  parsing_status: 'parsed' | 'partial' | 'manual_review';
  review_status: 'pending' | 'approved' | 'rejected';
  review_notes?: string[];
  duplicate_group?: string;
}

export interface AirFryerModelV2 {
  canonical_slug: string;
  route_slug?: string;
  model_spec: string;
  primary_display_name: string;
  display_names: string[];
  brand_slug: string;
  specs: TechnicalSpecs;
  error_codes: ErrorCodeTechnicalRecord[];
  symptoms: SymptomTechnicalRecord[];
  source: SourceReference;
  market_variants?: MarketVariant[];
  seo_status: SeoStatus;
  is_deduplication_validated: boolean;
  metadata?: DataQualityMetadata;
  updated_at: string;
}

