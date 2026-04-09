import { test, expect } from '@playwright/test';

test.describe('Documents', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/portal.html');
    await page.getByPlaceholder(/investor@terravest.cm/i).fill('investor@terravest.cm');
    await page.getByPlaceholder("••••••••").fill('password123');
    await page.getByRole('button', { name: /Sign in/i }).click();
    await page.getByRole('link', { name: /Documents/i }).click();
    await expect(page).toHaveURL(/.*documents/);
  });

  test('should display documents header', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Documents/i })).toBeVisible();
  });

  test('should display search and filter controls', async ({ page }) => {
    await expect(page.getByPlaceholder(/Search documents/i)).toBeVisible();
    await expect(page.getByRole('combobox', { name: /Category/i })).toBeVisible();
    await expect(page.getByRole('combobox', { name: /Type/i })).toBeVisible();
  });

  test('should display documents list', async ({ page }) => {
    await expect(page.getByText(/Name/i)).toBeVisible();
    await expect(page.getByText(/Category/i)).toBeVisible();
    await expect(page.getByText(/Date/i)).toBeVisible();
    await expect(page.getByText(/Size/i)).toBeVisible();
  });

  test('should filter documents by category', async ({ page }) => {
    await page.getByRole('combobox', { name: /Category/i }).selectOption('Financial');
    await expect(page.getByText(/Financial/i).first()).toBeVisible();
  });

  test('should search documents', async ({ page }) => {
    await page.getByPlaceholder(/Search documents/i).fill('report');
    await expect(page.getByText(/report/i).first()).toBeVisible();
  });

  test('should display document details on click', async ({ page }) => {
    const docRow = page.locator('tr').nth(1);
    await docRow.click();
    await expect(page.getByText(/Document Details/i)).toBeVisible();
  });

  test('should allow downloading documents', async ({ page }) => {
    const downloadButton = page.locator('button[title="Download"]').first();
    await expect(downloadButton).toBeVisible();
  });

  test('should display starred documents section', async ({ page }) => {
    await expect(page.getByText(/Starred/i)).toBeVisible();
  });

  test('should display recent documents section', async ({ page }) => {
    await expect(page.getByText(/Recent/i)).toBeVisible();
  });

  test('should toggle document star', async ({ page }) => {
    const starButton = page.locator('button[title="Star"]').first();
    await starButton.click();
    await expect(starButton).toHaveClass(/text-yellow/);
  });
});

test.describe('Tax Documents', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/portal.html');
    await page.getByPlaceholder(/investor@terravest.cm/i).fill('investor@terravest.cm');
    await page.getByPlaceholder("••••••••").fill('password123');
    await page.getByRole('button', { name: /Sign in/i }).click();
    await page.getByRole('link', { name: /Tax Documents/i }).click();
    await expect(page).toHaveURL(/.*tax-documents/);
  });

  test('should display tax documents header', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Tax Documents/i })).toBeVisible();
  });

  test('should display K-1 forms section', async ({ page }) => {
    await expect(page.getByText(/K-1 Forms/i)).toBeVisible();
  });

  test('should display tax statements section', async ({ page }) => {
    await expect(page.getByText(/Tax Statements/i)).toBeVisible();
  });

  test('should filter by tax year', async ({ page }) => {
    await page.getByRole('combobox', { name: /Tax Year/i }).selectOption('2024');
    await expect(page.getByText(/2024/i)).toBeVisible();
  });
});
