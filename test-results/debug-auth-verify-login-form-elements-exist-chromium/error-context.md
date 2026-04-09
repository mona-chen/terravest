# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: debug-auth.spec.ts >> verify login form elements exist
- Location: e2e/debug-auth.spec.ts:18:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "http://localhost:5174/portal.html", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('verify login page loads', async ({ page }) => {
  4  |   console.log('Navigating to login page...');
  5  |   await page.goto('http://localhost:5174/portal.html');
  6  |   console.log('Page loaded, URL:', page.url());
  7  |   
  8  |   const title = await page.title();
  9  |   console.log('Page title:', title);
  10 |   
  11 |   const bodyText = await page.textContent('body');
  12 |   console.log('Body text preview:', bodyText?.substring(0, 200));
  13 |   
  14 |   await expect(page).toHaveTitle(/TerraVest/);
  15 |   console.log('Title check passed');
  16 | });
  17 | 
  18 | test('verify login form elements exist', async ({ page }) => {
> 19 |   await page.goto('http://localhost:5174/portal.html');
     |              ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
  20 |   
  21 |   console.log('Looking for Sign in heading...');
  22 |   const signInHeading = page.getByRole('heading', { name: /Sign in/i });
  23 |   await expect(signInHeading).toBeVisible({ timeout: 5000 });
  24 |   console.log('Sign in heading found');
  25 |   
  26 |   console.log('Looking for email input...');
  27 |   const emailInput = page.locator('input[type="email"]').first();
  28 |   await expect(emailInput).toBeVisible({ timeout: 5000 });
  29 |   console.log('Email input found');
  30 |   
  31 |   console.log('Looking for password input...');
  32 |   const passwordInput = page.locator('input[type="password"]').first();
  33 |   await expect(passwordInput).toBeVisible({ timeout: 5000 });
  34 |   console.log('Password input found');
  35 |   
  36 |   console.log('Looking for Sign in button...');
  37 |   const signInButton = page.getByRole('button', { name: /Sign in/i });
  38 |   await expect(signInButton).toBeVisible({ timeout: 5000 });
  39 |   console.log('Sign in button found');
  40 | });
  41 | 
  42 | test('login with valid credentials', async ({ page }) => {
  43 |   await page.goto('http://localhost:5174/portal.html');
  44 |   
  45 |   console.log('Filling email...');
  46 |   await page.locator('input[type="email"]').first().fill('investor@terravest.cm');
  47 |   
  48 |   console.log('Filling password...');
  49 |   await page.locator('input[type="password"]').first().fill('password123');
  50 |   
  51 |   console.log('Clicking Sign in...');
  52 |   await page.getByRole('button', { name: /Sign in/i }).click();
  53 |   
  54 |   console.log('Waiting for navigation...');
  55 |   await page.waitForURL(/.*dashboard/, { timeout: 15000 });
  56 |   console.log('Navigation successful, URL:', page.url());
  57 |   
  58 |   const welcomeText = await page.getByText(/Welcome back/i).isVisible();
  59 |   console.log('Welcome text visible:', welcomeText);
  60 | });
  61 | 
```