import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/portal/dashboard');
    await expect(page).toHaveURL(/.*dashboard/, { timeout: 15000 });
  });

  test('should display welcome banner', async ({ page }) => {
    await expect(page.getByText(/Welcome back/i)).toBeVisible();
  });

  test('should display KPI cards', async ({ page }) => {
    await expect(page.getByText('Total Portfolio Value', { exact: true })).toBeVisible();
    await expect(page.getByText('Combined Revenue', { exact: true })).toBeVisible();
    await expect(page.getByText('Avg. Growth Rate', { exact: true })).toBeVisible();
    await expect(page.getByText('Portfolio Companies', { exact: true }).first()).toBeVisible();
  });

  test('should display quick action buttons', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Invest/i }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Portfolio/i }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Documents/i }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Messages/i }).first()).toBeVisible();
  });

  test('should display portfolio performance chart', async ({ page }) => {
    await expect(page.getByText('Portfolio Performance', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: '1M' })).toBeVisible();
    await expect(page.getByRole('button', { name: '3M' })).toBeVisible();
    await expect(page.getByRole('button', { name: '6M' })).toBeVisible();
    await expect(page.getByRole('button', { name: '1Y' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'ALL' })).toBeVisible();
  });

  test('should display sector allocation', async ({ page }) => {
    await expect(page.getByText('Allocation', { exact: true })).toBeVisible();
  });

  test('should display portfolio companies section', async ({ page }) => {
    await expect(page.getByText(/Portfolio Companies/i).first()).toBeVisible();
  });

  test('should display recent documents section', async ({ page }) => {
    await expect(page.getByText(/Recent Documents/i)).toBeVisible();
  });

  test('should navigate to opportunities when clicking Invest button', async ({ page }) => {
    await page.locator('button:has-text("New opportunity")').click();
    await expect(page).toHaveURL(/.*opportunities/);
  });

  test('should navigate to portfolio when clicking Portfolio button', async ({ page }) => {
    await page.locator('button:has-text("View holdings")').click();
    await expect(page).toHaveURL(/.*portfolio/);
  });

  test('should change time range for performance chart', async ({ page }) => {
    const btn3M = page.getByRole('button', { name: '3M' });
    await btn3M.click();
    await expect(btn3M).toHaveClass(/bg-\[#8FB8A3\]/);
  });

  test('should display sidebar navigation', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Dashboard', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Portfolio', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Opportunities', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Capital Activity', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Documents', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Messages', exact: true })).toBeVisible();
  });

  test('should display notifications bell', async ({ page }) => {
    await expect(page.locator('header a[href="/portal/notifications"]')).toBeVisible();
  });

  test('should display user profile dropdown', async ({ page }) => {
    await page.locator('header button img').click();
    await expect(page.getByRole('link', { name: 'Profile', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Settings', exact: true }).first()).toBeVisible();
    await expect(page.locator('header').getByText(/Sign out/i)).toBeVisible();
  });
});
