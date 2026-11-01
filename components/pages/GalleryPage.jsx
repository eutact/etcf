import SiteNavigation from "../site/SiteNavigation";
import { GalleryFooter } from "../site/SiteFooters";

export default function GalleryPage() {
  return (
    <>
      {" "}
      {"\n    "}
      <SiteNavigation />
      {"\n\n    "}
      <header className={"page-hero"}>
        {"\n        "}
        <div className={"site-shell text-center"}>
          {"\n            "}
          <span
            className={"section-kicker text-white bg-white/10 border-white/20"}
          >
            {"Community Memories"}
          </span>
          {"\n            "}
          <h1 className={"mt-5"}>{"Gallery"}</h1>
          {"\n            "}
          <p className={"mx-auto mt-4 max-w-3xl text-lg text-white/85"}>
            {
              "\n                Celebrating faith, Tamil heritage, family, and the shared moments that continue to shape ETCF in\n                Edmonton.\n            "
            }
          </p>
          {"\n        "}
        </div>
        {"\n    "}
      </header>
      {"\n\n    "}
      <main id={"gallery"} className={"section-frame"}>
        {"\n        "}
        <div className={"site-shell relative z-10"}>
          {"\n            "}
          <div
            className={
              "flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
            }
          >
            {"\n                "}
            <div>
              {"\n                    "}
              <span className={"section-kicker"}>{"Photo Archive"}</span>
              {"\n                    "}
              <h2
                className={
                  "mt-4 text-3xl font-extrabold text-primary sm:text-4xl"
                }
              >
                {"ETCF Moments"}
              </h2>
              {"\n                    "}
              <p className={"mt-3 max-w-2xl text-secondary"}>
                {
                  "\n                        Filter by year and open any photo for a larger view. Images load progressively for a smoother\n                        experience on mobile connections.\n                    "
                }
              </p>
              {"\n                "}
            </div>
            {"\n                "}
            <div
              id={"year-buttons"}
              className={"flex flex-wrap gap-3"}
              aria-label={"Filter gallery by year"}
            ></div>
            {"\n            "}
          </div>
          {"\n\n            "}
          <div
            id={"gallery-container"}
            className={
              "mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            }
          ></div>
          {"\n        "}
        </div>
        {"\n    "}
      </main>
      {"\n\n    "}
      <div
        id={"lightbox"}
        className={"fixed inset-0 z-50 hidden bg-black/85 p-4"}
        role={"dialog"}
        aria-modal={"true"}
        aria-hidden={"true"}
        aria-label={"Expanded gallery image"}
      >
        {"\n        "}
        <div
          className={"flex h-full flex-col items-center justify-center gap-4"}
        >
          {"\n            "}
          <button
            id={"close-lightbox"}
            type={"button"}
            className={
              "absolute right-4 top-4 premium-button px-4 py-2 text-xl"
            }
            aria-label={"Close image"}
          >
            {"×"}
          </button>
          {"\n            "}
          <button
            id={"prev-lightbox"}
            type={"button"}
            className={
              "absolute left-4 top-1/2 ghost-button px-4 py-3 text-white"
            }
            aria-label={"Previous image"}
          >
            {"\n                "}
            <i className={"fas fa-chevron-left"} aria-hidden={"true"}></i>
            {"\n            "}
          </button>
          {"\n            "}
          <img
            id={"lightbox-img"}
            className={
              "max-h-[82vh] max-w-full rounded-lg object-contain shadow-2xl"
            }
            src={"src/assets/logo-rounded.png"}
            alt={"Expanded gallery image"}
          />
          {"\n            "}
          <button
            id={"next-lightbox"}
            type={"button"}
            className={
              "absolute right-4 top-1/2 ghost-button px-4 py-3 text-white"
            }
            aria-label={"Next image"}
          >
            {"\n                "}
            <i className={"fas fa-chevron-right"} aria-hidden={"true"}></i>
            {"\n            "}
          </button>
          {"\n            "}
          <p
            id={"lightbox-caption"}
            className={"text-center text-sm font-semibold text-white"}
          ></p>
          {"\n        "}
        </div>
        {"\n    "}
      </div>
      {"\n\n    "}
      <GalleryFooter />
      {"\n"}{" "}
    </>
  );
}
