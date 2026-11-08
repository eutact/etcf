import Head from "next/head";
import { useEffect, useRef } from "react";
import errors from "../../data/error-pages.json";

export function ErrorIcon({ name, ...props }) {
  const paths = {
    arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
    home: (
      <>
        <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z" />
      </>
    ),
    compass: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m16 8-2.5 5.5L8 16l2.5-5.5Z" />
      </>
    ),
    shield: (
      <>
        <path d="m12 3 8 3v6c0 5-8 9-8 9S4 17 4 12V6Z" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    signal: (
      <>
        <path d="M2 8a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0m-11 4a6 6 0 0 1 8 0" />
        <circle cx="12" cy="20" r=".5" />
      </>
    ),
    spark: (
      <path d="m12 2 2.6 7.4L22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-2.6Z" />
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M7 3v4m10-4v4M3 11h18m-13 5h2m4 0h2" />
      </>
    ),
    gallery: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8" cy="8" r="1" />
        <path d="m3 17 6-6 4 4 3-3 5 5" />
      </>
    ),
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0l-1 1-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
    ),
    refresh: (
      <>
        <path d="M20 7v5h-5M4 17v-5h5" />
        <path d="M6.1 6a8 8 0 0 1 13.5 4M4.4 14A8 8 0 0 0 18 18" />
      </>
    ),
  };
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}

export function ErrorBrand() {
  return (
    <a
      className="error-brand"
      href="/"
      aria-label="Edmonton Tamil Catholic Family home"
    >
      <span className="error-logo">
        <img src="/src/assets/logo.png" width="926" height="906" alt="" />
      </span>
      <span>
        Edmonton Tamil
        <br />
        <strong>Catholic Family</strong>
      </span>
    </a>
  );
}

export default function ErrorPage({ code = "500" }) {
  const resolvedCode = Object.hasOwn(errors, String(code))
    ? String(code)
    : "500";
  const data = errors[resolvedCode];
  const root = useRef(null);

  useEffect(() => {
    const visibility = () => {
      if (root.current) root.current.dataset.hidden = String(document.hidden);
    };
    visibility();
    document.addEventListener("visibilitychange", visibility);
    return () => {
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);

  return (
    <>
      <Head>
        <title>{`${data.label} | Edmonton Tamil Catholic Family`}</title>
        <meta name="robots" content="noindex, follow" />
        <meta name="description" content={data.message} />
        <link rel="icon" type="image/png" href="/src/assets/logo-rounded.png" />
      </Head>
      <div className="error-page" ref={root} data-error={resolvedCode}>
        <a className="error-skip" href="#error-main">
          Skip to content
        </a>
        <header className="error-header error-shell">
          <ErrorBrand />
          <a className="error-header-link" href="/index.html#contact">
            We’re here to help <ErrorIcon name="arrow" />
          </a>
        </header>
        <main id="error-main" tabIndex={-1}>
          <section className="error-hero" aria-labelledby="error-title">
            <div className="error-ambient" aria-hidden="true">
              <span className="error-ambient-orb" />
              <span className="error-ambient-orb" />
            </div>
            <div className="error-shell error-grid">
              <div className="error-copy">
                <p className="error-eyebrow">
                  <span aria-hidden="true" />
                  {/^\d+$/.test(resolvedCode) ? `${resolvedCode} / ` : ""}
                  {data.label}
                </p>
                <h1 id="error-title">{data.title}</h1>
                <p className="error-description">{data.message}</p>
                <div className="error-actions">
                  <a className="error-button error-button-primary" href="/">
                    <ErrorIcon name="home" /> Back to home{" "}
                    <ErrorIcon name="arrow" />
                  </a>
                  {data.retry ? (
                    <button
                      className="error-button error-button-secondary"
                      type="button"
                      onClick={() => window.location.reload()}
                    >
                      <ErrorIcon name="refresh" /> Try again
                    </button>
                  ) : (
                    <a
                      className="error-button error-button-secondary"
                      href="/index.html#contact"
                    >
                      Contact us <ErrorIcon name="arrow" />
                    </a>
                  )}
                </div>
                <p className="error-reassurance">
                  <span aria-hidden="true">✦</span> A community of faith. A
                  place to belong.
                </p>
              </div>
              <div
                className={`error-art error-art-${data.scene}`}
                aria-hidden="true"
              >
                <div className="error-art-grid" />
                <div className="error-ring error-ring-outer">
                  <span className="error-orbit-dot" />
                </div>
                <div className="error-ring error-ring-inner">
                  <span className="error-orbit-dot" />
                </div>
                <span className="error-star error-star-one">✦</span>
                <span className="error-star error-star-two">✧</span>
                <div className="error-art-icon">
                  <ErrorIcon name={data.scene} />
                </div>
                <div
                  className={`error-number${data.display ? " error-number-word" : ""}`}
                >
                  {data.display || resolvedCode}
                </div>
                <div className="error-art-trail" />
                <div className="error-home-tag">
                  <span>
                    <ErrorIcon name="home" />
                  </span>
                  <div>
                    Faith. Family. Together.
                    <small>There’s always a way home.</small>
                  </div>
                </div>
                <span className="error-art-coordinate">
                  EDMONTON · ALBERTA · CANADA
                </span>
              </div>
            </div>
          </section>
          <section
            className="error-discover error-shell"
            aria-labelledby="error-discover-title"
          >
            <div className="error-discover-heading">
              <p className="error-mini-label">THE JOURNEY CONTINUES</p>
              <h2 id="error-discover-title">Find a little inspiration.</h2>
            </div>
            <div className="error-destinations">
              {[
                {
                  icon: "calendar",
                  title: "Gather with us",
                  text: "Mass & community events",
                  href: "/index.html#event-section",
                },
                {
                  icon: "gallery",
                  title: "Moments together",
                  text: "Explore our gallery",
                  href: "/gallery.html",
                },
                {
                  icon: "heart",
                  title: "Little hearts, big faith",
                  text: "Discover Kids Corner",
                  href: "/kids-resources.html",
                },
              ].map((item) => (
                <a
                  className="error-destination"
                  href={item.href}
                  key={item.icon}
                >
                  <span className="error-destination-icon">
                    <ErrorIcon name={item.icon} />
                  </span>
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.text}</small>
                  </span>
                  <ErrorIcon name="arrow" />
                </a>
              ))}
            </div>
          </section>
        </main>
        <footer className="error-footer error-shell">
          <p>
            Edmonton Tamil Catholic Family <span aria-hidden="true">·</span>{" "}
            Rooted in faith. Growing together.
          </p>
        </footer>
      </div>
    </>
  );
}
