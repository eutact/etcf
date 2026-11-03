const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function AnnualCalendar() {
  return (
    <section
      id="our-year-together"
      className="monthly-events annual-calendar section-frame"
      aria-labelledby="annual-heading"
    >
      <div className="site-shell relative z-10">
        <header className="annual-header">
          <span className="section-kicker">Annual Rhythm</span>
          <p className="annual-year-label">
            <span data-event-year>Annual</span>
            {" community rhythm"}
          </p>
          <h2 id="annual-heading">Our Year Together</h2>
          <p>
            Journey through a year of faith, worship, fellowship and community
            with ETCF.
          </p>
        </header>

        <div className="annual-explorer" data-annual-events>
          <nav className="annual-month-nav" aria-label="Annual month selector">
            <div
              className="annual-track"
              role="tablist"
              aria-label="Select a month"
            >
              {months.map((month, index) => {
                const slug = month.toLowerCase();
                return (
                  <a
                    key={slug}
                    id={`tab-${slug}`}
                    className="annual-month-tab"
                    href={`#month-${slug}`}
                    role="tab"
                    aria-controls={`month-${slug}`}
                    aria-selected="false"
                    data-month-tab={slug}
                    data-month-index={index}
                  >
                    <span className="annual-month-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="annual-month-short">
                      {month.slice(0, 3).toUpperCase()}
                    </span>
                    <span className="annual-month-name">{month}</span>
                    <span className="annual-month-current">Current</span>
                  </a>
                );
              })}
            </div>
          </nav>

          <div className="annual-panel-shell">
            {months.map((month, index) => {
              const slug = month.toLowerCase();
              return (
                <article
                  key={slug}
                  id={`month-${slug}`}
                  className="annual-month-panel"
                  role="tabpanel"
                  aria-labelledby={`tab-${slug}`}
                  tabIndex="0"
                  data-month-panel={slug}
                >
                  <header className="annual-panel-header">
                    <div>
                      <span className="annual-panel-index">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="annual-panel-eyebrow">{month}</p>
                      <h3>{month}</h3>
                    </div>
                    <span className="annual-panel-count">0 listed events</span>
                  </header>
                  <div className="annual-event-list" />
                </article>
              );
            })}
          </div>

          <p
            className="annual-empty-state"
            data-annual-empty
            aria-live="polite"
            hidden
          >
            This year’s calendar is being updated. Confirmed events will appear
            here.
          </p>
        </div>
      </div>
    </section>
  );
}
