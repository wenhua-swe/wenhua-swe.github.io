import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://wenhua-swe.github.io',
  base: '/',
  integrations: [pagefind(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'static',
});
