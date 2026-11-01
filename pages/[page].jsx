import SitePage from "../components/site/SitePage";

const legacyPages = [
  "gallery",
  "kids-resources",
  "kids-play",
  "privacy-policy",
  "terms",
];

export function getStaticPaths() {
  const paths = legacyPages.map((page) => ({
    params: { page: `${page}.html` },
  }));
  // The production export already provides index.html for the root route.
  if (process.env.NODE_ENV === "development")
    paths.push({ params: { page: "index.html" } });
  return { paths, fallback: false };
}

export function getStaticProps({ params }) {
  const page =
    params.page === "index.html" ? "home" : params.page.replace(/\.html$/, "");
  return { props: { page } };
}

export default SitePage;
