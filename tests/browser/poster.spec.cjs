const { test, expect } = require("@playwright/test");
for (const [label, width, height] of [
  ["landscape", 1920, 1080],
  ["portrait", 1080, 1920],
]) {
  test(`the full ${label} event poster is displayed without cropping`, async ({
    page,
    context,
  }) => {
    await context.route("**/*", (route) => {
      const url = new URL(route.request().url());
      if (url.pathname === "/poster-test.svg")
        return route.fulfill({
          contentType: "image/svg+xml",
          body: `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="#211c5f"/><rect width="100%" height="20" fill="#f5da5b"/><rect y="${height - 20}" width="100%" height="20" fill="#59afe0"/></svg>`,
        });
      if (["localhost", "127.0.0.1"].includes(url.hostname))
        return route.continue();
      if (url.hostname.endsWith(".sanity.io")) {
        const query = url.searchParams.get("query") || "";
        const result = query.includes("eventCard")
          ? {
              title: "Upcoming Tamil Mass",
              date: "2099-11-14",
              time: "7 PM",
              venue: "Community church",
              image: {
                asset: { url: "http://localhost:8003/poster-test.svg" },
              },
            }
          : query.includes("tickerCard")
            ? []
            : null;
        return route.fulfill({
          contentType: "application/json",
          headers: { "Access-Control-Allow-Origin": "*" },
          body: JSON.stringify({ result }),
        });
      }
      return route.abort();
    });
    await page.goto("/");
    await expect(page.locator("#event-title")).toHaveText(
      "Upcoming Tamil Mass",
    );
    const poster = page.locator("#event-image");
    await poster.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        poster.evaluate((image) => image.complete && image.naturalWidth),
      )
      .toBe(width);
    const sizes = await poster.evaluate((image) => {
      const rect = image.getBoundingClientRect();
      const frame = image.parentElement.getBoundingClientRect();
      return {
        width: rect.width,
        height: rect.height,
        frameHeight: frame.height,
        objectFit: getComputedStyle(image).objectFit,
        viewport: document.documentElement.clientWidth,
        page: document.documentElement.scrollWidth,
      };
    });
    expect(
      Math.abs(sizes.height - (sizes.width * height) / width),
    ).toBeLessThanOrEqual(1);
    expect(sizes.frameHeight).toBeGreaterThanOrEqual(sizes.height);
    expect(sizes.objectFit).toBe("contain");
    expect(sizes.page).toBeLessThanOrEqual(sizes.viewport + 1);
  });
}
