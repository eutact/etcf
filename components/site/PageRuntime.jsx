import { useEffect, useLayoutEffect } from "react";
import site from "../../src/js/site.js";
import { createClient } from "@sanity/client";
import initializeMotion from "../../src/js/motion.js";

// Existing browser controllers are initialized after React hydration. Keeping their
// module imports in sequence preserves their dependencies and current behavior.
async function initialize(page) {
  if (page === "home") window.SanityClient = { createClient };
  if (page === "home") {
    await import("../../src/js/home.js");
    await import("../../src/js/monthly-events.js");
  }
  if (page === "gallery") await import("../../src/js/gallery.js");
  if (page === "kids-resources") await import("../../src/js/kids.js");
  if (page === "kids-resources" || page === "kids-play") {
    const content = await import("../../src/js/kids-content.js");
    const core = await import("../../src/js/kids-game-core.js");
    const session = await import("../../src/js/kids-session.js");
    window.ETCFKidsContent = content.default;
    window.ETCFKidsCore = core.default;
    window.ETCFKidsSession = session.default;
    if (page === "kids-resources")
      await import("../../src/js/kids-launcher.js");
    else await import("../../src/js/kids-games.js");
  }
}

const useBrowserLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function PageRuntime({ page }) {
  useBrowserLayoutEffect(() => {
    if (page !== "kids-play") site.initializeSite();
  }, [page]);
  useEffect(() => {
    let active = true;
    let cleanupMotion;
    // Dynamic imports execute each controller once per document, including in
    // React Strict Mode. Existing .html links retain full-document navigation.
    initialize(page)
      .then(() => {
        if (!active) return;
        cleanupMotion = initializeMotion();
        document.documentElement.dataset.etcfReady = page;
      })
      .catch((error) =>
        console.error("ETCF page initialization failed", error),
      );
    return () => {
      active = false;
      cleanupMotion?.();
    };
  }, [page]);
  return null;
}
