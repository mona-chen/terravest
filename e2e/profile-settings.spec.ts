import { test, expect } from '@playwright/test';

test.describe('Profile', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/portal/profile');
    await expect(page).toHaveURL(/.*profile/);
    await page.waitForResponse(res => res.url().includes('/api/auth/me') && res.status() === 200, { timeout: 15000 });
  });

  test('should display profile header', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Profile/i })).toBeVisible();
  });

  test('should display user avatar', async ({ page }) => {
    await expect(page.locator('img.rounded-full').first()).toBeVisible();
  });

  test('should display user name', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Jean-Pierre Moussa' })).toBeVisible();
  });

  test('should display user email', async ({ page }) => {
    await expect(page.getByText(/investor@terravest.cm/i)).toBeVisible();
  });

  test('should display member since info', async ({ page }) => {
    await expect(page.getByText(/Member since/i)).toBeVisible();
  });

  test('should display account status', async ({ page }) => {
    await expect(page.getByText(/Account Status/i)).toBeVisible();
    await expect(page.getByText(/Active/i)).toBeVisible();
  });

  test('should allow editing profile', async ({ page }) => {
    await page.getByRole('button', { name: /Edit Profile/i }).click();
    await expect(page.getByLabel('Full Name', { exact: true })).toBeVisible();
    await expect(page.getByLabel('Phone Number', { exact: true })).toBeVisible();
  });

  test('should save profile changes', async ({ page }) => {
    await page.getByRole('button', { name: /Edit Profile/i }).click();
    await page.getByLabel('Phone Number', { exact: true }).fill('+237 677 123 456');
    await page.getByRole('button', { name: /Save Changes/i }).click();
  });

  test('should cancel editing', async ({ page }) => {
    await page.getByRole('button', { name: /Edit Profile/i }).click();
    await page.getByRole('button', { name: /Cancel/i }).click();
    await expect(page.getByRole('button', { name: /Edit Profile/i })).toBeVisible();
  });
});

test.describe('Settings', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/portal/settings');
    await expect(page).toHaveURL(/.*settings/);
    await page.waitForResponse(res => res.url().includes('/api/auth/me') && res.status() === 200, { timeout: 15000 });
  });

  test('should display settings header', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Settings/i })).toBeVisible();
  });

  test('should display account settings tab', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Account', exact: true })).toBeVisible();
  });

  test('should display notifications settings tab', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Notifications', exact: true })).toBeVisible();
  });

  test('should display security settings tab', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Security', exact: true })).toBeVisible();
  });

  test('should display appearance settings tab', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Appearance', exact: true })).toBeVisible();
  });

  test('should change password', async ({ page }) => {
    await page.getByRole('button', { name: 'Security', exact: true }).click();
    await page.getByLabel('Current Password', { exact: true }).fill('password123');
    await page.getByLabel('New Password', { exact: true }).fill('newpassword123');
    await page.getByLabel('Confirm New Password', { exact: true }).fill('newpassword123');
    await page.getByRole('button', { name: /Change Password/i }).click();
  });

  test('should toggle notification preferences', async ({ page }) => {
    await page.getByRole('button', { name: 'Notifications', exact: true }).click();
    const toggle = page.locator('label').filter({ has: page.locator('input[type="checkbox"]') }).first();
    if (await toggle.isVisible().catch(() => false)) {
      await toggle.click();
    }
  });
});
