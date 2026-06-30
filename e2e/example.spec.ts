import { test, expect } from '@playwright/test';

test('sample e2e smoke test', async ({ page }) => {
  await page.goto('about:blank');
  await expect(page).toHaveTitle('about:blank');
});
