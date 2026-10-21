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

// GFM task-list checkboxes have no label; name each one after its item text
function rehypeTaskListLabels() {
  const text = (node) =>
    node.type === 'text'
      ? node.value
      : ['ul', 'ol', 'input'].includes(node.tagName)
        ? ''
        : (node.children ?? []).map(text).join('');
  const visit = (node) => {
    if (node.type === 'element' && node.tagName === 'li' && node.properties.className?.includes('task-list-item')) {
      const parent = node.children.find((c) => c.tagName === 'p') ?? node;
      const input = parent.children.find((c) => c.tagName === 'input');
      if (input) {
        input.properties.ariaLabel ??= parent.children.map(text).join('').trim() || (input.properties.checked ? '已完成' : '未完成');
      }
    }
    node.children?.forEach(visit);
  };
  return visit;
}

// .prose table scrolls horizontally on narrow screens; let keyboard users reach and scroll it
function rehypeFocusableTables() {
  const visit = (node) => {
    if (node.type === 'element' && node.tagName === 'table') {
      node.properties.tabIndex ??= 0;
    }
    node.children?.forEach(visit);
  };
  return visit;
}

// Expressive Code turns scrollable <pre> into role="region"; give each one a unique name
const codeBlockLabels = {
  name: 'code-block-labels',
  hooks: {
    postprocessRenderedBlock: ({ codeBlock, renderData }) => {
      const index = (codeBlock.parentDocument?.positionInDocument?.groupIndex ?? 0) + 1;
      const name = codeBlock.props.title || codeBlock.language;
      const visit = (node) => {
        if (node.type === 'element' && node.tagName === 'pre') {
          node.properties.ariaLabel = `程式碼區塊 ${index}${name ? `：${name}` : ''}`;
        }
        node.children?.forEach(visit);
      };
      visit(renderData.blockAst);
    },
  },
};

export default defineConfig({
  site: 'https://wenhua-swe.github.io',
  base: '/',
  integrations: [
    expressiveCode({
      themes: ['vitesse-dark', 'vitesse-light'],
      plugins: [codeBlockLabels],
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
    rehypePlugins: [rehypeLazyImages, rehypeTaskListLabels, rehypeFocusableTables],
  },
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'static',
});
