const pages = require("../data/page-meta.json");
const site = require("../data/site-seo.json");

function metadataForPage(key) {
  const page = pages[key];
  if (!page) throw new Error(`Unknown SEO page: ${key}`);
  const url = new URL(page.path, site.origin).href;
  const image = site.shareImage;
  const meta = (name, content) => ({ name, content });
  const property = (property, content) => ({
    property,
    content: String(content),
  });
  const webpage = {
    "@type": page.schemaType,
    "@id": `${url}#webpage`,
    url,
    name: page.title,
    description: page.description,
    isPartOf: { "@id": site.website["@id"] },
    publisher: { "@id": site.organization["@id"] },
    inLanguage: "en-CA",
  };
  if (key === "home") webpage.mainEntity = { "@id": site.organization["@id"] };
  return {
    title: page.title,
    meta: [
      { charSet: "UTF-8" },
      meta("viewport", "width=device-width, initial-scale=1.0"),
      meta("description", page.description),
      meta("author", site.organization.name),
      meta(
        "robots",
        "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      ),
      property("og:title", page.title),
      property("og:description", page.description),
      property("og:type", "website"),
      property("og:url", url),
      property("og:site_name", site.organization.name),
      property("og:locale", "en_CA"),
      property("og:image", image.url),
      property("og:image:width", image.width),
      property("og:image:height", image.height),
      property("og:image:type", image.type),
      property("og:image:alt", image.alt),
      meta("twitter:card", "summary_large_image"),
      meta("twitter:title", page.title),
      meta("twitter:description", page.description),
      meta("twitter:image", image.url),
      meta("twitter:image:alt", image.alt),
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/src/assets/logo-rounded.png" },
      { rel: "apple-touch-icon", href: "/src/assets/logo-rounded.png" },
      { rel: "canonical", href: url },
      { rel: "describedby", type: "text/plain", href: "/llms.txt" },
      ...(key === "kids-play"
        ? []
        : [
            {
              rel: "stylesheet",
              href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css",
            },
          ]),
    ],
    structuredData: [
      {
        "@context": "https://schema.org",
        "@graph": [site.organization, site.website, webpage],
      },
    ],
  };
}

module.exports = { metadataForPage, pages, site };
