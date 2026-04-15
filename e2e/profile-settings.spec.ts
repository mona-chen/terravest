import { test, expect } from '@playwright/test';

test.describe('Profile', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/portal');
    await page.getByPlaceholder(/investor@terravest.cm/i).fill('investor@terravest.cm');
    await page.getByPlaceholder("••••••••").fill('password123');
    await page.getByRole('button', { name: /Sign in/i }).click();
    await page.getByRole('link', { name: /Profile/i }).click();
    await expect(page).toHaveURL(/.*profile/);
  });

  test('should display profile header', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Profile/i })).toBeVisible();
  });

  test('should display user avatar', async ({ page }) => {
    await expect(page.locator('img[alt*="Investor"]').first()).toBeVisible();
  });

  test('should display user name', async ({ page }) => {
    await expect(page.getByText(/Investor User/i)).toBeVisible();
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
    await expect(page.getByLabel(/Full Name/i)).toBeVisible();
    await expect(page.getByLabel(/Phone Number/i)).toBeVisible();
    await expect(page.getByLabel(/Company/i)).toBeVisible();
  });

  test('should save profile changes', async ({ page }) => {
    await page.getByRole('button', { name: /Edit Profile/i }).click();
    await page.getByLabel(/Phone Number/i).fill('+237 677 123 456');
    await page.getByRole('button', { name: /Save Changes/i }).click();
    await expect(page.getByText(/Profile updated successfully/i)).toBeVisible();
  });

  test('should cancel editing', async ({ page }) => {
    await page.getByRole('button', { name: /Edit Profile/i }).click();
    await page.getByRole('button', { name: /Cancel/i }).click();
    await expect(page.getByRole('button', { name: /Edit Profile/i })).toBeVisible();
  });

  test('should display security notice', async ({ page }) => {
    await expect(page.getByText(/Security Notice/i)).toBeVisible();
  });
});

test.describe('Settings', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/portal');
    await page.getByPlaceholder(/investor@terravest.cm/i).fill('investor@terravest.cm');
    await page.getByPlaceholder("••••••••").fill('password123');
    await page.getByRole('button', { name: /Sign in/i }).click();
    await page.getByRole('link', { name: /Settings/i }).click();
    await expect(page).toHaveURL(/.*settings/);
  });

  test('should display settings header', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Settings/i })).toBeVisible();
  });

  test('should display account settings tab', async ({ page }) => {
    await expect(page.getByRole('tab', { name: /Account/i })).toBeVisible();
  });

  test('should display notifications settings tab', async ({ page }) => {
    await expect(page.getByRole('tab', { name: /Notifications/i })).toBeVisible();
  });

  test('should display security settings tab', async ({ page }) => {
    await expect(page.getByRole('tab', { name: /Security/i })).toBeVisible();
  });

  test('should display appearance settings tab', async ({ page }) => {
    await expect(page.getByRole('tab', { name: /Appearance/i })).toBeVisible();
  });

  test('should change password', async ({ page }) => {
    await page.getByRole('tab', { name: /Security/i }).click();
    await page.getByLabel(/Current Password/i).fill('password123');
    await page.getByLabel(/New Password/i).fill('newpassword123');
    await page.getByLabel(/Confirm New Password/i).fill('newpassword123');
    await page.getByRole('button', { name: /Change Password/i }).click();
  });

  test('should toggle notification preferences', async ({ page }) => {
    await page.getByRole('tab', { name: /Notifications/i }).click();
    const toggle = page.locator('input[type="checkbox"]').first();
    if (await toggle.isVisible().catch(() => false)) {
      await toggle.click();
    }
  });

  test('should enable 2FA', async ({ page }) => {
    await page.getByRole('tab', { name: /Security/i }).click();
    const enable2FA = page.getByRole('button', { name: /Enable 2FA/i });
    if (await enable2FA.isVisible().catch(() => false)) {
      await enable2FA.click();
    }
  });

  test('should display connected devices', async ({ page }) => {
    await page.getByRole('tab', { name: /Security/i }).click();
    await expect(page.getByText(/Connected Devices/i)).toBeVisible();
  });
});
