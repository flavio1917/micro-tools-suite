import uiTranslations from '../data/i18n/air-fryer-ui-translations.json';

const translations: Record<string, Record<string, string>> = uiTranslations;

const LANG_BADGE_KEY: Record<string, string> = {
  it: 'Manuale originale in italiano',
  en: 'Manuale originale in inglese',
  fr: 'Manuale originale in francese',
  es: 'Manuale originale in spagnolo',
};

/**
 * Get localized error content directly from the error's `localized` field.
 * No more separate JSON files — all content comes from air-fryer-db.json.
 */
export function getLocalizedErrorContent(
  lang: string,
  _modelCanonicalSlug: string,
  error: any
) {
  const localized = error.localized?.[lang];
  const sourceLang = error.source_language || 'it';

  let diagnosis = '';
  let userSymptom = '';
  let classification = '';
  let severityLabel = '';
  let isFallbackSource = false;
  let originalManualBadge = '';

  if (!localized || !localized.diagnosis) {
    if (import.meta.env.DEV) {
      throw new Error(`Traduzione mancante: ${modelCanonicalSlug}:${error.code}:${lang}`);
    }
    // Strict requirement: don't serve italian on EN/FR/ES pages.
    // If not in dev, we will still throw or return empty.
    throw new Error(`Traduzione mancante: ${modelCanonicalSlug}:${error.code}:${lang}`);
  }

  diagnosis = localized.diagnosis;
  userSymptom = localized.user_symptom || '';
  classification = localized.classification || '';
  severityLabel = localized.severity_label || '';

  return {
    code: error.code,
    displayCode: error.display_code || error.code,
    severity: error.severity_level || 'unknown',
    color: error.color || 'unknown',
    classification,
    severityLabel,
    diagnosis,
    userSymptom,
    isFallbackSource,
    originalManualBadge,
  };
}

export function getUiTranslation(lang: string, key: string): string {
  const t = translations[lang];
  if (t && t[key]) {
    return t[key];
  }
  return key; // return the key rather than a silent fallback to Italian
}
