import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

import fs from 'node:fs';

const dbPath = new URL('./src/data/air-fryer-db.json', import.meta.url);
const rawDb = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
// Read overrides from JSON-compatible source
// air-fryer-overrides.ts is TS-only, so we inline the canonical list here
// and keep it in sync manually. This is a build-time-only file.
const INDEXABLE_OVERRIDES = ['philips-na351', 'philips-na220-na221'];
const ROUTE_SLUG_OVERRIDES = {
  'philips-na351': 'na351',
  'philips-na220-na221': 'na220-na221',
  'philips-na15x': 'na15x',
  'philips-na555': 'na555',
  'cosori-caf-p583s-kus': 'caf-p583s-kus',
  'cosori-caf-li211': 'caf-li211',
  'cosori-caf-se601s-cus': 'caf-se601s-cus',
  'cosori-caf-dc601-kus': 'caf-dc601-kus',
  'cosori-caf-tf901-kus': 'caf-tf901-kus',
  'cosori-caf-r901-aus': 'caf-r901-aus',
  'cosori-caf-l501-kus': 'caf-l501-kus',
};

const noindexUrls = [];
const seenSlugs = new Set();
for (const model of rawDb) {
  const slug = model.canonical_slug;
  if (seenSlugs.has(slug)) continue; // skip duplicates (manual_review dupes)
  seenSlugs.add(slug);
  
  const effectiveStatus = INDEXABLE_OVERRIDES.includes(slug) ? 'indexable' : 'noindex';
  const routeSlug = ROUTE_SLUG_OVERRIDES[slug] || model.route_slug;
  
  if (effectiveStatus === 'noindex' && model.brand_slug && routeSlug) {
    const brand = model.brand_slug;
    const spec = routeSlug;
    noindexUrls.push(`https://www.crispissimo.com/strumenti/codici-errore-friggitrice-ad-aria/${brand}/${spec}/`);
    noindexUrls.push(`https://www.crispissimo.com/en/tools/air-fryer-error-codes/${brand}/${spec}/`);
    noindexUrls.push(`https://www.crispissimo.com/es/herramientas/codigos-error-freidora-aire/${brand}/${spec}/`);
    noindexUrls.push(`https://www.crispissimo.com/fr/outils/codes-erreur-friteuse-air/${brand}/${spec}/`);
  }
}


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
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) => {
        return !noindexUrls.some(url => page === url || page === url.slice(0, -1));
      }
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  },
  prefetch: true
});