import SiteHead from "./SiteHead";
import PageRuntime from "./PageRuntime";
import HomePage from "../pages/HomePage";
import GalleryPage from "../pages/GalleryPage";
import KidsResourcesPage from "../pages/KidsResourcesPage";
import KidsPlayPage from "../pages/KidsPlayPage";
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage";
import TermsPage from "../pages/TermsPage";

const pages = {
  home: HomePage,
  gallery: GalleryPage,
  "kids-resources": KidsResourcesPage,
  "kids-play": KidsPlayPage,
  "privacy-policy": PrivacyPolicyPage,
  terms: TermsPage,
};

export default function SitePage({ page }) {
  const Content = pages[page];
  return (
    <>
      <SiteHead page={page} />
      <Content />
      <PageRuntime page={page} />
    </>
  );
}
