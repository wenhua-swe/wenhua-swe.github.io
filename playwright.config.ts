import { defineConfig, devices } from '@playwright/test';

// End-to-end tests run against the built site (`yarn build` first), never the dev server:
// search only works once Pagefind has indexed dist/, and the dev server is far too slow to scan.
const PORT = 4323;

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    // --ignore-lock: a preview left running for manual checks would otherwise make this one exit
    command: `yarn preview --port ${PORT} --ignore-lock`,
    port: PORT,
    reuseExistingServer: !process.env.CI,
  },
});
