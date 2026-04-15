import { test, expect } from '@playwright/test';

test.describe('Portfolio', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/portal/portfolio');
    await expect(page).toHaveURL(/.*portfolio/);
    await page.waitForResponse(res => res.url().includes('/api/auth/me') && res.status() === 200, { timeout: 15000 });
    await page.waitForResponse(res => res.url().includes('/api/portal/portfolio') && res.status() === 200, { timeout: 15000 }).catch(() => {});
  });

  test('should display portfolio header', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Portfolio/i })).toBeVisible();
  });

  test('should display portfolio stats cards', async ({ page }) => {
    await expect(page.getByText(/Total Value/i)).toBeVisible();
    await expect(page.getByText(/Total Invested/i)).toBeVisible();
    await expect(page.getByText(/Total Return/i)).toBeVisible();
  });

  test('should display portfolio holdings', async ({ page }) => {
    await expect(page.getByText('Companies', { exact: true })).toBeVisible();
  });

  test('should display sector allocation chart', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Sector Allocation/i })).toBeVisible();
  });

  test('should display performance chart', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Performance/i })).toBeVisible();
  });

  test('should filter holdings by search', async ({ page }) => {
    await page.getByPlaceholder(/Search companies/i).fill('Agri');
    await page.waitForTimeout(300);
  });

  test('should display holdings in grid view', async ({ page }) => {
    await expect(page.locator('.card-hover h3').first()).toBeVisible({ timeout: 10000 });
  });

  test('should navigate to company detail when clicking on company', async ({ page }) => {
    await page.locator('.card-hover h3').first().click();
    await expect(page).toHaveURL(/.*portfolio\/.+/);
  });

  test('should display recent transactions', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Recent Transactions/i })).toBeVisible();
  });

  test('should display download report button', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Download Report/i })).toBeVisible();
  });
});

test.describe('Company Detail', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/portal/portfolio');
    await expect(page).toHaveURL(/.*portfolio/);
    await page.waitForResponse(res => res.url().includes('/api/auth/me') && res.status() === 200, { timeout: 15000 });
    await page.waitForResponse(res => res.url().includes('/api/portal/portfolio') && res.status() === 200, { timeout: 15000 }).catch(() => {});
    await expect(page.locator('.card-hover h3').first()).toBeVisible();
    await page.locator('.card-hover h3').first().click();
    await expect(page).toHaveURL(/.*portfolio\/.+/);
  });

  test('should display company header', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Back to Portfolio/i })).toBeVisible();
  });

  test('should display company tabs', async ({ page }) => {
    await expect(page.getByRole('tab', { name: /Overview/i })).toBeVisible();
    await expect(page.getByRole('tab', { name: /Financials/i })).toBeVisible();
    await expect(page.getByRole('tab', { name: /Documents/i })).toBeVisible();
  });

  test('should display key metrics in overview', async ({ page }) => {
    await expect(page.getByText(/Valuation/i).first()).toBeVisible();
    await expect(page.getByText(/Annual Revenue/i)).toBeVisible();
  });

  test('should display about section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /About/i })).toBeVisible();
  });

  test('should display performance chart', async ({ page }) => {
    await expect(page.getByText(/Performance/i).first()).toBeVisible();
  });

  test('should switch to financials tab', async ({ page }) => {
    await page.getByRole('tab', { name: /Financials/i }).click();
    await expect(page.getByText(/Key Metrics/i)).toBeVisible();
  });

  test('should switch to documents tab', async ({ page }) => {
    await page.getByRole('tab', { name: /Documents/i }).click();
    await expect(page.getByRole('columnheader', { name: 'Document' })).toBeVisible();
  });

  test('should navigate back to portfolio', async ({ page }) => {
    await page.getByRole('button', { name: /Back to Portfolio/i }).click();
    await expect(page).toHaveURL(/.*portfolio/);
  });
});
