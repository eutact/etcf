const { defineConfig } = require("@playwright/test");

const chromium = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
  ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
  : {};
const projects = [
  {
    name: "desktop",
    use: {
      browserName: "chromium",
      viewport: { width: 1440, height: 900 },
      launchOptions: chromium,
    },
  },
  {
    name: "phone",
    use: {
      browserName: "chromium",
      viewport: { width: 390, height: 844 },
      launchOptions: chromium,
    },
  },
];
if (process.env.ETCF_CROSS_BROWSER === "1") {
  for (const browserName of ["webkit", "firefox"]) {
    for (const [layout, viewport] of Object.entries({
      desktop: { width: 1440, height: 900 },
      phone: { width: 390, height: 844 },
    }))
      projects.push({
        name: `${browserName}-${layout}`,
        use: { browserName, viewport },
      });
  }
}

module.exports = defineConfig({
  testDir: "./tests/browser",
  testMatch: "**/*.spec.cjs",
  workers: 2,
  timeout: 60000,
  retries: process.env.CI ? 1 : 0,
  use: {
    baseURL: "http://localhost:8003",
    reducedMotion: "reduce",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  projects,
  webServer: [
    {
      command: "npm start -- --port 8003",
      url: "http://localhost:8003",
      timeout: 30000,
    },
  ],
});
