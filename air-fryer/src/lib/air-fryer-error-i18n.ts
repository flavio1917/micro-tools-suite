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

  if (localized && localized.diagnosis) {
    // We have localized content for this language
    diagnosis = localized.diagnosis;
    userSymptom = localized.user_symptom || '';
    classification = localized.classification || '';
    severityLabel = localized.severity_label || '';
  } else if (error.localized?.[sourceLang]?.diagnosis) {
    // Fallback to source language
    const fallback = error.localized[sourceLang];
    diagnosis = fallback.diagnosis;
    userSymptom = fallback.user_symptom || '';
    classification = fallback.classification || '';
    severityLabel = fallback.severity_label || '';
    isFallbackSource = true;
  } else {
    // Try any available language
    for (const tryLang of ['it', 'en', 'fr', 'es']) {
      const tryLoc = error.localized?.[tryLang];
      if (tryLoc?.diagnosis) {
        diagnosis = tryLoc.diagnosis;
        userSymptom = tryLoc.user_symptom || '';
        classification = tryLoc.classification || '';
        severityLabel = tryLoc.severity_label || '';
        isFallbackSource = lang !== tryLang;
        break;
      }
    }
  }

  if (isFallbackSource) {
    const badgeKey = LANG_BADGE_KEY[sourceLang] || LANG_BADGE_KEY['it'];
    originalManualBadge = getUiTranslation(lang, badgeKey);
  }

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
  const t = translations[lang] || translations['it'];
  return t?.[key] || translations['it']?.[key] || key;
}
