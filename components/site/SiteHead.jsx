import Head from "next/head";
import seo from "../../src/seo.cjs";

export default function SiteHead({ page }) {
  const data = seo.metadataForPage(page);
  return (
    <Head>
      <title>{data.title}</title>
      {data.meta.map((attributes) => (
        <meta
          key={attributes.name || attributes.property || "charset"}
          {...attributes}
        />
      ))}
      {data.links.map((attributes) => (
        <link key={`${attributes.rel}-${attributes.href}`} {...attributes} />
      ))}
      {data.structuredData.map((data, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </Head>
  );
}
