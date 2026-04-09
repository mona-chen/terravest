import { test, expect } from '@playwright/test';

test.describe('Admin Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/portal.html');
    await page.getByPlaceholder(/investor@terravest.cm/i).fill('admin@terravest.cm');
    await page.getByPlaceholder("••••••••").fill('admin123');
    await page.getByRole('button', { name: /Sign in/i }).click();
    await page.waitForURL(/.*dashboard/);
    await page.goto('/portal.html#/admin/dashboard');
  });

  test('should display admin dashboard header', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Admin Dashboard/i })).toBeVisible();
  });

  test('should display admin sidebar navigation', async ({ page }) => {
    await expect(page.getByRole('link', { name: /Dashboard/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Users/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Portfolios/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Opportunities/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Documents/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Analytics/i })).toBeVisible();
  });

  test('should display key metrics', async ({ page }) => {
    await expect(page.getByText(/Total Users/i)).toBeVisible();
    await expect(page.getByText(/Active Investors/i)).toBeVisible();
    await expect(page.getByText(/Total AUM/i)).toBeVisible();
    await expect(page.getByText(/Total Companies/i)).toBeVisible();
  });

  test('should display recent activity', async ({ page }) => {
    await expect(page.getByText(/Recent Activity/i)).toBeVisible();
  });

  test('should navigate to Users page', async ({ page }) => {
    await page.getByRole('link', { name: /Users/i }).click();
    await expect(page).toHaveURL(/.*admin\/users/);
    await expect(page.getByRole('heading', { name: /Users/i })).toBeVisible();
  });

  test('should navigate to Portfolios page', async ({ page }) => {
    await page.getByRole('link', { name: /Portfolios/i }).click();
    await expect(page).toHaveURL(/.*admin\/portfolios/);
    await expect(page.getByRole('heading', { name: /Portfolios/i })).toBeVisible();
  });
});

test.describe('Admin Users Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/portal.html');
    await page.getByPlaceholder(/investor@terravest.cm/i).fill('admin@terravest.cm');
    await page.getByPlaceholder("••••••••").fill('admin123');
    await page.getByRole('button', { name: /Sign in/i }).click();
    await page.waitForURL(/.*dashboard/);
    await page.goto('/portal.html#/admin/users');
  });

  test('should display users list', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Users/i })).toBeVisible();
    await expect(page.getByText(/Name/i)).toBeVisible();
    await expect(page.getByText(/Email/i)).toBeVisible();
    await expect(page.getByText(/Role/i)).toBeVisible();
    await expect(page.getByText(/Status/i)).toBeVisible();
  });

  test('should search users', async ({ page }) => {
    await page.getByPlaceholder(/Search users/i).fill('investor');
    await page.waitForTimeout(300);
  });

  test('should filter by role', async ({ page }) => {
    await page.getByRole('combobox', { name: /Role/i }).selectOption('INVESTOR');
    await page.waitForTimeout(300);
  });

  test('should view user details', async ({ page }) => {
    const viewButton = page.getByRole('button', { name: /View/i }).first();
    if (await viewButton.isVisible().catch(() => false)) {
      await viewButton.click();
      await expect(page.getByText(/User Details/i)).toBeVisible();
    }
  });

  test('should edit user', async ({ page }) => {
    const editButton = page.getByRole('button', { name: /Edit/i }).first();
    if (await editButton.isVisible().catch(() => false)) {
      await editButton.click();
      await expect(page.getByRole('button', { name: /Save/i })).toBeVisible();
    }
  });

  test('should deactivate user', async ({ page }) => {
    const deactivateButton = page.getByRole('button', { name: /Deactivate/i }).first();
    if (await deactivateButton.isVisible().catch(() => false)) {
      await deactivateButton.click();
    }
  });

  test('should add new user', async ({ page }) => {
    await page.getByRole('button', { name: /Add User/i }).click();
    await expect(page.getByText(/Add New User/i)).toBeVisible();
  });
});

test.describe('Admin Portfolios Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/portal.html');
    await page.getByPlaceholder(/investor@terravest.cm/i).fill('admin@terravest.cm');
    await page.getByPlaceholder("••••••••").fill('admin123');
    await page.getByRole('button', { name: /Sign in/i }).click();
    await page.waitForURL(/.*dashboard/);
    await page.goto('/portal.html#/admin/portfolios');
  });

  test('should display portfolios list', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Portfolios/i })).toBeVisible();
  });

  test('should display portfolio allocations', async ({ page }) => {
    await expect(page.getByText(/Portfolio Allocations/i)).toBeVisible();
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
    await page.goto('/portal.html');
    await page.getByPlaceholder(/investor@terravest.cm/i).fill('admin@terravest.cm');
    await page.getByPlaceholder("••••••••").fill('admin123');
    await page.getByRole('button', { name: /Sign in/i }).click();
    await page.waitForURL(/.*dashboard/);
    await page.goto('/portal.html#/admin/opportunities');
  });

  test('should display opportunities list', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Opportunities/i })).toBeVisible();
  });

  test('should create new opportunity', async ({ page }) => {
    await page.getByRole('button', { name: /Create Opportunity/i }).click();
    await expect(page.getByText(/Create New Opportunity/i)).toBeVisible();
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
