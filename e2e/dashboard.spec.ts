import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/portal');
    await page.getByPlaceholder(/investor@terravest.cm/i).fill('investor@terravest.cm');
    await page.getByPlaceholder('••••••••').fill('password123');
    await page.getByRole('button', { name: /Sign in/i }).click();
    await expect(page).toHaveURL(/.*dashboard/, { timeout: 15000 });
  });

  test('should display welcome banner', async ({ page }) => {
    await expect(page.getByText(/Welcome back/i)).toBeVisible();
  });

  test('should display KPI cards', async ({ page }) => {
    await expect(page.getByText(/Total Portfolio Value/i)).toBeVisible();
    await expect(page.getByText(/Combined Revenue/i)).toBeVisible();
    await expect(page.getByText(/Avg. Growth Rate/i)).toBeVisible();
    await expect(page.getByText(/Portfolio Companies/i)).toBeVisible();
  });

  test('should display quick action buttons', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Invest/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Portfolio/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Documents/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Messages/i })).toBeVisible();
  });

  test('should display portfolio performance chart', async ({ page }) => {
    await expect(page.getByText(/Portfolio Performance/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /1M/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /3M/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /6M/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /1Y/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /ALL/i })).toBeVisible();
  });

  test('should display sector allocation', async ({ page }) => {
    await expect(page.getByText(/Allocation/i)).toBeVisible();
  });

  test('should display portfolio companies section', async ({ page }) => {
    await expect(page.getByText(/Portfolio Companies/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /View All/i })).toBeVisible();
  });

  test('should display recent activity section', async ({ page }) => {
    await expect(page.getByText(/Recent Activity/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /View All/i }).nth(1)).toBeVisible();
  });

  test('should display recent documents section', async ({ page }) => {
    await expect(page.getByText(/Recent Documents/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /View All/i }).nth(2)).toBeVisible();
  });

  test('should navigate to opportunities when clicking Invest button', async ({ page }) => {
    await page.getByRole('button', { name: /Invest/i }).click();
    await expect(page).toHaveURL(/.*opportunities/);
  });

  test('should navigate to portfolio when clicking Portfolio button', async ({ page }) => {
    await page.getByRole('button', { name: /Portfolio/i }).click();
    await expect(page).toHaveURL(/.*portfolio/);
  });

  test('should change time range for performance chart', async ({ page }) => {
    await page.getByRole('button', { name: /3M/i }).click();
    await expect(page.getByRole('button', { name: /3M/i })).toHaveClass(/bg-\[\#8FB8A3\]/);
  });

  test('should display sidebar navigation', async ({ page }) => {
    await expect(page.getByRole('link', { name: /Dashboard/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Portfolio/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Opportunities/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Capital Activity/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Documents/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Messages/i })).toBeVisible();
  });

  test('should display notifications bell', async ({ page }) => {
    await expect(page.getByRole('link', { name: /Notifications/i })).toBeVisible();
  });

  test('should display user profile dropdown', async ({ page }) => {
    await page.getByAltText(/Investor/i).click();
    await expect(page.getByRole('link', { name: /Profile/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Settings/i })).toBeVisible();
    await expect(page.getByText(/Sign out/i)).toBeVisible();
  });
});
