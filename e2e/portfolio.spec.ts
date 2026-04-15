import { test, expect } from '@playwright/test';

test.describe('Portfolio', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/portal');
    await page.getByPlaceholder(/investor@terravest.cm/i).fill('investor@terravest.cm');
    await page.getByPlaceholder("••••••••").fill('password123');
    await page.getByRole('button', { name: /Sign in/i }).click();
    await page.getByRole('link', { name: /Portfolio/i }).click();
    await expect(page).toHaveURL(/.*portfolio/);
  });

  test('should display portfolio header', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Portfolio/i })).toBeVisible();
  });

  test('should display portfolio stats cards', async ({ page }) => {
    await expect(page.getByText(/Total Value/i)).toBeVisible();
    await expect(page.getByText(/Total Invested/i)).toBeVisible();
    await expect(page.getByText(/Total Return/i)).toBeVisible();
  });

  test('should display portfolio holdings table', async ({ page }) => {
    await expect(page.getByText(/Company/i)).toBeVisible();
    await expect(page.getByText(/Shares/i)).toBeVisible();
    await expect(page.getByText(/Value/i)).toBeVisible();
    await expect(page.getByText(/Change/i)).toBeVisible();
  });

  test('should display sector allocation chart', async ({ page }) => {
    await expect(page.getByText(/Sector Allocation/i)).toBeVisible();
  });

  test('should display performance chart', async ({ page }) => {
    await expect(page.getByText(/Performance/i)).toBeVisible();
  });

  test('should filter holdings by search', async ({ page }) => {
    await page.getByPlaceholder(/Search companies/i).fill('Agri');
    await expect(page.getByText(/Agri/i).first()).toBeVisible();
  });

  test('should sort holdings by column', async ({ page }) => {
    await page.getByText(/Company/i).click();
    await expect(page.getByText(/Company/i)).toBeVisible();
  });

  test('should navigate to company detail when clicking on company', async ({ page }) => {
    const companyLink = page.locator('a[href*="/portfolio/"]').first();
    await companyLink.click();
    await expect(page).toHaveURL(/.*portfolio\/.+/);
  });

  test('should display recent transactions', async ({ page }) => {
    await expect(page.getByText(/Recent Transactions/i)).toBeVisible();
  });

  test('should display download report button', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Download Report/i })).toBeVisible();
  });
});

test.describe('Company Detail', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/portal');
    await page.getByPlaceholder(/investor@terravest.cm/i).fill('investor@terravest.cm');
    await page.getByPlaceholder("••••••••").fill('password123');
    await page.getByRole('button', { name: /Sign in/i }).click();
    await page.waitForURL(/.*dashboard/);
    await page.goto('/portal/portfolio/1');
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
    await expect(page.getByText(/Valuation/i)).toBeVisible();
    await expect(page.getByText(/Annual Revenue/i)).toBeVisible();
    await expect(page.getByText(/Revenue Growth/i)).toBeVisible();
    await expect(page.getByText(/Profit Margin/i)).toBeVisible();
  });

  test('should display about section', async ({ page }) => {
    await expect(page.getByText(/About/i)).toBeVisible();
  });

  test('should display performance chart', async ({ page }) => {
    await expect(page.getByText(/Performance/i)).toBeVisible();
  });

  test('should switch to financials tab', async ({ page }) => {
    await page.getByRole('tab', { name: /Financials/i }).click();
    await expect(page.getByText(/Key Metrics/i)).toBeVisible();
    await expect(page.getByText(/Revenue Breakdown/i)).toBeVisible();
  });

  test('should switch to documents tab', async ({ page }) => {
    await page.getByRole('tab', { name: /Documents/i }).click();
    await expect(page.getByText(/Investment Thesis/i)).toBeVisible();
  });

  test('should navigate back to portfolio', async ({ page }) => {
    await page.getByRole('button', { name: /Back to Portfolio/i }).click();
    await expect(page).toHaveURL(/.*portfolio/);
  });
});
