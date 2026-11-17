// Playwright E2E config. @playwright/test is not a repo dependency yet — see docs/prds/atlantic-city-locked-location.md.
import { defineConfig, devices } from '@playwright/test';

// E2E_PORT lets the spec run beside another server that already owns :3000.
const PORT = process.env.E2E_PORT || '3000';
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list']],
  // `next dev` compiles pages on first hit, so the first assertions of a cold run can be slow.
  expect: { timeout: 15_000 },
  use: {
    baseURL: BASE_URL,
    trace: 'retain-on-failure',
  },
  // 1440 wide: below that the header collapses and the nav "Join the Co-Op" button is hidden.
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } }],
  webServer: {
    command: `npm run dev -- -p ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
