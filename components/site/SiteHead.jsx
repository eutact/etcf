import Head from "next/head";
import metadata from "../../data/page-meta.json";

export default function SiteHead({ page }) {
  const data = metadata[page];
  return (
    <Head>
      <title>{data.title}</title>
      {data.meta.map((attributes, index) => (
        <meta key={`meta-${index}`} {...attributes} />
      ))}
      {data.links.map((attributes, index) => (
        <link key={`link-${index}`} {...attributes} />
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
