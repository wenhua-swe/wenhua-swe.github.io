import { expect, type Page } from '@playwright/test';

// A long series post: table of contents, code blocks, series navigation and comments
export const POST = '/blog/2019-09-27-a11y-accordion/';

// A query with more than two pages of results, so "load more" shows up twice
export const QUERY = 'aria';

export const dialog = (page: Page) => page.locator('dialog.search-dialog');
export const searchInput = (page: Page) => dialog(page).locator('.pagefind-ui__search-input');

// Presses whatever shortcut the page advertises, so this also checks the advertised one works
export async function pressSearchShortcut(page: Page) {
  const shortcut = await page.locator('a[data-search-dialog]').first().getAttribute('aria-keyshortcuts');
  expect(shortcut).toMatch(/^(Meta|Control)\+K$/);
  await page.keyboard.press(shortcut!.replace(/K$/, 'k'));
}

export async function openSearch(page: Page) {
  await pressSearchShortcut(page);
  await expect(dialog(page)).toHaveJSProperty('open', true);
  await expect(searchInput(page)).toBeFocused();
}

export async function search(page: Page, query = QUERY) {
  await searchInput(page).fill(query);
  await expect(dialog(page).locator('.pagefind-ui__result-link').first()).toBeVisible();
}

export async function tabUntil(page: Page, predicate: () => Promise<boolean>, max = 60) {
  for (let i = 0; i < max; i++) {
    await page.keyboard.press('Tab');
    if (await predicate()) return;
  }
  throw new Error(`focus never got there in ${max} Tab presses`);
}
