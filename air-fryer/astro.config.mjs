// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // FONDAMENTALE PER LA SITEMAP
  site: 'https://www.convertitorefriggitrice.it',

  i18n: {
    defaultLocale: 'it',
    locales: ['it', 'en', 'es'],
    routing: {
      prefixDefaultLocale: false 
    }
  },

  integrations: [sitemap()],

  vite: {
    plugins: [tailwindcss()]
  }
});