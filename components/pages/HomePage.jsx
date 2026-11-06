import SiteNavigation from "../site/SiteNavigation";
import { HomeFooter } from "../site/SiteFooters";
import CommunityCarousel from "../home/CommunityCarousel";
import CommunityIntroduction from "../home/CommunityIntroduction";
import UpcomingEvents from "../home/UpcomingEvents";
import AnnualCalendar from "../home/AnnualCalendar";
import AboutCommunity from "../home/AboutCommunity";
import VisionMission from "../home/VisionMission";
import ExecutiveCommittee from "../home/ExecutiveCommittee";
import CommitteeHistory from "../home/CommitteeHistory";
import ContactSection from "../home/ContactSection";
import NewsletterSection from "../home/NewsletterSection";

export default function HomePage() {
  return (
    <>
      {" "}
      {"\n    "}
      {"\n    "}
      <SiteNavigation />
      {"\n\n    "}
      {"\n    "}
      <CommunityCarousel />
      {"\n\n    "}
      {"\n    "}
      <CommunityIntroduction />
      {"\n    "}
      {"\n    "}
      <UpcomingEvents />
      {"\n\n\n    "}
      {"\n    "}
      <AnnualCalendar />
      {"\n\n    "}
      {"\n    "}
      <AboutCommunity />
      {"\n\n    "}
      {"\n    "}
      <VisionMission />
      {"\n\n    "}
      {"\n    "}
      <ExecutiveCommittee />
      {"\n\n    "}
      {"\n    "}
      <CommitteeHistory />
      {"\n\n    "}
      {"\n    "}
      {"\n\n    "}
      {"\n    "}
      <ContactSection />
      {"\n\n\n    "}
      {"\n    "}
      <NewsletterSection />
      {"\n\n    "}
      {"\n    "}
      <HomeFooter />
      {"\n"}{" "}
    </>
  );
}
