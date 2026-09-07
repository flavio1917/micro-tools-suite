export type SupportedLanguage = 'it' | 'fr' | 'es' | 'en';

export const errorToolRoutes: Record<SupportedLanguage, { hub: string, modelBase: string }> = {
  it: {
    hub: '/strumenti/codici-errore-friggitrice-ad-aria',
    modelBase: '/strumenti/codici-errore-friggitrice-ad-aria'
  },
  fr: {
    hub: '/fr/outils/codes-erreur-friteuse-air',
    modelBase: '/fr/outils/codes-erreur-friteuse-air'
  },
  es: {
    hub: '/es/herramientas/codigos-error-freidora-aire',
    modelBase: '/es/herramientas/codigos-error-freidora-aire'
  },
  en: {
    hub: '/en/tools/air-fryer-error-codes',
    modelBase: '/en/tools/air-fryer-error-codes'
  }
};

/**
 * Normalizes URL ensuring it starts with a slash and ends with a slash if it's a directory path,
 * but without multiple consecutive slashes.
 */
function normalizeUrl(url: string): string {
  let normalized = url.replace(/\/+/g, '/');
  if (!normalized.startsWith('/')) normalized = '/' + normalized;
  if (!normalized.endsWith('/')) normalized = normalized + '/';
  return normalized;
}

export function getAirFryerErrorHubUrl(lang: SupportedLanguage): string {
  return errorToolRoutes[lang].hub;
}

export function getAirFryerErrorModelUrl(lang: SupportedLanguage, brandSlug: string, routeSlug: string): string {
  return normalizeUrl(`${errorToolRoutes[lang].modelBase}/${brandSlug}/${routeSlug}`);
}

export function getAirFryerErrorAlternateUrls(brandSlug: string, routeSlug: string) {
  return [
    { lang: 'it', url: getAirFryerErrorModelUrl('it', brandSlug, routeSlug) },
    { lang: 'en', url: getAirFryerErrorModelUrl('en', brandSlug, routeSlug) },
    { lang: 'es', url: getAirFryerErrorModelUrl('es', brandSlug, routeSlug) },
    { lang: 'fr', url: getAirFryerErrorModelUrl('fr', brandSlug, routeSlug) },
    { lang: 'x-default', url: getAirFryerErrorModelUrl('it', brandSlug, routeSlug) }
  ];
}
