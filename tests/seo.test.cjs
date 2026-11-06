const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { metadataForPage, pages, site } = require("../src/seo.cjs");

test("every public page has unique descriptive metadata and one production canonical", () => {
  const titles = new Set(),
    descriptions = new Set(),
    canonicals = new Set();
  for (const key of Object.keys(pages)) {
    const data = metadataForPage(key);
    const description = data.meta.find(
      (meta) => meta.name === "description",
    ).content;
    const links = data.links.filter((link) => link.rel === "canonical");
    assert.equal(links.length, 1);
    const url = new URL(links[0].href);
    assert.equal(url.origin, "https://www.edmontontamilcatholics.ca");
    assert.equal(url.search + url.hash, "");
    assert.ok(data.title.length >= 25 && data.title.length <= 70);
    assert.ok(description.length >= 80 && description.length <= 180);
    assert.ok(!data.meta.some((meta) => meta.name === "keywords"));
    assert.match(
      data.meta.find((meta) => meta.name === "robots").content,
      /^index, follow/,
    );
    titles.add(data.title);
    descriptions.add(description);
    canonicals.add(url.href);
    assert.equal(
      data.meta.find((meta) => meta.property === "og:url").content,
      url.href,
    );
    assert.equal(
      data.meta.find((meta) => meta.property === "og:title").content,
      data.title,
    );
    assert.equal(
      data.meta.find((meta) => meta.name === "twitter:description").content,
      description,
    );
  }
  for (const values of [titles, descriptions, canonicals])
    assert.equal(values.size, Object.keys(pages).length);
});

test("organization data has the verified Edmonton address and published community contacts", () => {
  assert.equal(site.organization.address.postalCode, "T6K 3Y8");
  assert.equal(site.organization.address.addressLocality, "Edmonton");
  assert.equal(site.organization.address.addressCountry, "CA");
  assert.equal(site.organization.telephone, "+1-780-607-1212");
  assert.equal(site.organization.email, "info@edmontontamilcatholics.ca");
  assert.equal(site.organization.areaServed.name, "Edmonton");
  assert.match(site.website.description, /across Canada/);
  assert.deepEqual(site.organization.contactPoint.availableLanguage, [
    "English",
    "Tamil",
  ]);
});

test("structured data resolves its references and uses existing public images", () => {
  for (const key of Object.keys(pages)) {
    const data = metadataForPage(key);
    const graph = data.structuredData[0]["@graph"];
    const ids = new Set(graph.map((item) => item["@id"]));
    const page = graph.at(-1);
    assert.ok(ids.has(page.publisher["@id"]));
    assert.ok(ids.has(page.isPartOf["@id"]));
    assert.equal(
      page.url,
      data.links.find((link) => link.rel === "canonical").href,
    );
    assert.ok(
      !graph.some((item) =>
        ["Event", "Church", "FAQPage"].includes(item["@type"]),
      ),
    );
    for (const image of [site.organization.logo.url, site.shareImage.url]) {
      const url = new URL(image);
      assert.equal(url.origin, site.origin);
      assert.ok(
        fs.statSync(path.join(__dirname, "../public", url.pathname)).size > 0,
      );
    }
  }
});

test("the sitemap lists every canonical once and robots leaves rendering assets crawlable", () => {
  const xml = fs.readFileSync(
    path.join(__dirname, "../public/sitemap.xml"),
    "utf8",
  );
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  const expected = Object.keys(pages).map(
    (key) =>
      metadataForPage(key).links.find((link) => link.rel === "canonical").href,
  );
  assert.deepEqual(urls.sort(), expected.sort());
  assert.equal(new Set(urls).size, urls.length);
  assert.ok(!urls.some((url) => url.endsWith("/index.html")));
  assert.ok(!xml.includes("2025-02") && !xml.includes("<lastmod>"));
  const robots = fs.readFileSync(
    path.join(__dirname, "../public/robots.txt"),
    "utf8",
  );
  assert.match(robots, /Allow: \/\n/);
  assert.match(
    robots,
    /Sitemap: https:\/\/www\.edmontontamilcatholics\.ca\/sitemap\.xml/,
  );
  assert.ok(!robots.includes("Disallow:"));
});

test("unknown page names cannot silently reuse homepage metadata", () => {
  assert.throws(() => metadataForPage("missing-page"), /Unknown SEO page/);
});
