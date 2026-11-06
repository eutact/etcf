import SiteNavigation from "../site/SiteNavigation";
import { HomeFooter } from "../site/SiteFooters";

export default function CanadaResourcesPage() {
  return (
    <>
      <SiteNavigation />
      <header className="page-hero">
        <div className="site-shell">
          <span className="section-kicker text-white bg-white/10 border-white/20">
            Faith, family and community
          </span>
          <h1 className="mt-5">Tamil Catholics in Canada</h1>
          <p className="mt-4 max-w-3xl text-lg text-gray-200">
            A guide from Edmonton Tamil Catholic Family to finding Tamil Mass,
            connecting with Catholic communities and sharing faith at home.
          </p>
        </div>
      </header>
      <main id="canada-resources" className="section-frame">
        <div className="site-shell space-y-12">
          <section aria-labelledby="canada-community-heading">
            <h2
              id="canada-community-heading"
              className="text-3xl font-bold text-primary"
            >
              Find a community near you
            </h2>
            <p className="mt-4 max-w-3xl text-secondary">
              Whether you are settling in Edmonton, moving to another province
              or visiting family, start with the official parish or diocese
              website. These links are useful starting points; each community
              manages its own worship, membership and parish activities.
            </p>
            <div className="mt-7 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <article className="premium-card p-6">
                <p className="text-sm font-semibold text-secondary">
                  Edmonton, Alberta
                </p>
                <h3 className="mt-2 text-xl font-bold text-primary">
                  Edmonton Tamil Catholic Family
                </h3>
                <p className="mt-3">
                  Connect with ETCF for Tamil Holy Mass, prayer and fellowship
                  at St. Theresa’s Catholic Church, 7508 29 Avenue NW, Edmonton,
                  AB T6K 3Y8.
                </p>
                <p className="mt-4">
                  <a className="resource-link" href="/#event-section">
                    View the next Edmonton Tamil Mass
                  </a>
                </p>
                <p className="mt-3">
                  <a
                    className="resource-link"
                    href="https://sttheresa.caedm.ca/contact/"
                  >
                    St. Theresa Parish information
                  </a>
                </p>
              </article>
              <article className="premium-card p-6">
                <p className="text-sm font-semibold text-secondary">
                  Scarborough, Ontario
                </p>
                <h3 className="mt-2 text-xl font-bold text-primary">
                  Our Lady of Good Health Parish
                </h3>
                <p className="mt-3">
                  The Archdiocese of Toronto’s official parish page lists
                  Tamil-language Masses and contact information for this
                  Scarborough parish. Check its current schedule directly.
                </p>
                <p className="mt-4">
                  <a
                    className="resource-link"
                    href="https://olgoodhealthsc.archtoronto.org/en/contact-us/parish-information/"
                  >
                    Official parish page and Mass schedule
                  </a>
                </p>
              </article>
              <article className="premium-card p-6">
                <p className="text-sm font-semibold text-secondary">
                  Across Canada
                </p>
                <h3 className="mt-2 text-xl font-bold text-primary">
                  Find your local Catholic diocese
                </h3>
                <p className="mt-3">
                  Use the Canadian Conference of Catholic Bishops’ directory to
                  find the diocese for your area, then ask about parishes and
                  Tamil-language Catholic communities near you.
                </p>
                <p className="mt-4">
                  <a
                    className="resource-link"
                    href="https://www.cccb.ca/the-catholic-church-in-canada/directory-of-dioceses-eparchies-ordinariates/"
                  >
                    Official Canadian diocese directory
                  </a>
                </p>
              </article>
            </div>
            <p className="mt-5 text-sm text-secondary">
              Official links reviewed November 5, 2026. Confirm dates,
              languages, times and registration with the parish before
              travelling.
            </p>
          </section>
          <section
            aria-labelledby="canada-planning-heading"
            className="max-w-3xl"
          >
            <h2
              id="canada-planning-heading"
              className="text-3xl font-bold text-primary"
            >
              Planning a visit or a move
            </h2>
            <ul className="mt-5 list-disc pl-6 space-y-3">
              <li>
                Find the parish’s official contact details and ask which Masses
                are celebrated in Tamil.
              </li>
              <li>
                Confirm the venue and date for your visit, especially for
                monthly celebrations and feast days.
              </li>
              <li>
                Ask the parish about its own family activities, sacramental
                preparation and ways to get involved.
              </li>
            </ul>
          </section>
          <section
            aria-labelledby="canada-family-heading"
            className="premium-card p-6 md:p-8"
          >
            <h2
              id="canada-family-heading"
              className="text-3xl font-bold text-primary"
            >
              Share Catholic faith at home
            </h2>
            <p className="mt-4 max-w-3xl">
              ETCF Kids Corner offers Bible quizzes, matching games, story
              activities and prayers for children and families. Tamil Catholic
              families across Canada can explore these online resources
              together. Kids Corner is currently in beta and welcomes feedback.
            </p>
            <a
              className="premium-button mt-5 px-6 py-3"
              href="kids-resources.html"
            >
              Explore Kids Corner
            </a>
          </section>
          <section
            aria-labelledby="canada-contact-heading"
            className="max-w-3xl"
          >
            <h2
              id="canada-contact-heading"
              className="text-3xl font-bold text-primary"
            >
              Connect with ETCF in Edmonton
            </h2>
            <p className="mt-4">
              Our community is based in Edmonton, Alberta. For questions about
              visiting or joining local gatherings,{" "}
              <a className="resource-link" href="/#contact">
                contact the ETCF committee
              </a>
              .
            </p>
          </section>
        </div>
      </main>
      <HomeFooter />
    </>
  );
}
