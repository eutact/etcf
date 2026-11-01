import SitePage from "../components/site/SitePage";

export function getStaticProps() {
  return { props: { page: "home" } };
}

export default SitePage;
