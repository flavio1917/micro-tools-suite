import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.convertitorefriggitrice.it',
  i18n: {
    defaultLocale: 'it',
    locales: ['it', 'en', 'es'],
    routing: {
      prefixDefaultLocale: false 
    }
  },
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});