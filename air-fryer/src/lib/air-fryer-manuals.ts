export function getManualLabel(url: string, lang: 'it'|'en'|'fr'|'es'): string {
  const manualTranslations = {
    it: 'Manuale',
    en: 'Manual',
    fr: 'Manuel',
    es: 'Manual'
  };
  const officialTranslations = {
    it: 'Manuale ufficiale',
    en: 'Official manual',
    fr: 'Manuel officiel',
    es: 'Manual oficial'
  };

  const manualWord = manualTranslations[lang] || manualTranslations['it'];
  const officialWord = officialTranslations[lang] || officialTranslations['it'];

  if (!url) return manualWord;

  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();

    // Known official sources
    if (
      hostname.includes('philips.com') ||
      hostname.includes('philips.it') ||
      hostname.includes('cosori.com') ||
      hostname.includes('xiaomi.com') ||
      hostname.includes('mi.com')
    ) {
      return officialWord;
    }

    // Known third-party sources
    if (hostname.includes('manualslib.com')) {
      return `${manualWord} · ManualsLib`;
    }
    if (hostname.includes('manuals.plus')) {
      return `${manualWord} · Manuals+`;
    }

    // Default neutral fallback
    return manualWord;
  } catch (e) {
    // If it's not a valid URL, it might be a plain string reference
    const text = url.toLowerCase();
    if (text.includes('manualslib')) {
      return `${manualWord} · ManualsLib`;
    }
    if (text.includes('manuals+')) {
      return `${manualWord} · Manuals+`;
    }
    return manualWord;
  }
}
