import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';
import expressiveCode from 'astro-expressive-code';
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

// Screen readers rarely announce <del>/<ins>; prefix each with hidden text that says what changed
const DEL_LABEL = '原文（已刪除）：';
const INS_LABEL = '更正為：';
const editMarks = {
  name: 'edit-marks',
  // `~~text~~` arrives as a <del> element
  element: {
    filter: ['del'],
    visit(node, ctx) {
      ctx.prependChild(node, {
        type: 'element',
        tagName: 'span',
        properties: { className: ['sr-only'] },
        children: [{ type: 'text', value: DEL_LABEL }],
      });
    },
  },
  // Markdown has no insert syntax, so <ins> is inline HTML and its opening tag is a raw node
  raw(node, ctx) {
    if (node.value.trim().toLowerCase() !== '<ins>') return;
    ctx.replaceNode(node, { type: 'raw', value: `<ins><span class="sr-only">${INS_LABEL}</span>` });
  },
};

// `> [!更正]` blockquotes become a labelled note instead of a quotation
const CORRECTION_MARKER = '[!更正]';
const correctionNotes = {
  name: 'correction-notes',
  element: {
    filter: ['blockquote'],
    visit(node, ctx) {
      const first = node.children.find((child) => child.type === 'element');
      const marker = first?.tagName === 'p' && first.children[0];
      if (marker?.type !== 'text' || !marker.value.trimStart().startsWith(CORRECTION_MARKER)) return;
      const rest = marker.value.trimStart().slice(CORRECTION_MARKER.length).replace(/^\s+/, '');
      if (rest) ctx.replaceNode(marker, { type: 'text', value: rest });
      else ctx.removeNode(marker);
      ctx.replaceNode(node, {
        type: 'element',
        tagName: 'div',
        properties: { className: ['correction'], role: 'note', ariaLabel: '更正' },
        children: [
          { type: 'element', tagName: 'p', properties: { className: ['correction-label'] }, children: [{ type: 'text', value: '更正' }] },
          ...node.children,
        ],
      });
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
    processor: satteri({ hastPlugins: [lazyImages, taskListLabels, focusableTables, editMarks, correctionNotes] }),
  },
  output: 'static',
  // Keep Astro 5 whitespace handling; v7's 'jsx' default drops spaces between inline elements
  compressHTML: true,
});
