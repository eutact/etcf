async function isolate(context) {
  await context.route("**/*", (route) => {
    const url = new URL(route.request().url());
    if (["localhost", "127.0.0.1"].includes(url.hostname))
      return route.continue();
    if (!url.hostname.endsWith(".sanity.io")) return route.abort();
    const query = url.searchParams.get("query") || "";
    const result = query.includes("eventCard")
      ? {
          title: "November 2026 - Tamil Mass",
          subtitle: "Dedicated to All Saints & All Souls",
          description:
            "Join the Edmonton Tamil Catholic Family for our Tamil Mass, as we come together in celebration during this special month dedicated to All Saints and All Souls.",
          date: "2099-11-14",
          time: "6:45 PM Rosary | 7:00 PM Tamil Mass",
          venue:
            "St Theresa Catholic Church, 7508 29 Ave NW, Edmonton, AB T6K 3Y8, Canada",
          image: {
            asset: { url: "/images/events/Jan_2025.jpg" },
          },
        }
      : query.includes("tickerCard")
        ? []
        : null;
    return route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({ result }),
    });
  });
}
async function settleLayout(page) {
  await page.evaluate(
    () =>
      new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve)),
      ),
  );
}
async function horizontalOverflow(page) {
  return page.evaluate(() =>
    [...document.querySelectorAll("body *")]
      .filter((element) => {
        // The marquee intentionally extends beyond its clipped viewport. Next's
        // screen reader announcer is also intentionally positioned offscreen.
        if (
          element.id === "__next-route-announcer__" ||
          element.closest(
            "#tickerTrack,.news-carousel,.carousel-slides,#mobile-menu,#mobile-backdrop,#lightbox",
          )
        )
          return false;
        // Firefox can retain geometry for the hidden contents of a closed
        // disclosure after a resize. Only its summary is currently visible.
        const closed = element.closest("details:not([open])");
        if (
          closed &&
          closed !== element &&
          !closed.querySelector(":scope > summary")?.contains(element)
        )
          return false;
        const box = element.getBoundingClientRect();
        return (
          box.width &&
          box.height &&
          (box.left < -1 || box.right > innerWidth + 1) &&
          getComputedStyle(element).position !== "fixed"
        );
      })
      .map(
        (element) =>
          `${element.tagName}#${element.id}.${String(element.className).replaceAll(" ", ".")}`,
      )
      .slice(0, 10),
  );
}
module.exports = { isolate, settleLayout, horizontalOverflow };
