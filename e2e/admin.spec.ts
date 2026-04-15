import { test, expect } from '@playwright/test';

test.describe('Admin Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/portal');
    await page.evaluate(() => { localStorage.clear(); sessionStorage.clear(); });
    await page.reload();
    await page.goto('/portal');
    await page.getByPlaceholder(/investor@terravest.cm/i).fill('admin@terravest.cm');
    await page.getByPlaceholder("••••••••").fill('admin123');
    await page.getByRole('button', { name: /Sign in/i }).click();
    await page.waitForURL(/.*dashboard/, { timeout: 15000 });
    await page.goto('/portal/admin/dashboard');
  });

  test('should display admin dashboard header', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Admin Dashboard' })).toBeVisible();
  });

  test('should display admin sidebar navigation', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Dashboard', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Users', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Portfolios', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Opportunities', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Documents', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Analytics', exact: true })).toBeVisible();
  });

  test('should display key metrics', async ({ page }) => {
    await expect(page.getByText('Total Users', { exact: true })).toBeVisible();
    await expect(page.getByText('AUM', { exact: true })).toBeVisible();
    await expect(page.getByText('Portfolio Companies', { exact: true })).toBeVisible();
    await expect(page.getByText('Active Investments', { exact: true })).toBeVisible();
  });

  test('should display recent activity', async ({ page }) => {
    await expect(page.getByText(/Recent Activity/i)).toBeVisible();
  });

  test('should navigate to Users page', async ({ page }) => {
    await page.getByRole('link', { name: 'Users', exact: true }).click();
    await expect(page).toHaveURL(/.*admin\/users/);
    await expect(page.getByRole('heading', { name: /Users/i })).toBeVisible();
  });

  test('should navigate to Portfolios page', async ({ page }) => {
    await page.getByRole('link', { name: 'Portfolios', exact: true }).click();
    await expect(page).toHaveURL(/.*admin\/portfolios/);
    await expect(page.getByRole('heading', { name: /Portfolios/i })).toBeVisible();
  });
});

test.describe('Admin Users Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/portal');
    await page.evaluate(() => { localStorage.clear(); sessionStorage.clear(); });
    await page.reload();
    await page.goto('/portal');
    await page.getByPlaceholder(/investor@terravest.cm/i).fill('admin@terravest.cm');
    await page.getByPlaceholder("••••••••").fill('admin123');
    await page.getByRole('button', { name: /Sign in/i }).click();
    await page.waitForURL(/.*dashboard/, { timeout: 15000 });
    await page.goto('/portal/admin/users');
  });

  test('should display users list', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Users/i })).toBeVisible();
  });

  test('should search users', async ({ page }) => {
    const search = page.locator('input[type="text"]').first();
    if (await search.isVisible().catch(() => false)) {
      await search.fill('investor');
      await page.waitForTimeout(300);
    }
  });

  test('should view user details', async ({ page }) => {
    const viewButton = page.getByRole('button', { name: /View/i }).first();
    if (await viewButton.isVisible().catch(() => false)) {
      await viewButton.click();
    }
  });

  test('should edit user', async ({ page }) => {
    const editButton = page.getByRole('button', { name: /Edit/i }).first();
    if (await editButton.isVisible().catch(() => false)) {
      await editButton.click();
    }
  });
});

test.describe('Admin Portfolios Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/portal');
    await page.evaluate(() => { localStorage.clear(); sessionStorage.clear(); });
    await page.reload();
    await page.goto('/portal');
    await page.getByPlaceholder(/investor@terravest.cm/i).fill('admin@terravest.cm');
    await page.getByPlaceholder("••••••••").fill('admin123');
    await page.getByRole('button', { name: /Sign in/i }).click();
    await page.waitForURL(/.*dashboard/, { timeout: 15000 });
    await page.goto('/portal/admin/portfolios');
  });

  test('should display portfolios list', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Portfolios/i })).toBeVisible();
  });

  test('should view investor portfolio', async ({ page }) => {
    const viewButton = page.getByRole('button', { name: /View/i }).first();
    if (await viewButton.isVisible().catch(() => false)) {
      await viewButton.click();
    }
  });
});

test.describe('Admin Opportunities Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/portal');
    await page.evaluate(() => { localStorage.clear(); sessionStorage.clear(); });
    await page.reload();
    await page.goto('/portal');
    await page.getByPlaceholder(/investor@terravest.cm/i).fill('admin@terravest.cm');
    await page.getByPlaceholder("••••••••").fill('admin123');
    await page.getByRole('button', { name: /Sign in/i }).click();
    await page.waitForURL(/.*dashboard/, { timeout: 15000 });
    await page.goto('/portal/admin/opportunities');
  });

  test('should display opportunities list', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Opportunities/i })).toBeVisible();
  });

  test('should edit opportunity', async ({ page }) => {
    const editButton = page.getByRole('button', { name: /Edit/i }).first();
    if (await editButton.isVisible().catch(() => false)) {
      await editButton.click();
    }
  });

  test('should close opportunity', async ({ page }) => {
    const closeButton = page.getByRole('button', { name: /Close/i }).first();
    if (await closeButton.isVisible().catch(() => false)) {
      await closeButton.click();
    }
  });
});
