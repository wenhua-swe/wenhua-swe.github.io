import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';
import { POST, openSearch, search } from './helpers';

const PAGES = [
  '/',
  '/blog/',
  '/about/',
  '/photos/',
  '/tags/',
  '/search/',
  POST,
  '/blog/2020-08-15-web-accessibility-certificate-tw/',
  '/blog/2019-10-15-a11y-series-wrap-up/',
  '/404.html',
];

const scan = async (page: Page) => {
  const { violations } = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
    // Giscus comments are a third-party iframe
    .exclude('iframe')
    .analyze();
  expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
};

const prepare = async (page: Page, path: string, theme: string) => {
  await page.goto(path);
  await page.evaluate((t) => (document.documentElement.dataset.theme = t), theme);
  // Expressive Code makes overflowing code blocks keyboard-scrollable from a script; wait for it
  await page.waitForFunction(() =>
    [...document.querySelectorAll('pre')].every((pre) => pre.scrollWidth <= pre.clientWidth || pre.hasAttribute('tabindex')),
  );
};

for (const theme of ['light', 'dark']) {
  for (const width of [1280, 375]) {
    test.describe(`${theme}, ${width}px`, () => {
      test.use({ viewport: { width, height: 900 }, colorScheme: theme as 'light' | 'dark' });

      for (const path of PAGES) {
        test(path, async ({ page }) => {
          await prepare(page, path, theme);
          await scan(page);
        });
      }

      test('search dialog open, with results', async ({ page }) => {
        await prepare(page, POST, theme);
        await openSearch(page);
        await search(page);
        await page.locator('.results-close').focus();
        await scan(page);
      });

      if (width === 375) {
        test('menu open', async ({ page }) => {
          await prepare(page, POST, theme);
          await page.locator('.menu-toggle').click();
          await scan(page);
        });
      }
    });
  }
}
