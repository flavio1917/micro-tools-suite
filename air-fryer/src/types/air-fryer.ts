export type DocumentType = 'manual' | 'spec_sheet';
export type ErrorCodeType = 'error' | 'warning' | 'status' | 'feature_message' | 'symptom';
export type ActionLevel = 'assistenza' | 'fermare_e_verificare' | 'verifica_utente';

export interface AirFryerDocument {
  type: DocumentType;
  matches_model: boolean;
  label: string;
}

export interface AirFryerErrorCode {
  code: string;
  description: string;
  meaning: string;
  suggestions: string[];
  type?: ErrorCodeType;
  action_level?: ActionLevel;
}

export interface AirFryerModel {
  id: string;
  brand: string;
  actual_model: string;
  user_label: string;
  manual_url?: string;
  document?: AirFryerDocument;
  capacity_l: number | null;
  capacity_kg_fries: number | null;
  dual_zone: boolean;
  model_type: 'dual_basket' | 'single_zone';
  notable_features: string[];
  error_codes: AirFryerErrorCode[];
  has_explicit_codes: boolean;
  error_note: string;
  generic_suggestions: string[];
  notes: string;
}

export interface AirFryerFiltersState {
  q: string;
  brand: string;
  messageType: string;
  dualBasketOnly: boolean;
  explicitCodesOnly: boolean;
}
