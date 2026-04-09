import { test, expect } from '@playwright/test';

test('verify login page loads', async ({ page }) => {
  console.log('Navigating to login page...');
  await page.goto('http://localhost:5174/portal');
  console.log('Page loaded, URL:', page.url());
  
  const title = await page.title();
  console.log('Page title:', title);
  
  const bodyText = await page.textContent('body');
  console.log('Body text preview:', bodyText?.substring(0, 200));
  
  await expect(page).toHaveTitle(/TerraVest/);
  console.log('Title check passed');
});

test('verify login form elements exist', async ({ page }) => {
  await page.goto('http://localhost:5174/portal');
  
  console.log('Looking for Sign in heading...');
  const signInHeading = page.getByRole('heading', { name: /Sign in/i });
  await expect(signInHeading).toBeVisible({ timeout: 5000 });
  console.log('Sign in heading found');
  
  console.log('Looking for email input...');
  const emailInput = page.locator('input[type="email"]').first();
  await expect(emailInput).toBeVisible({ timeout: 5000 });
  console.log('Email input found');
  
  console.log('Looking for password input...');
  const passwordInput = page.locator('input[type="password"]').first();
  await expect(passwordInput).toBeVisible({ timeout: 5000 });
  console.log('Password input found');
  
  console.log('Looking for Sign in button...');
  const signInButton = page.getByRole('button', { name: /Sign in/i });
  await expect(signInButton).toBeVisible({ timeout: 5000 });
  console.log('Sign in button found');
});

test('login with valid credentials', async ({ page }) => {
  await page.goto('http://localhost:5174/portal');
  
  console.log('Filling email...');
  await page.locator('input[type="email"]').first().fill('investor@terravest.cm');
  
  console.log('Filling password...');
  await page.locator('input[type="password"]').first().fill('password123');
  
  console.log('Clicking Sign in...');
  await page.getByRole('button', { name: /Sign in/i }).click();
  
  console.log('Waiting for navigation...');
  await page.waitForURL(/.*dashboard/, { timeout: 15000 });
  console.log('Navigation successful, URL:', page.url());
  
  const welcomeText = await page.getByText(/Welcome back/i).isVisible();
  console.log('Welcome text visible:', welcomeText);
});
