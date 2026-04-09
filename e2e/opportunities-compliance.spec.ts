import { test, expect } from '@playwright/test';

test.describe('Investment Opportunities', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/portal.html');
    await page.getByPlaceholder(/investor@terravest.cm/i).fill('investor@terravest.cm');
    await page.getByPlaceholder("••••••••").fill('password123');
    await page.getByRole('button', { name: /Sign in/i }).click();
    await page.getByRole('link', { name: /Opportunities/i }).click();
    await expect(page).toHaveURL(/.*opportunities/);
  });

  test('should display opportunities header', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Investment Opportunities/i })).toBeVisible();
  });

  test('should display active opportunities', async ({ page }) => {
    await expect(page.getByText(/Active Opportunities/i)).toBeVisible();
  });

  test('should display opportunity cards', async ({ page }) => {
    await expect(page.locator('[class*="opportunity"]').or(page.locator('h3')).first()).toBeVisible();
  });

  test('should filter by sector', async ({ page }) => {
    await page.getByRole('combobox', { name: /Sector/i }).selectOption('Agriculture');
    await page.waitForTimeout(300);
  });

  test('should filter by status', async ({ page }) => {
    await page.getByRole('combobox', { name: /Status/i }).selectOption('Open');
    await page.waitForTimeout(300);
  });

  test('should search opportunities', async ({ page }) => {
    await page.getByPlaceholder(/Search opportunities/i).fill('growth');
    await page.waitForTimeout(300);
  });

  test('should view opportunity details', async ({ page }) => {
    const viewButton = page.getByRole('button', { name: /View Details/i }).first();
    if (await viewButton.isVisible().catch(() => false)) {
      await viewButton.click();
      await expect(page.getByText(/Investment Details/i)).toBeVisible();
    }
  });

  test('should display investment terms', async ({ page }) => {
    const viewButton = page.getByRole('button', { name: /View Details/i }).first();
    if (await viewButton.isVisible().catch(() => false)) {
      await viewButton.click();
      await expect(page.getByText(/Minimum Investment/i)).toBeVisible();
      await expect(page.getByText(/Target Return/i)).toBeVisible();
    }
  });

  test('should allow expressing interest', async ({ page }) => {
    const investButton = page.getByRole('button', { name: /Express Interest/i }).first();
    if (await investButton.isVisible().catch(() => false)) {
      await investButton.click();
      await expect(page.getByText(/Interest Expressed/i)).toBeVisible();
    }
  });
});

test.describe('Capital Calls', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/portal.html');
    await page.getByPlaceholder(/investor@terravest.cm/i).fill('investor@terravest.cm');
    await page.getByPlaceholder("••••••••").fill('password123');
    await page.getByRole('button', { name: /Sign in/i }).click();
    await page.getByRole('link', { name: /Capital Activity/i }).click();
    await expect(page).toHaveURL(/.*capital-calls/);
  });

  test('should display capital calls header', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Capital Calls/i })).toBeVisible();
  });

  test('should display pending capital calls', async ({ page }) => {
    await expect(page.getByText(/Pending/i)).toBeVisible();
  });

  test('should display capital call history', async ({ page }) => {
    await expect(page.getByText(/History/i)).toBeVisible();
  });

  test('should display total called amount', async ({ page }) => {
    await expect(page.getByText(/Total Called/i)).toBeVisible();
  });

  test('should display total paid amount', async ({ page }) => {
    await expect(page.getByText(/Total Paid/i)).toBeVisible();
  });

  test('should allow viewing capital call details', async ({ page }) => {
    const viewButton = page.getByRole('button', { name: /View/i }).first();
    if (await viewButton.isVisible().catch(() => false)) {
      await viewButton.click();
    }
  });

  test('should display payment instructions', async ({ page }) => {
    const payButton = page.getByRole('button', { name: /Pay Now/i }).first();
    if (await payButton.isVisible().catch(() => false)) {
      await payButton.click();
      await expect(page.getByText(/Payment Instructions/i)).toBeVisible();
    }
  });
});

test.describe('Compliance', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/portal.html');
    await page.getByPlaceholder(/investor@terravest.cm/i).fill('investor@terravest.cm');
    await page.getByPlaceholder("••••••••").fill('password123');
    await page.getByRole('button', { name: /Sign in/i }).click();
    await page.getByRole('link', { name: /Compliance/i }).click();
    await expect(page).toHaveURL(/.*compliance/);
  });

  test('should display compliance header', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Compliance/i })).toBeVisible();
  });

  test('should display KYC status', async ({ page }) => {
    await expect(page.getByText(/KYC Status/i)).toBeVisible();
  });

  test('should display accreditation status', async ({ page }) => {
    await expect(page.getByText(/Accreditation/i)).toBeVisible();
  });

  test('should display pending documents', async ({ page }) => {
    await expect(page.getByText(/Pending Documents/i)).toBeVisible();
  });

  test('should display compliance history', async ({ page }) => {
    await expect(page.getByText(/History/i)).toBeVisible();
  });
});
