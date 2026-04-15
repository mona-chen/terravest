import { defineConfig, devices } from '@playwright/test';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const authDir = path.resolve(__dirname, './playwright/.auth');

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    headless: true,
  },
  projects: [
    { name: 'setup', testMatch: /auth\.setup\.ts/ },
    {
      name: 'chromium-investor',
      use: { ...devices['Desktop Chrome'], storageState: path.join(authDir, 'investor.json') },
      dependencies: ['setup'],
      testMatch: /(documents|messages-notifications|opportunities-compliance|portfolio|profile-settings|dashboard)\.spec\.ts/,
    },
    {
      name: 'chromium-admin',
      use: { ...devices['Desktop Chrome'], storageState: path.join(authDir, 'admin.json') },
      dependencies: ['setup'],
      testMatch: /admin\.spec\.ts/,
    },
    {
      name: 'chromium-public',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /(landing-page|spa-routing|auth|simple-test)\.spec\.ts/,
    },
  ],
});
