import { expect, test } from '@playwright/test';
import { POST } from './helpers';

const toggle = (page) => page.locator('.menu-toggle');
const links = (page) => page.locator('#menu-links');

test.describe('wide screens (769px and up)', () => {
  test.use({ viewport: { width: 769, height: 800 } });

  test('show every link and no menu button', async ({ page }) => {
    await page.goto(POST);
    await expect(toggle(page)).toBeHidden();
    await expect(links(page)).toBeVisible();
    await expect(page.locator('.search-label')).toBeVisible();
    await expect(page.locator('.search-key')).toBeVisible();
  });
});

test.describe('narrow screens (768px and below)', () => {
  test.use({ viewport: { width: 768, height: 800 } });

  test.beforeEach(async ({ page }) => {
    await page.goto(POST);
  });

  test('fold the links behind a 選單 button', async ({ page }) => {
    await expect(toggle(page)).toBeVisible();
    await expect(toggle(page)).toHaveAccessibleName('選單');
    await expect(toggle(page)).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle(page)).toHaveAttribute('aria-controls', 'menu-links');
    await expect(links(page)).toBeHidden();
  });

  test('keep search as an icon that is still named 搜尋, without the shortcut hint', async ({ page }) => {
    const search = page.locator('a[data-search-dialog]');
    await expect(search).toBeVisible();
    await expect(search).toHaveAccessibleName(/^搜尋/);
    await expect(page.locator('.search-label')).toHaveCSS('position', 'absolute');
    await expect(page.locator('.search-key')).toBeHidden();
  });

  test('the button opens and closes the menu', async ({ page }) => {
    await toggle(page).click();
    await expect(toggle(page)).toHaveAttribute('aria-expanded', 'true');
    await expect(links(page)).toBeVisible();
    for (const link of await links(page).locator('a').all()) {
      expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    }
    await toggle(page).click();
    await expect(toggle(page)).toHaveAttribute('aria-expanded', 'false');
  });

  test('Esc closes the menu and returns focus to the button', async ({ page }) => {
    await toggle(page).click();
    await links(page).locator('a').first().focus();
    await page.keyboard.press('Escape');
    await expect(toggle(page)).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle(page)).toBeFocused();
  });

  test('clicking elsewhere closes the menu', async ({ page }) => {
    await toggle(page).click();
    await page.mouse.click(200, 700);
    await expect(toggle(page)).toHaveAttribute('aria-expanded', 'false');
  });

  test('Tab order follows the screen: 選單, its links, 搜尋, theme; leaving closes it', async ({ page }) => {
    await toggle(page).focus();
    await page.keyboard.press('Enter');
    const names: string[] = [];
    for (let i = 0; i < 7; i++) {
      await page.keyboard.press('Tab');
      names.push(await page.evaluate(() => document.activeElement!.getAttribute('aria-label') ?? document.activeElement!.textContent!.trim()));
    }
    expect(names.slice(0, 5)).toEqual(['閱讀', '技術和生活', '攝影', '標籤', '關於']);
    expect(names[5]).toMatch(/^搜尋/);
    expect(names[6]).toBe('切換深淺色模式');
    await expect(toggle(page)).toHaveAttribute('aria-expanded', 'false');
  });
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false, viewport: { width: 375, height: 800 } });

  test('narrow screens still show every link', async ({ page }) => {
    await page.goto(POST);
    await expect(toggle(page)).toBeHidden();
    await expect(links(page).locator('a')).toHaveCount(5);
    await expect(links(page)).toBeVisible();
  });
});
