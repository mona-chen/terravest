import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display hero section with title', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /TerraVest/i })).toBeVisible();
    await expect(page.getByText(/Investing in Cameroon's Future/i)).toBeVisible();
  });

  test('should have navigation with all links', async ({ page }) => {
    await expect(page.getByRole('link', { name: /Investment Criteria/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Leadership/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Case Studies/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /News/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Careers/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Portal/i })).toBeVisible();
  });

  test('should display intro section', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 500));
    await expect(page.getByText(/Who We Are/i)).toBeVisible();
  });

  test('should display sectors section', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 1000));
    await expect(page.getByText(/Investment Sectors/i)).toBeVisible();
    await expect(page.getByText(/Agriculture/i)).toBeVisible();
    await expect(page.getByText(/Technology/i)).toBeVisible();
    await expect(page.getByText(/Renewable Energy/i)).toBeVisible();
  });

  test('should display approach section', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 2000));
    await expect(page.getByText(/Our Approach/i)).toBeVisible();
  });

  test('should display governance section', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 3000));
    await expect(page.getByText(/Governance/i)).toBeVisible();
  });

  test('should display performance section', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 4000));
    await expect(page.getByText(/Performance/i)).toBeVisible();
  });

  test('should display sustainability section', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 5000));
    await expect(page.getByText(/Sustainability/i)).toBeVisible();
  });

  test('should display presence section', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 6000));
    await expect(page.getByText(/Our Presence/i)).toBeVisible();
  });

  test('should display testimonials section', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 7000));
    await expect(page.getByText(/Testimonials/i)).toBeVisible();
  });

  test('should display team section', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 8000));
    await expect(page.getByText(/Our Team/i)).toBeVisible();
  });

  test('should display newsletter section', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 9000));
    await expect(page.getByText(/Newsletter/i)).toBeVisible();
    await expect(page.getByPlaceholder(/Enter your email/i)).toBeVisible();
  });

  test('should display FAQ section', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 10000));
    await expect(page.getByText(/FAQ/i)).toBeVisible();
  });

  test('should display portal section with login link', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 11000));
    await expect(page.getByText(/Investor Portal/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /Access Portal/i })).toBeVisible();
  });

  test('should display contact section', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 12000));
    await expect(page.getByText(/Contact/i)).toBeVisible();
  });

  test('should display footer with links', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.getByRole('contentinfo')).toBeVisible();
  });

  test('should navigate to Investment Criteria page', async ({ page }) => {
    await page.getByRole('link', { name: /Investment Criteria/i }).click();
    await expect(page).toHaveURL(/.*investment-criteria/);
    await expect(page.getByRole('heading', { name: /Investment Criteria/i })).toBeVisible();
  });

  test('should navigate to Leadership page', async ({ page }) => {
    await page.getByRole('link', { name: /Leadership/i }).click();
    await expect(page).toHaveURL(/.*leadership/);
    await expect(page.getByRole('heading', { name: /Leadership/i })).toBeVisible();
  });

  test('should navigate to Case Studies page', async ({ page }) => {
    await page.getByRole('link', { name: /Case Studies/i }).click();
    await expect(page).toHaveURL(/.*case-studies/);
    await expect(page.getByRole('heading', { name: /Case Studies/i })).toBeVisible();
  });

  test('should navigate to News page', async ({ page }) => {
    await page.getByRole('link', { name: /News/i }).click();
    await expect(page).toHaveURL(/.*news/);
    await expect(page.getByRole('heading', { name: /News/i })).toBeVisible();
  });

  test('should navigate to Careers page', async ({ page }) => {
    await page.getByRole('link', { name: /Careers/i }).click();
    await expect(page).toHaveURL(/.*careers/);
    await expect(page.getByRole('heading', { name: /Careers/i })).toBeVisible();
  });
});
