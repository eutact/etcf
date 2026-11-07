import { rename, access, unlink } from "node:fs/promises";

// These are first-class .html routes in Next.js. Static export appends another
// extension; normalize the output filenames to keep all existing public URLs.
for (const page of [
  "gallery",
  "kids-resources",
  "kids-play",
  "privacy-policy",
  "terms",
  "tamil-catholics-canada",
  "brand-assets",
]) {
  await rename(`out/${page}.html.html`, `out/${page}.html`);
  await access(`out/${page}.html`);
}

// Keep the root export for /index.html, while retaining the alias in Next’s
// production route manifest for framework hosts such as Vercel.
await unlink("out/index.html.html");
