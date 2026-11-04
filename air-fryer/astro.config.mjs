import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// Pagine modello dei codici errore: sono indicizzabili (e quindi in sitemap) SOLO
// quelle validate a mano con seo_status_override: 'indexable' in
// src/data/air-fryer-overrides.ts. Tutte le altre sono noindex.
// Questo file non può importare TypeScript: tenere la lista allineata a mano.
// scripts/seo-check.mjs blocca la build se sitemap e meta robots non coincidono.
const INDEXABLE_MODEL_PATHS = ['philips/na351', 'philips/na220-na221'];
const ERROR_HUB_PATHS = [
  'strumenti/codici-errore-friggitrice-ad-aria',
  'en/tools/air-fryer-error-codes',
  'es/herramientas/codigos-error-freidora-aire',
  'fr/outils/codes-erreur-friteuse-air',
];

function isNoindexModelPage(pageUrl) {
  const p = decodeURI(new URL(pageUrl).pathname).replace(/^\/|\/$/g, '');
  for (const hub of ERROR_HUB_PATHS) {
    if (!p.startsWith(hub + '/')) continue;
    const rest = p.slice(hub.length + 1); // "<brand>" oppure "<brand>/<modello>"
    return rest.split('/').length >= 2 && !INDEXABLE_MODEL_PATHS.includes(rest);
  }
  return false;
}

// Pagine il cui canonical è SENZA slash finale (ricette, hub degli strumenti,
// convertitori). Tutte le altre pagine hanno il canonical con lo slash finale.
const CANONICAL_WITHOUT_TRAILING_SLASH = new RegExp(
  '^/(?:(?:en|es|fr)/)?recipes/[^/]+/$' +
  '|^/(?:strumenti|en/tools|es/herramientas|fr/outils)/$' +
  '|^/(?:convertitore|en/converter|es/convertidor|fr/convertisseur)/$'
);

export default defineConfig({
  site: 'https://www.crispissimo.com',
  
  output: 'static', // <--- Torna a static!
  adapter: vercel(), 

  i18n: {
    defaultLocale: 'it',
    locales: ['it', 'en', 'es', 'fr'],
    routing: {
      prefixDefaultLocale: false 
    }
  },
  integrations: [
    // La sitemap deve contenere SOLO gli URL canonici, scritti esattamente come nel
    // <link rel="canonical"> (verificato da scripts/seo-check.mjs dopo la build).
    // Niente lastmod/changefreq/priority: lastmod = data della build per tutte le
    // pagine è un segnale falso, changefreq e priority sono ignorati da Google.
    sitemap({
      filter: (page) => !isNoindexModelPage(page),
      serialize: (item) => {
        const url = new URL(item.url);
        if (CANONICAL_WITHOUT_TRAILING_SLASH.test(decodeURI(url.pathname))) {
          url.pathname = url.pathname.replace(/\/$/, '');
          item.url = url.href;
        }
        return item;
      }
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  },
  prefetch: true
});