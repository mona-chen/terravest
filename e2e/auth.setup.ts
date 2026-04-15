import { test as setup, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const authDir = path.join(__dirname, '../playwright/.auth');

setup.use({ storageState: {} });

setup('authenticate as investor', async ({ page }) => {
  if (!fs.existsSync(authDir)) fs.mkdirSync(authDir, { recursive: true });

  await page.goto('/portal');
  await page.getByPlaceholder(/investor@terravest.cm/i).fill('investor@terravest.cm');
  await page.getByPlaceholder('••••••••').fill('password123');
  await page.getByRole('button', { name: /Sign in/i }).click();
  await page.waitForURL(/.*dashboard/, { timeout: 15000 });
  await expect(page.getByText(/Welcome back/i)).toBeVisible();

  await page.context().storageState({ path: path.join(authDir, 'investor.json') });
});

setup('authenticate as admin', async ({ page }) => {
  if (!fs.existsSync(authDir)) fs.mkdirSync(authDir, { recursive: true });

  await page.goto('/portal');
  await page.getByPlaceholder(/investor@terravest.cm/i).fill('admin@terravest.cm');
  await page.getByPlaceholder('••••••••').fill('admin123');
  await page.getByRole('button', { name: /Sign in/i }).click();
  await page.waitForURL(/.*dashboard/, { timeout: 15000 });
  await page.goto('/portal/admin/dashboard');
  await expect(page).toHaveURL(/.*admin\/dashboard/);
  await expect(page.getByRole('heading', { name: /Admin Dashboard/i })).toBeVisible();

  await page.context().storageState({ path: path.join(authDir, 'admin.json') });
});
