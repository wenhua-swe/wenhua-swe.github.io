import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';
import expressiveCode from 'astro-expressive-code';
import tailwindcss from '@tailwindcss/vite';
import { satteri } from '@astrojs/markdown-satteri';

// Lazy-load every image in Markdown, including remote ones Astro does not optimize
const lazyImages = {
  name: 'lazy-images',
  element: {
    filter: ['img'],
    visit(node, ctx) {
      if (node.properties.loading == null) ctx.setProperty(node, 'loading', 'lazy');
      if (node.properties.decoding == null) ctx.setProperty(node, 'decoding', 'async');
    },
  },
};

// GFM task-list checkboxes have no label; name each one after its item text
const taskListLabels = {
  name: 'task-list-labels',
  element: {
    filter: ['input'],
    visit(node, ctx) {
      if (node.properties.type !== 'checkbox' || node.properties.ariaLabel != null) return;
      // The item text sits beside the checkbox; leave out any nested sub-list
      const item = ctx.parent(node);
      const label = (item?.children ?? [])
        .filter((child) => !(child.type === 'element' && ['ul', 'ol', 'input'].includes(child.tagName)))
        .map((child) => (child.type === 'text' ? child.value : ctx.textContent(child)))
        .join('')
        .trim();
      ctx.setProperty(node, 'ariaLabel', label || (node.properties.checked ? '已完成' : '未完成'));
    },
  },
};

// .prose table scrolls horizontally on narrow screens; let keyboard users reach and scroll it
const focusableTables = {
  name: 'focusable-tables',
  element: {
    filter: ['table'],
    visit(node, ctx) {
      if (node.properties.tabIndex == null) ctx.setProperty(node, 'tabIndex', 0);
    },
  },
};

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
    processor: satteri({ hastPlugins: [lazyImages, taskListLabels, focusableTables] }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'static',
  // Keep Astro 5 whitespace handling; v7's 'jsx' default drops spaces between inline elements
  compressHTML: true,
});
