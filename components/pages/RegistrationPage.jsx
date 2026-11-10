import SiteNavigation from "../site/SiteNavigation";
import { HomeFooter } from "../site/SiteFooters";

export default function RegistrationPage() {
  return (
    <>
      <SiteNavigation />
      <main className="information-page" id="registration">
        <header className="information-hero">
          <div className="site-shell registration-hero-grid">
            <div>
              <p className="information-eyebrow">ETCF / Registration</p>
              <h1>
                Rooted in faith.
                <br />
                <span>Registered in Alberta.</span>
              </h1>
              <p className="information-lead">
                A milestone in the journey of Edmonton Tamil Catholic Family.
                Here are the incorporation details recorded in our Government of
                Alberta certificate.
              </p>
              <a className="information-button" href="#registration-details">
                View registration details <span aria-hidden="true">↓</span>
              </a>
            </div>
            <aside
              className="registration-milestone"
              aria-label="Incorporation milestone"
            >
              <img
                src="/src/assets/logo-rounded.png"
                width="120"
                height="117"
                alt="Edmonton Tamil Catholic Family emblem"
              />
              <p>Our incorporation date</p>
              <strong>
                25 September
                <br />
                2025
              </strong>
              <span>Edmonton, Alberta · Canada</span>
            </aside>
          </div>
        </header>
        <section
          className="information-section site-shell"
          id="registration-details"
          aria-labelledby="registration-heading"
        >
          <div className="information-section-heading">
            <p className="information-eyebrow">
              Our registration, clearly explained
            </p>
            <h2 id="registration-heading">Official incorporation details</h2>
            <p>
              Edmonton Tamil Catholic Family (ETCF) is incorporated in Alberta.
              The details below are transcribed from our Certificate of
              Incorporation.
            </p>
          </div>
          <div className="registration-details-grid">
            <dl className="registration-facts">
              <div>
                <dt>Registered name</dt>
                <dd>EDMONTON TAMIL CATHOLIC FAMILY</dd>
              </div>
              <div>
                <dt>Date of incorporation</dt>
                <dd>
                  <time dateTime="2025-09-25">September 25, 2025</time>
                </dd>
              </div>
              <div>
                <dt>Jurisdiction</dt>
                <dd>Alberta, Canada</dd>
              </div>
              <div>
                <dt>Legislation</dt>
                <dd>Companies Act</dd>
              </div>
              <div>
                <dt>Form of incorporation</dt>
                <dd>Company limited by shares</dd>
              </div>
              <div>
                <dt>Issuing authority</dt>
                <dd>Government of Alberta · Registrar of Companies</dd>
              </div>
            </dl>
            <aside className="registration-source">
              <span className="information-number" aria-hidden="true">
                01 / The record
              </span>
              <h3>Certificate of Incorporation</h3>
              <p>
                The certificate records that Edmonton Tamil Catholic Family “was
                incorporated in Alberta on 2025/09/25 as a company limited by
                shares.”
              </p>
              <p>
                For a copy of the certificate or further information about
                ETCF’s registration, please contact our team.
              </p>
              <a href="mailto:info@edmontontamilcatholics.ca">
                Request more information <span aria-hidden="true">↗</span>
              </a>
            </aside>
          </div>
        </section>
        <section
          className="information-contact"
          aria-labelledby="registration-contact-heading"
        >
          <div className="site-shell">
            <p className="information-eyebrow">We’re here to help</p>
            <h2 id="registration-contact-heading">
              Questions about our registration?
            </h2>
            <p>
              Reach out for more information or to request supporting
              documentation.
            </p>
            <a href="mailto:info@edmontontamilcatholics.ca">
              info@edmontontamilcatholics.ca <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>
      <HomeFooter />
    </>
  );
}
