import { writeFile } from "node:fs/promises";
import seo from "../src/seo.cjs";

const origin = seo.site.origin;
const urls = Object.keys(seo.pages).map((key) => {
  const page = seo.metadataForPage(key);
  const canonicals = page.links.filter((link) => link.rel === "canonical");
  if (canonicals.length !== 1)
    throw new Error(`Expected one canonical for ${page.title}`);
  const url = new URL(canonicals[0].href);
  if (url.origin !== origin || url.search || url.hash)
    throw new Error(`Invalid canonical: ${url}`);
  return url.href;
});
if (new Set(urls).size !== urls.length)
  throw new Error("Duplicate canonical URLs in sitemap");
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${url.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")}</loc></url>`).join("\n")}
</urlset>
`;
// No fabricated lastmod timestamps: builds alone are not content updates.
await writeFile(new URL("../public/sitemap.xml", import.meta.url), xml);
await writeFile(
  new URL("../public/robots.txt", import.meta.url),
  `User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml
`,
);

const entry = (key) => {
  const page = seo.pages[key];
  return `- [${page.title}](${new URL(page.path, origin).href}): ${page.description}`;
};
const organization = seo.site.organization;
const address = organization.address;
const llms = `# ${organization.name} (ETCF)

> A Tamil-speaking Catholic community based in Edmonton, Alberta, Canada, gathering for Tamil Holy Mass, prayer, fellowship and family faith formation. Online family resources are available to Tamil Catholic families across Canada.

ETCF's local community is in Edmonton. Its gathering place is ${address.streetAddress}, ${address.addressLocality}, ${address.addressRegion} ${address.postalCode}, Canada. Other parishes linked in the Canada guide are independent communities.

General enquiries: ${organization.email}. Telephone: ${organization.telephone}.

The homepage's published upcoming event details and annual calendar provide dates and times. Schedules can change; check the current event details before travelling. Gallery photos and older schedules are not confirmation of a future Mass date. Kids Corner is currently in beta.

## Main pages

${["home", "tamil-catholics-canada", "kids-resources", "gallery"].map(entry).join("\n")}

## Optional

${["brand-assets", "social-media", "registration", "kids-play", "privacy-policy", "terms"].map(entry).join("\n")}
`;
// Keep the proposed filename and the requested singular alias identical.
await writeFile(new URL("../public/llms.txt", import.meta.url), llms);
await writeFile(new URL("../public/llm.txt", import.meta.url), llms);
console.log(
  `Generated robots.txt, sitemap.xml, llms.txt and llm.txt for ${urls.length} canonical pages.`,
);
