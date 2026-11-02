import { expect, test } from '@playwright/test';
import { dialog } from './helpers';

// Each platform gets only its own modifier: ⌘K on Apple devices, Ctrl+K elsewhere.
// Safari has no navigator.userAgentData, so the Apple cases leave it out like the real thing.
const platforms = [
  { name: 'Mac (Chrome)', platform: 'MacIntel', uaData: 'macOS', hint: '⌘K', aria: 'Meta+K', works: 'Meta+k', ignored: 'Control+k' },
  { name: 'Mac (Safari)', platform: 'MacIntel', uaData: null, hint: '⌘K', aria: 'Meta+K', works: 'Meta+k', ignored: 'Control+k' },
  { name: 'iPad', platform: 'MacIntel', uaData: null, hint: '⌘K', aria: 'Meta+K', works: 'Meta+k', ignored: 'Control+k' },
  { name: 'iPhone', platform: 'iPhone', uaData: null, hint: '⌘K', aria: 'Meta+K', works: 'Meta+k', ignored: 'Control+k' },
  { name: 'Windows', platform: 'Win32', uaData: 'Windows', hint: 'Ctrl K', aria: 'Control+K', works: 'Control+k', ignored: 'Meta+k' },
  { name: 'Linux', platform: 'Linux x86_64', uaData: 'Linux', hint: 'Ctrl K', aria: 'Control+K', works: 'Control+k', ignored: 'Meta+k' },
];

for (const p of platforms) {
  test.describe(p.name, () => {
    test.beforeEach(async ({ page }) => {
      await page.addInitScript(({ platform, uaData }) => {
        Object.defineProperty(Navigator.prototype, 'platform', { get: () => platform });
        Object.defineProperty(Navigator.prototype, 'userAgentData', { get: () => (uaData ? { platform: uaData } : undefined) });
      }, p);
      await page.goto('/about/');
    });

    test(`shows ${p.hint} and announces ${p.aria}`, async ({ page }) => {
      const trigger = page.locator('a[data-search-dialog]');
      await expect(trigger.locator('.search-key')).toHaveText(p.hint);
      await expect(trigger.locator('.search-key')).toHaveAttribute('aria-hidden', 'true');
      await expect(trigger).toHaveAttribute('aria-keyshortcuts', p.aria);
    });

    test(`${p.works} opens search, ${p.ignored} does not`, async ({ page }) => {
      await page.keyboard.press(p.ignored);
      await page.waitForTimeout(300);
      await expect(dialog(page)).toHaveJSProperty('open', false);
      await page.keyboard.press(p.works);
      await expect(dialog(page)).toHaveJSProperty('open', true);
    });
  });
}

test('the shortcut pulls focus back to the search box when already open', async ({ page }) => {
  await page.goto('/about/');
  const shortcut = (await page.locator('a[data-search-dialog]').getAttribute('aria-keyshortcuts'))!.replace(/K$/, 'k');
  await page.keyboard.press(shortcut);
  const input = dialog(page).locator('.pagefind-ui__search-input');
  await input.fill('aria');
  await dialog(page).locator('.head .close').focus();
  await page.keyboard.press(shortcut);
  await expect(input).toBeFocused();
  expect(await input.evaluate((el: HTMLInputElement) => el.value.slice(el.selectionStart!, el.selectionEnd!))).toBe('aria');
});
