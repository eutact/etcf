import { rename, access } from "node:fs/promises";

// These are first-class .html routes in Next.js. Static export appends another
// extension; normalize the output filenames to keep all existing public URLs.
for (const page of [
  "gallery",
  "kids-resources",
  "kids-play",
  "privacy-policy",
  "terms",
]) {
  await rename(`out/${page}.html.html`, `out/${page}.html`);
  await access(`out/${page}.html`);
}
