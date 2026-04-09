import { test, expect } from '@playwright/test';

test('SPA routing - landing page loads', async ({ page }) => {
  await page.goto('http://localhost:5174/');
  await expect(page).toHaveTitle(/TerraVest/);
});

test('SPA routing - portal login page loads', async ({ page }) => {
  await page.goto('http://localhost:5174/portal');
  await expect(page.getByRole('heading', { name: /Sign in/i })).toBeVisible({ timeout: 10000 });
});

test('SPA routing - navigation from landing to portal works', async ({ page }) => {
  await page.goto('http://localhost:5174/');
  await page.getByText(/Investor Portal/i).first().click();
  await expect(page).toHaveURL(/.*portal/);
  await expect(page.getByRole('heading', { name: /Sign in/i })).toBeVisible({ timeout: 10000 });
});
