import { defineConfig } from "@playwright/test";

/*
  E2E + accessibility tests against a local production build (`next start`),
  not the Cloudflare preview URL. Run with `npm run test:e2e`.
*/
const isCI = !!process.env.CI;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  reporter: isCI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "retain-on-failure",
    browserName: "chromium",
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1280, height: 800 } } },
    { name: "mobile", use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
  ],
  webServer: {
    command: "npm run build && npm run start",
    url: "http://localhost:3000/styleguide",
    reuseExistingServer: !isCI,
    timeout: 180_000,
  },
});
