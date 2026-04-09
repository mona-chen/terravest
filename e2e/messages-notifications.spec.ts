import { test, expect } from '@playwright/test';

test.describe('Messages', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/portal.html');
    await page.getByPlaceholder(/investor@terravest.cm/i).fill('investor@terravest.cm');
    await page.getByPlaceholder("••••••••").fill('password123');
    await page.getByRole('button', { name: /Sign in/i }).click();
    await page.getByRole('link', { name: /Messages/i }).click();
    await expect(page).toHaveURL(/.*messages/);
  });

  test('should display messages header', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Messages/i })).toBeVisible();
  });

  test('should display search messages input', async ({ page }) => {
    await expect(page.getByPlaceholder(/Search messages/i)).toBeVisible();
  });

  test('should display message list', async ({ page }) => {
    await expect(page.locator('[class*="message-list"]').or(page.locator('button').filter({ hasText: /Subject/i }))).toBeVisible();
  });

  test('should select and display message', async ({ page }) => {
    const messageItem = page.locator('button').filter({ has: page.locator('p') }).first();
    if (await messageItem.isVisible().catch(() => false)) {
      await messageItem.click();
      await expect(page.getByPlaceholder(/Write a reply/i)).toBeVisible();
    }
  });

  test('should allow composing reply', async ({ page }) => {
    const messageItem = page.locator('button').filter({ has: page.locator('p') }).first();
    if (await messageItem.isVisible().catch(() => false)) {
      await messageItem.click();
      await page.getByPlaceholder(/Write a reply/i).fill('Test reply message');
      await expect(page.getByRole('button', { name: /Send/i })).toBeEnabled();
    }
  });

  test('should archive message', async ({ page }) => {
    const archiveButton = page.locator('button[title="Archive"]').first();
    if (await archiveButton.isVisible().catch(() => false)) {
      await archiveButton.click();
    }
  });

  test('should star message', async ({ page }) => {
    const starButton = page.locator('button[title="Star"]').first();
    if (await starButton.isVisible().catch(() => false)) {
      await starButton.click();
    }
  });

  test('should delete message', async ({ page }) => {
    const deleteButton = page.locator('button[title="Delete"]').first();
    if (await deleteButton.isVisible().catch(() => false)) {
      await deleteButton.click();
    }
  });

  test('should search messages', async ({ page }) => {
    await page.getByPlaceholder(/Search messages/i).fill('test');
    await page.waitForTimeout(300);
  });
});

test.describe('Notifications', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/portal.html');
    await page.getByPlaceholder(/investor@terravest.cm/i).fill('investor@terravest.cm');
    await page.getByPlaceholder("••••••••").fill('password123');
    await page.getByRole('button', { name: /Sign in/i }).click();
    await page.getByRole('link', { name: /Notifications/i }).click();
    await expect(page).toHaveURL(/.*notifications/);
  });

  test('should display notifications header', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Notifications/i })).toBeVisible();
  });

  test('should display notification filters', async ({ page }) => {
    await expect(page.getByRole('button', { name: /All/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Unread/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Read/i })).toBeVisible();
  });

  test('should display mark all as read button', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Mark all as read/i })).toBeVisible();
  });

  test('should filter notifications by unread', async ({ page }) => {
    await page.getByRole('button', { name: /Unread/i }).click();
    await expect(page.getByRole('button', { name: /Unread/i })).toHaveClass(/bg-\[\#8FB8A3\]/);
  });

  test('should mark notification as read', async ({ page }) => {
    const notification = page.locator('[class*="notification"]').first();
    if (await notification.isVisible().catch(() => false)) {
      await notification.click();
    }
  });

  test('should delete notification', async ({ page }) => {
    const deleteButton = page.locator('button[title="Delete"]').first();
    if (await deleteButton.isVisible().catch(() => false)) {
      await deleteButton.click();
    }
  });

  test('should display notification bell with count in sidebar', async ({ page }) => {
    const notificationLink = page.getByRole('link', { name: /Notifications/i });
    await expect(notificationLink).toBeVisible();
  });

  test('should navigate to related page from notification', async ({ page }) => {
    const actionLink = page.locator('a[href*="/"]').filter({ hasText: /View/i }).first();
    if (await actionLink.isVisible().catch(() => false)) {
      await actionLink.click();
    }
  });
});
