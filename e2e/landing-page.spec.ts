import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display hero section with title', async ({ page }) => {
    await expect(page.locator('#hero')).toBeVisible();
    await expect(page.getByText(/Cameroon · Africa · Global/i)).toBeVisible();
  });

  test('should have navigation with all links', async ({ page }) => {
    await expect(page.getByRole('navigation')).toBeVisible();
    await expect(page.getByRole('link', { name: /Investor Portal/i }).first()).toBeVisible();
  });

  test('should display intro section', async ({ page }) => {
    await expect(page.locator('#intro')).toBeVisible();
  });

  test('should display sectors section', async ({ page }) => {
    await expect(page.locator('#sectors')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Sustainability & Climate' })).toBeVisible();
  });

  test('should display approach section', async ({ page }) => {
    await expect(page.locator('#approach')).toBeVisible();
    await expect(page.getByText('Our Approach', { exact: true }).first()).toBeVisible();
  });

  test('should display governance section', async ({ page }) => {
    await expect(page.locator('#governance')).toBeVisible();
  });

  test('should display performance section', async ({ page }) => {
    await expect(page.locator('#performance')).toBeVisible();
  });

  test('should display sustainability section', async ({ page }) => {
    await expect(page.locator('#sustainability')).toBeVisible();
  });

  test('should display presence section', async ({ page }) => {
    await expect(page.locator('#presence')).toBeVisible();
    await expect(page.getByText(/Our Presence/i).first()).toBeVisible();
  });

  test('should display testimonials section', async ({ page }) => {
    await expect(page.locator('#testimonials')).toBeVisible();
    await expect(page.getByText(/Testimonials/i).first()).toBeVisible();
  });

  test('should display team section', async ({ page }) => {
    await expect(page.locator('#team')).toBeVisible();
    await expect(page.getByText('Our Team', { exact: true }).first()).toBeVisible();
  });

  test('should display newsletter section', async ({ page }) => {
    await expect(page.locator('#newsletter')).toBeVisible();
    await expect(page.getByRole('heading', { name: /Subscribe to Our Newsletter/i })).toBeVisible();
  });

  test('should display FAQ section', async ({ page }) => {
    await expect(page.locator('#faq')).toBeVisible();
    await expect(page.getByText(/FAQ/i).first()).toBeVisible();
  });

  test('should display portal section with login link', async ({ page }) => {
    await expect(page.locator('#portal')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Investor Portal' })).toBeVisible();
  });

  test('should display contact section', async ({ page }) => {
    await expect(page.locator('#contact')).toBeVisible();
    await expect(page.getByText('Contact Us', { exact: true }).first()).toBeVisible();
  });

  test('should display footer', async ({ page }) => {
    await expect(page.locator('footer')).toBeVisible();
  });

  test('should navigate to Investment Criteria page', async ({ page }) => {
    await page.locator('nav').getByRole('button', { name: 'About', exact: true }).first().click();
    await page.getByRole('link', { name: /Investment Criteria/i }).click();
    await expect(page).toHaveURL(/.*investment-criteria/);
    await expect(page.getByRole('heading', { name: /Investment Criteria/i })).toBeVisible();
  });

  test('should navigate to Leadership page', async ({ page }) => {
    await page.locator('nav').getByRole('button', { name: 'About', exact: true }).first().click();
    await page.getByRole('link', { name: /Leadership/i }).click();
    await expect(page).toHaveURL(/.*leadership/);
    await expect(page.getByRole('heading', { name: /Leadership/i })).toBeVisible();
  });

  test('should navigate to Case Studies page', async ({ page }) => {
    await page.locator('nav').getByRole('button', { name: 'About', exact: true }).first().click();
    await page.getByRole('link', { name: /Case Studies/i }).click();
    await expect(page).toHaveURL(/.*case-studies/);
    await expect(page.getByRole('heading', { name: /Case Studies/i })).toBeVisible();
  });

  test('should navigate to News page', async ({ page }) => {
    await page.locator('nav').getByRole('button', { name: 'About', exact: true }).first().click();
    await page.getByRole('link', { name: /News/i }).click();
    await expect(page).toHaveURL(/.*news/);
    await expect(page.getByRole('heading', { name: /News/i })).toBeVisible();
  });

  test('should navigate to Careers page', async ({ page }) => {
    await page.locator('nav').getByRole('button', { name: 'About', exact: true }).first().click();
    await page.getByRole('link', { name: /Careers/i }).click();
    await expect(page).toHaveURL(/.*careers/);
    await expect(page.getByText(/Join Our Team/i)).toBeVisible();
  });
});
