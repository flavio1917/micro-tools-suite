import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://www.convertitorefriggitrice.it',
  
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
      i18n: {
        defaultLocale: 'it',
        locales: {
          it: 'it',
          en: 'en',
          es: 'es',
          fr: 'fr',
        },
      },
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  },
  prefetch: true
});