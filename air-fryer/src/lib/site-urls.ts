// URL canonici assoluti delle pagine principali, da usare nei dati strutturati
// (breadcrumb, ItemList…) per non ricostruirli a mano in ogni componente.
// Le forme (con o senza slash finale) sono quelle dichiarate nei rel=canonical;
// scripts/seo-check.mjs verifica che ogni URL nei JSON-LD sia canonico.

export const SITE_URL = 'https://www.crispissimo.com';

type Lang = 'it' | 'en' | 'es' | 'fr';

const HOME_PATHS: Record<Lang, string> = { it: '/', en: '/en/', es: '/es/', fr: '/fr/' };
const TOOLS_HUB_PATHS: Record<Lang, string> = {
  it: '/strumenti',
  en: '/en/tools',
  es: '/es/herramientas',
  fr: '/fr/outils',
};
const INFO_PATHS: Record<Lang, string> = { it: '/info/', en: '/en/info/', es: '/es/info/', fr: '/fr/info/' };

const pick = (map: Record<Lang, string>, lang?: string) => map[(lang as Lang)] ?? map.it;

export const homeUrl = (lang?: string) => SITE_URL + pick(HOME_PATHS, lang);
export const toolsHubUrl = (lang?: string) => SITE_URL + pick(TOOLS_HUB_PATHS, lang);
export const infoUrl = (lang?: string) => SITE_URL + pick(INFO_PATHS, lang);
export const infoPath = (lang?: string) => pick(INFO_PATHS, lang);
export const infoAlternateUrls = () => ({
  it: infoUrl('it'),
  en: infoUrl('en'),
  es: infoUrl('es'),
  fr: infoUrl('fr'),
  'x-default': infoUrl('it'),
});
