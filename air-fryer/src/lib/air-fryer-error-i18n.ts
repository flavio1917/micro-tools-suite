import it from '../data/i18n/air-fryer-errors-it.json';
import en from '../data/i18n/air-fryer-errors-en.json';
import fr from '../data/i18n/air-fryer-errors-fr.json';
import es from '../data/i18n/air-fryer-errors-es.json';

const translations: Record<string, any> = { it, en, fr, es };

export function getLocalizedErrorContent(
  lang: string,
  modelCanonicalSlug: string,
  error: any
) {
  const t = translations[lang] || translations['it'];
  
  const normalizedGenericCode = error.code.replace(/^E0/, 'E');
  
  const modelMatch = t.models[modelCanonicalSlug]?.[error.code];
  const genericMatch = t.generic[error.code] || t.generic[normalizedGenericCode];
  
  let label = '';
  let diagnosis = '';
  let solution = '';
  let sourceLanguage = error.source_language || 'it';
  let isFallbackSource = false;
  let originalManualBadge = '';

  if (modelMatch && modelMatch.diagnosis) {
    label = modelMatch.label || genericMatch?.label || '';
    diagnosis = modelMatch.diagnosis;
    solution = modelMatch.solution || '';
    
    if (diagnosis === error.source_text && lang !== error.source_language) {
      isFallbackSource = true;
      sourceLanguage = error.source_language;
    } else {
      sourceLanguage = lang;
    }
  } else if (genericMatch) {
    label = genericMatch.label;
    diagnosis = genericMatch.diagnosis;
    solution = genericMatch.solution;
    sourceLanguage = lang;
  } else {
    label = t.ui['Errore tecnico'] || 'Technical error';
    diagnosis = error.source_text || '';
    solution = ''; 
    isFallbackSource = lang !== error.source_language;
    sourceLanguage = error.source_language || 'it';
  }
  
  if (!label) {
    label = t.ui['Errore tecnico'] || 'Technical error';
  }

  if (isFallbackSource) {
    if (sourceLanguage === 'en') {
      originalManualBadge = t.ui['Manuale originale in inglese'];
    } else if (sourceLanguage === 'it') {
      originalManualBadge = t.ui['Manuale originale in italiano'];
    } else {
      originalManualBadge = t.ui['Traduzione informativa dal manuale originale'];
    }
  }
  
  return {
    code: error.code,
    displayCode: error.display_code || error.code,
    severity: error.severity || 'caution',
    diyFixable: error.diy_fixable || false,
    actionLevel: error.action_level || 'fermare_e_verificare',
    label,
    diagnosis,
    solution,
    sourceLanguage,
    isFallbackSource,
    originalManualBadge
  };
}

export function getUiTranslation(lang: string, key: string): string {
  const t = translations[lang] || translations['it'];
  return t.ui[key] || translations['it'].ui[key] || key;
}
