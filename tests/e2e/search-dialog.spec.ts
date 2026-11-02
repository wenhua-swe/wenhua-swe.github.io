import { expect, test } from '@playwright/test';
import { POST, dialog, openSearch, search, searchInput, tabUntil } from './helpers';

const trigger = (page) => page.locator('a[data-search-dialog]');
const topClose = (page) => dialog(page).locator('.head .close');
const resultsClose = (page) => dialog(page).locator('.results-close');
const loadMore = (page) => dialog(page).locator('.pagefind-ui__button');

test.beforeEach(async ({ page }) => {
  await page.goto(POST);
});

test.describe('opening and closing', () => {
  test('clicking 搜尋 opens the dialog with focus in the search box', async ({ page }) => {
    await trigger(page).click();
    await expect(dialog(page)).toHaveJSProperty('open', true);
    await expect(searchInput(page)).toBeFocused();
    await expect(searchInput(page)).toHaveAccessibleName('搜尋網站內容');
  });

  test('the trigger is a button that opens with Enter and Space', async ({ page }) => {
    await expect(trigger(page)).toHaveRole('button');
    for (const key of ['Enter', ' ']) {
      await trigger(page).focus();
      await page.keyboard.press(key);
      await expect(dialog(page)).toHaveJSProperty('open', true);
      await page.keyboard.press('Escape');
      await expect(dialog(page)).toHaveJSProperty('open', false);
    }
  });

  test('Esc closes and returns focus to the trigger', async ({ page }) => {
    await openSearch(page);
    await page.keyboard.press('Escape');
    await expect(dialog(page)).toHaveJSProperty('open', false);
    await expect(trigger(page)).toBeFocused();
  });

  test('the 關閉 button closes and returns focus to the trigger', async ({ page }) => {
    await openSearch(page);
    await topClose(page).click();
    await expect(dialog(page)).toHaveJSProperty('open', false);
    await expect(trigger(page)).toBeFocused();
  });

  test('clicking the backdrop closes', async ({ page }) => {
    await openSearch(page);
    await page.mouse.click(10, 10);
    await expect(dialog(page)).toHaveJSProperty('open', false);
  });

  test('the page behind does not scroll while open', async ({ page }) => {
    await openSearch(page);
    await expect(page.locator('html')).toHaveCSS('overflow', 'hidden');
  });

  test('choosing a result closes the dialog and goes to the post', async ({ page }) => {
    await openSearch(page);
    await search(page, 'accordion');
    await dialog(page).locator('.pagefind-ui__result-link').first().click();
    await expect(page).toHaveURL(POST);
    await expect(dialog(page)).toHaveJSProperty('open', false);
  });
});

test.describe('the close button before the results', () => {
  test('stays hidden until it takes focus, then shows its text', async ({ page }) => {
    await openSearch(page);
    await search(page);
    const box = await resultsClose(page).boundingBox();
    expect(box!.width).toBeLessThanOrEqual(1);

    await tabUntil(page, () => resultsClose(page).evaluate((el) => el === document.activeElement));
    await expect(resultsClose(page)).toHaveText('關閉搜尋');
    const focused = await resultsClose(page).boundingBox();
    expect(focused!.height).toBeGreaterThanOrEqual(44);
  });

  test('comes after the search box and before the first result', async ({ page }) => {
    await openSearch(page);
    await search(page);
    const order: string[] = [];
    for (let i = 0; i < 4; i++) {
      await page.keyboard.press('Tab');
      order.push(await page.evaluate(() => document.activeElement!.className));
    }
    const close = order.findIndex((c) => c.includes('results-close'));
    const firstResult = order.findIndex((c) => c.includes('pagefind-ui__result-link'));
    expect(close).toBeGreaterThanOrEqual(0);
    expect(close).toBeLessThan(firstResult);
  });

  test('closes and returns focus to the trigger', async ({ page }) => {
    await openSearch(page);
    await search(page);
    await resultsClose(page).focus();
    await page.keyboard.press('Enter');
    await expect(dialog(page)).toHaveJSProperty('open', false);
    await expect(trigger(page)).toBeFocused();
  });
});

test.describe('focus stays inside the dialog', () => {
  test('Tab on the last control wraps to 關閉, Shift+Tab on 關閉 wraps to the last', async ({ page }) => {
    await openSearch(page);
    await search(page);
    await loadMore(page).focus();
    await page.keyboard.press('Tab');
    await expect(topClose(page)).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(loadMore(page)).toBeFocused();
  });

  test('a full round of Tab never reaches the page behind', async ({ page }) => {
    await openSearch(page);
    await search(page);
    for (let i = 0; i < 25; i++) {
      await page.keyboard.press('Tab');
      expect(await page.evaluate(() => !!document.activeElement?.closest('dialog.search-dialog'))).toBe(true);
    }
  });
});

test.describe('load more', () => {
  for (const how of ['Enter', 'click'] as const) {
    test(`with ${how}, focus moves to the first newly loaded result`, async ({ page }) => {
      await openSearch(page);
      await search(page);
      const items = dialog(page).locator('.pagefind-ui__result');
      const before = await items.count();
      if (how === 'Enter') {
        await loadMore(page).focus();
        await page.keyboard.press('Enter');
      } else {
        await loadMore(page).click();
      }
      await expect(items.nth(before).locator('.pagefind-ui__result-link')).toBeFocused();
    });
  }

  test('works the same on the /search/ page', async ({ page }) => {
    await page.goto('/search/');
    const input = page.locator('.pagefind-ui__search-input');
    await input.fill('aria');
    const items = page.locator('.pagefind-ui__result');
    await expect(items.first().locator('.pagefind-ui__result-link')).toBeVisible();
    const before = await items.count();
    await page.locator('.pagefind-ui__button').click();
    await expect(items.nth(before).locator('.pagefind-ui__result-link')).toBeFocused();
  });
});
