import { test, expect } from '@playwright/test';

test('simple portal page load', async ({ page }) => {
  await page.goto('http://localhost:5173/portal', { timeout: 30000 });
  await expect(page).toHaveTitle(/TerraVest/);
});
