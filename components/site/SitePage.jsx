import SiteHead from "./SiteHead";
import PageRuntime from "./PageRuntime";
import HomePage from "../pages/HomePage";
import GalleryPage from "../pages/GalleryPage";
import KidsResourcesPage from "../pages/KidsResourcesPage";
import KidsPlayPage from "../pages/KidsPlayPage";
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage";
import TermsPage from "../pages/TermsPage";
import CanadaResourcesPage from "../pages/CanadaResourcesPage";
import BrandAssetsPage from "../pages/BrandAssetsPage";
import RegistrationPage from "../pages/RegistrationPage";
import SocialMediaPage from "../pages/SocialMediaPage";

const pages = {
  home: HomePage,
  gallery: GalleryPage,
  "kids-resources": KidsResourcesPage,
  "kids-play": KidsPlayPage,
  "privacy-policy": PrivacyPolicyPage,
  terms: TermsPage,
  "tamil-catholics-canada": CanadaResourcesPage,
  "brand-assets": BrandAssetsPage,
  registration: RegistrationPage,
  "social-media": SocialMediaPage,
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
