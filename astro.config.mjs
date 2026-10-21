import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';
import expressiveCode from 'astro-expressive-code';
import tailwindcss from '@tailwindcss/vite';

// Lazy-load every image in Markdown, including remote ones Astro does not optimize
function rehypeLazyImages() {
  const visit = (node) => {
    if (node.type === 'element' && node.tagName === 'img') {
      node.properties.loading ??= 'lazy';
      node.properties.decoding ??= 'async';
    }
    node.children?.forEach(visit);
  };
  return visit;
}

export default defineConfig({
  site: 'https://wenhua-swe.github.io',
  base: '/',
  integrations: [
    expressiveCode({
      themes: ['vitesse-dark', 'vitesse-light'],
      // Follow the site's theme toggle instead of the OS setting
      useDarkModeMediaQuery: false,
      themeCssSelector: (theme) => `[data-theme='${theme.type}']`,
      styleOverrides: {
        borderRadius: '12px',
        codeFontFamily: "'IBM Plex Mono', ui-monospace, monospace",
        codeFontSize: '14px',
        uiFontFamily: "'IBM Plex Mono', ui-monospace, monospace",
      },
    }),
    pagefind(),
    sitemap(),
  ],
  markdown: {
    rehypePlugins: [rehypeLazyImages],
  },
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'static',
});
