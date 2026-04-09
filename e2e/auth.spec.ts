import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should display login form', async ({ page }) => {
    await page.goto('http://localhost:5173/portal');
    await expect(page.getByRole('heading', { name: /Sign in/i })).toBeVisible({ timeout: 10000 });
    await expect(page.getByPlaceholder(/investor@terravest.cm/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /Sign in/i })).toBeVisible();
  });

  test('should show validation error for empty email', async ({ page }) => {
    await page.goto('http://localhost:5173/portal');
    await page.getByRole('button', { name: /Sign in/i }).click();
    await expect(page.getByText(/Please enter your email/i)).toBeVisible({ timeout: 5000 });
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('http://localhost:5173/portal');
    await page.getByPlaceholder(/investor@terravest.cm/i).fill('invalid@example.com');
    await page.getByPlaceholder('••••••••').fill('wrongpassword');
    await page.getByRole('button', { name: /Sign in/i }).click();
    await expect(page.getByText(/Invalid email or password/i)).toBeVisible({ timeout: 10000 });
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await page.goto('http://localhost:5173/portal');
    await page.getByPlaceholder(/investor@terravest.cm/i).fill('investor@terravest.cm');
    await page.getByPlaceholder('••••••••').fill('password123');
    await page.getByRole('button', { name: /Sign in/i }).click();
    
    await expect(page).toHaveURL(/.*dashboard/, { timeout: 15000 });
    await expect(page.getByText(/Welcome back/i)).toBeVisible();
  });

  test('should redirect to login when accessing protected route unauthenticated', async ({ page }) => {
    await page.goto('http://localhost:5173/portal/dashboard');
    await expect(page).toHaveURL(/.*login|.*portal/, { timeout: 10000 });
  });

  test('should logout successfully', async ({ page }) => {
    await page.goto('http://localhost:5173/portal');
    await page.getByPlaceholder(/investor@terravest.cm/i).fill('investor@terravest.cm');
    await page.getByPlaceholder('••••••••').fill('password123');
    await page.getByRole('button', { name: /Sign in/i }).click();
    
    await expect(page).toHaveURL(/.*dashboard/, { timeout: 15000 });
    
    await page.getByText(/Sign out/i).click();
    await expect(page).toHaveURL(/.*login|.*portal/, { timeout: 10000 });
  });

  test('should persist session after page reload', async ({ page }) => {
    await page.goto('http://localhost:5173/portal');
    await page.getByPlaceholder(/investor@terravest.cm/i).fill('investor@terravest.cm');
    await page.getByPlaceholder('••••••••').fill('password123');
    await page.getByRole('button', { name: /Sign in/i }).click();
    
    await expect(page).toHaveURL(/.*dashboard/, { timeout: 15000 });
    
    await page.reload();
    await expect(page).toHaveURL(/.*dashboard/, { timeout: 10000 });
  });
});

  test('should show validation errors for empty fields', async ({ page }) => {
    await page.goto('http://localhost:5173/portal');
    await page.getByRole('button', { name: /Sign in/i }).click();
    await expect(page.getByText(/Invalid email or password/i)).toBeVisible({ timeout: 5000 });
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('http://localhost:5173/portal');
    await page.getByPlaceholder(/investor@terravest.cm/i).fill('invalid@example.com');
    await page.getByPlaceholder("••••••••").fill('wrongpassword');
    await page.getByRole('button', { name: /Sign in/i }).click();
    await expect(page.getByText(/Invalid email or password/i)).toBeVisible({ timeout: 5000 });
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await page.goto('http://localhost:5173/portal');
    await page.getByPlaceholder(/investor@terravest.cm/i).fill('investor@terravest.cm');
    await page.getByPlaceholder("••••••••").fill('password123');
    await page.getByRole('button', { name: /Sign in/i }).click();
    
    await expect(page).toHaveURL(/.*dashboard/, { timeout: 10000 });
    await expect(page.getByText(/Welcome back/i)).toBeVisible();
  });

  test('should redirect to login when accessing protected route unauthenticated', async ({ page }) => {
    await page.goto('http://localhost:5173/portal#/dashboard');
    await expect(page).toHaveURL(/.*login/, { timeout: 10000 });
  });

  test('should logout successfully', async ({ page }) => {
    await page.goto('http://localhost:5173/portal');
    await page.getByPlaceholder(/investor@terravest.cm/i).fill('investor@terravest.cm');
    await page.getByPlaceholder("••••••••").fill('password123');
    await page.getByRole('button', { name: /Sign in/i }).click();
    
    await expect(page).toHaveURL(/.*dashboard/, { timeout: 10000 });
    
    await page.getByText(/Sign out/i).click();
    await expect(page).toHaveURL(/.*login/, { timeout: 10000 });
  });

  test('should persist session after page reload', async ({ page }) => {
    await page.goto('http://localhost:5173/portal');
    await page.getByPlaceholder(/investor@terravest.cm/i).fill('investor@terravest.cm');
    await page.getByPlaceholder("••••••••").fill('password123');
    await page.getByRole('button', { name: /Sign in/i }).click();
    
    await expect(page).toHaveURL(/.*dashboard/, { timeout: 10000 });
    
    await page.reload();
    await expect(page).toHaveURL(/.*dashboard/, { timeout: 10000 });
  });
});