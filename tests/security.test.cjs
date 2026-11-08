const test = require("node:test");
const assert = require("node:assert/strict");
const { safeLink, safeImage } = require("../src/js/safe-url.cjs");

test("CMS links reject executable schemes, credentials and obfuscated URLs", () => {
  for (const value of [
    "javascript:alert(1)",
    "JaVaScRiPt:alert(1)",
    "java\nscript:alert(1)",
    "data:text/html,<script>alert(1)</script>",
    "vbscript:msgbox(1)",
    "http://example.com",
    "https://user:secret@example.com",
    "https:\\evil.example",
    null,
    {},
    "",
  ]) {
    assert.equal(safeLink(value, "#newsletter-form"), "#newsletter-form");
  }
  assert.equal(
    safeLink("https://example.com/register?a=1"),
    "https://example.com/register?a=1",
  );
  assert.equal(safeLink("#newsletter-form"), "/#newsletter-form");
  assert.equal(safeLink("/gallery.html"), "/gallery.html");
});

test("CMS images are restricted to local assets and the Sanity media CDN", () => {
  for (const value of [
    "javascript:alert(1)",
    "data:image/svg+xml,<svg/>",
    "https://tracker.example/image.jpg",
    "https://cdn.sanity.io.evil.example/image.jpg",
  ]) {
    assert.equal(safeImage(value), "/images/events/willupdate.png");
  }
  assert.equal(
    safeImage("/images/events/Jan_2025.jpg"),
    "/images/events/Jan_2025.jpg",
  );
  assert.equal(
    safeImage("https://cdn.sanity.io/images/xx91ckl7/production/poster.jpg"),
    "https://cdn.sanity.io/images/xx91ckl7/production/poster.jpg",
  );
});
