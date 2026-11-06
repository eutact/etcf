import SitePage from "../components/site/SitePage";

const htmlPages = [
  "index",
  "gallery",
  "kids-resources",
  "kids-play",
  "privacy-policy",
  "terms",
  "tamil-catholics-canada",
];

export function getStaticPaths() {
  const paths = htmlPages.map((page) => ({
    params: { page: `${page}.html` },
  }));
  return { paths, fallback: false };
}

export function getStaticProps({ params }) {
  const page =
    params.page === "index.html" ? "home" : params.page.replace(/\.html$/, "");
  return { props: { page } };
}

export default SitePage;
