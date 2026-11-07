const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const brand = require("../data/brand-assets.json");
const publicDir = path.join(__dirname, "../public");

test("brand downloads use real artwork and accurate PNG dimensions", () => {
  for (const logo of brand.logos) {
    const bytes = fs.readFileSync(path.join(publicDir, logo.url));
    assert.ok(bytes.length > 1000);
    assert.ok(logo.filename.endsWith(path.extname(logo.url)));
    if (logo.format === "PNG") {
      assert.equal(bytes.subarray(1, 4).toString(), "PNG");
      assert.equal(bytes.readUInt32BE(16), logo.width);
      assert.equal(bytes.readUInt32BE(20), logo.height);
      assert.equal(
        bytes[25],
        6,
        "the primary logo should retain its alpha channel",
      );
    }
  }
});

test("downloadable colour values match the visible palette and website foundations", () => {
  const file = JSON.parse(
    fs.readFileSync(path.join(publicDir, "brand/ETCF-Brand-Colours.json")),
  );
  const css = fs
    .readFileSync(path.join(__dirname, "../src/input.css"), "utf8")
    .toLowerCase();
  assert.equal(file.contact, "media@edmontontamilcatholics.ca");
  assert.equal(file.colours.length, 8);
  for (const colour of [...brand.colours, ...brand.neutrals]) {
    const downloaded = file.colours.find((item) => item.name === colour.name);
    assert.equal(downloaded.hex, colour.hex);
    assert.deepEqual(
      downloaded.rgb,
      [1, 3, 5].map((i) => parseInt(colour.hex.slice(i, i + 2), 16)),
    );
    assert.match(colour.hex, /^#[A-F0-9]{6}$/);
    if (colour.source === "Website palette")
      assert.ok(css.includes(colour.hex.toLowerCase()));
  }
  assert.match(file.usage, /not print specifications/);
});

test("usage guide preserves permissions, original-file links and media contact", () => {
  const guide = fs.readFileSync(
    path.join(publicDir, "brand/ETCF-Brand-Guidelines.txt"),
    "utf8",
  );
  assert.match(guide, /media@edmontontamilcatholics\.ca/);
  assert.match(guide, /Obtain permission/);
  assert.match(guide, /not an open-source or public-domain licence/);
  for (const logo of brand.logos) assert.ok(guide.includes(logo.url));
  assert.match(guide, /one fifth/);
  assert.match(guide, /not CMYK or print specifications/);
});
