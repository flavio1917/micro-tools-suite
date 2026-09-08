import type { AirFryerModelV2, ErrorCodeTechnicalRecord, SupportedLanguage } from '../types/air-fryer-v2';

export interface LocalizedErrorContent {
  label: string;
  cause?: string;
  solution?: string;
  isFallback: boolean;
  sourceLanguage?: string;
}

export function getLocalizedErrorContent(
  language: SupportedLanguage,
  model: AirFryerModelV2 | null,
  error: ErrorCodeTechnicalRecord
): LocalizedErrorContent {
  const sourceLang = error.source?.source_language || (model?.brand_slug === 'cosori' ? 'en' : 'it');
  
  // Try to find translations in error object (if added by future ETL pipeline)
  // error.translations could be something like: Record<SupportedLanguage, { label: string, diagnosis: string, solution: string }>
  const translations = (error as any).translations;
  if (translations && translations[language]) {
    return {
      label: translations[language].label || error.description || '',
      cause: translations[language].diagnosis,
      solution: translations[language].solution,
      isFallback: false,
      sourceLanguage: sourceLang
    };
  }
  
  const isFallback = language !== sourceLang;
  
  return {
    label: error.description || `Error ${error.code}`,
    isFallback,
    sourceLanguage: sourceLang
  };
}
