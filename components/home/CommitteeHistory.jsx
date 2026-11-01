import { useEffect, useRef } from "react";

export default function CommitteeHistory() {
  const history = useRef(null);

  useEffect(() => {
    // Browsers and Fast Refresh can retain a native disclosure's open state.
    // Each visit starts collapsed; summaries still use native mouse/keyboard toggles.
    const collapseHistory = () => {
      history.current?.querySelectorAll("details").forEach((details) => {
        details.open = false;
      });
    };
    collapseHistory();
    window.addEventListener("pageshow", collapseHistory);
    return () => window.removeEventListener("pageshow", collapseHistory);
  }, []);

  return (
    <>
      <section
        ref={history}
        id={"past-committee"}
        className={"committee-history-section"}
        aria-labelledby={"history-heading"}
      >
        {"\n        "}
        <div className={"site-shell"}>
          {"\n            "}
          <header className={"committee-header"}>
            {"\n                "}
            <div>
              {"\n                    "}
              <p className={"committee-eyebrow"}>{"A legacy of service"}</p>
              {"\n                    "}
              <h2 id={"history-heading"}>
                {"Past Committee "}
                <span>{"Members"}</span>
              </h2>
              {"\n                "}
            </div>
            {"\n                "}
            <p className={"committee-intro"}>
              {
                "Honoring the people whose leadership, faith and service have helped our\n                    community grow."
              }
            </p>
            {"\n            "}
          </header>
          {"\n\n            "}
          <details className={"committee-history committee-history--recent"}>
            {"\n                "}
            <summary className={"history-summary history-summary--term"}>
              <span className={"history-term"}>{"2023–2026"}</span>
              <span className={"history-summary-copy"}>
                <span className={"history-title"}>
                  {"Past Committee Members"}
                </span>
                <span className={"history-subtitle"}>
                  {"12 members · Leadership and service"}
                </span>
              </span>
              <span className={"history-toggle"} aria-hidden={"true"}>
                <svg
                  viewBox={"0 0 24 24"}
                  fill={"none"}
                  stroke={"currentColor"}
                  strokeWidth={"1.5"}
                >
                  {"\n                            "}
                  <path d={"m6 9 6 6 6-6"}></path>
                  {"\n                        "}
                </svg>
              </span>
            </summary>
            {"\n                "}
            <div className={"history-content"}>
              {"\n                    "}
              <dl className={"history-roster"}>
                {"\n                        "}
                <div>
                  {"\n                            "}
                  <dt>{"President"}</dt>
                  {"\n                            "}
                  <dd>{"Juliet Mohanan (Jasmine)"}</dd>
                  {"\n                        "}
                </div>
                {"\n                        "}
                <div>
                  {"\n                            "}
                  <dt>{"Vice President"}</dt>
                  {"\n                            "}
                  <dd>{"Anbu Manuel"}</dd>
                  {"\n                        "}
                </div>
                {"\n                        "}
                <div>
                  {"\n                            "}
                  <dt>{"Immediate Past President"}</dt>
                  {"\n                            "}
                  <dd>{"Jesu"}</dd>
                  {"\n                        "}
                </div>
                {"\n                        "}
                <div>
                  {"\n                            "}
                  <dt>{"Spiritual Director"}</dt>
                  {"\n                            "}
                  <dd>{"Archbishop Susai Jesu"}</dd>
                  {"\n                        "}
                </div>
                {"\n                        "}
                <div>
                  {"\n                            "}
                  <dt>{"Liturgy/Choir/Music"}</dt>
                  {"\n                            "}
                  <dd>{"Anto"}</dd>
                  {"\n                        "}
                </div>
                {"\n                        "}
                <div>
                  {"\n                            "}
                  <dt>{"Treasurer"}</dt>
                  {"\n                            "}
                  <dd>{"Anistan"}</dd>
                  {"\n                        "}
                </div>
                {"\n                        "}
                <div>
                  {"\n                            "}
                  <dt>{"Joint Treasurer 1"}</dt>
                  {"\n                            "}
                  <dd>{"Jeni"}</dd>
                  {"\n                        "}
                </div>
                {"\n                        "}
                <div>
                  {"\n                            "}
                  <dt>{"Joint Treasurer 2"}</dt>
                  {"\n                            "}
                  <dd>{"Shirley"}</dd>
                  {"\n                        "}
                </div>
                {"\n                        "}
                <div>
                  {"\n                            "}
                  <dt>{"Secretary"}</dt>
                  {"\n                            "}
                  <dd>{"Metilda"}</dd>
                  {"\n                        "}
                </div>
                {"\n                        "}
                <div>
                  {"\n                            "}
                  <dt>{"Events"}</dt>
                  {"\n                            "}
                  <dd>{"Jude"}</dd>
                  {"\n                        "}
                </div>
                {"\n                        "}
                <div>
                  {"\n                            "}
                  <dt>{"Social Service"}</dt>
                  {"\n                            "}
                  <dd>{"Felix"}</dd>
                  {"\n                        "}
                </div>
                {"\n                        "}
                <div>
                  {"\n                            "}
                  <dt>{"Youth and Kids"}</dt>
                  {"\n                            "}
                  <dd>{"Jageetha"}</dd>
                  {"\n                        "}
                </div>
                {"\n                    "}
              </dl>
              {"\n                "}
            </div>
            {"\n            "}
          </details>
          {"\n\n            "}
          <details className={"committee-history"}>
            {"\n                "}
            <summary className={"history-summary history-summary--term"}>
              <span className={"history-term"}>{"2017–2022"}</span>
              <span className={"history-summary-copy"}>
                <span className={"history-title"}>
                  {"Past Committee Members"}
                </span>
                <span className={"history-subtitle"}>
                  {
                    "Recognizing those who have contributed to our community’s growth\n                            and service."
                  }
                </span>
              </span>
              <span className={"history-toggle"} aria-hidden={"true"}>
                <svg
                  viewBox={"0 0 24 24"}
                  fill={"none"}
                  stroke={"currentColor"}
                  strokeWidth={"1.5"}
                >
                  {"\n                            "}
                  <path d={"m6 9 6 6 6-6"}></path>
                  {"\n                        "}
                </svg>
              </span>
            </summary>
            {"\n                "}
            <div className={"history-content"}>
              {"\n                    "}
              <ul className={"history-names"} role={"list"}>
                {"\n                        "}
                <li>{"Jesu G"}</li>
                {"\n                        "}
                <li>{"Plato P"}</li>
                {"\n                        "}
                <li>{"Jeyaprakash J"}</li>
                {"\n                        "}
                <li>{"Nevil H"}</li>
                {"\n                        "}
                <li>{"Ajith N"}</li>
                {"\n                        "}
                <li>{"Glory J"}</li>
                {"\n                        "}
                <li>{"Jerold R"}</li>
                {"\n                        "}
                <li>{"Metilda J"}</li>
                {"\n                        "}
                <li>{"Vincent M"}</li>
                {"\n                    "}
              </ul>
              {"\n                "}
            </div>
            {"\n            "}
          </details>
          {"\n\n            "}
          <div className={"committee-group-heading history-spiritual-heading"}>
            {"\n                "}
            <h3>{"Spiritual heritage"}</h3>
            {"\n            "}
          </div>
          {"\n            "}
          <div className={"history-spiritual-records"}>
            {"\n                "}
            <details className={"committee-history"}>
              {"\n                    "}
              <summary className={"history-summary"}>
                <span className={"history-summary-copy"}>
                  <span className={"history-title"}>
                    {"Past\n                                Spiritual Leaders"}
                  </span>
                  <span className={"history-subtitle"}>
                    {
                      "Honoring priests who have led and\n                                nurtured our community in the past."
                    }
                  </span>
                </span>
                <span className={"history-toggle"} aria-hidden={"true"}>
                  <svg
                    viewBox={"0 0 24 24"}
                    fill={"none"}
                    stroke={"currentColor"}
                    strokeWidth={"1.5"}
                  >
                    {"\n                                "}
                    <path d={"m6 9 6 6 6-6"}></path>
                    {"\n                            "}
                  </svg>
                </span>
              </summary>
              {"\n                    "}
              <div className={"history-content"}>
                {"\n                        "}
                <ul className={"history-names"} role={"list"}>
                  {"\n                            "}
                  <li>{"Fr. Adaikala Raja, SDB (2023-2024)"}</li>
                  {"\n                            "}
                  <li>{"Fr. Susai Jesu, OMI (2019-2022)"}</li>
                  {"\n                            "}
                  <li>{"Fr. John Louis, SDB (2018)"}</li>
                  {"\n                            "}
                  <li>{"Fr. Rajkumar, SDB (2017)"}</li>
                  {"\n                        "}
                </ul>
                {"\n                    "}
              </div>
              {"\n                "}
            </details>
            {"\n                "}
            <details className={"committee-history"}>
              {"\n                    "}
              <summary className={"history-summary"}>
                <span className={"history-summary-copy"}>
                  <span className={"history-title"}>
                    {"Active / Served Priests"}
                  </span>
                  <span className={"history-subtitle"}>
                    {
                      "Recognizing priests who have dedicated their service to our\n                                community."
                    }
                  </span>
                </span>
                <span className={"history-toggle"} aria-hidden={"true"}>
                  <svg
                    viewBox={"0 0 24 24"}
                    fill={"none"}
                    stroke={"currentColor"}
                    strokeWidth={"1.5"}
                  >
                    {"\n                                "}
                    <path d={"m6 9 6 6 6-6"}></path>
                    {"\n                            "}
                  </svg>
                </span>
              </summary>
              {"\n                    "}
              <div className={"history-content"}>
                {"\n                        "}
                <ul className={"history-names"} role={"list"}>
                  {"\n                            "}
                  <li>{"Fr. Adaikala Raja, SDB"}</li>
                  {"\n                            "}
                  <li>{"Fr. Antony Cruz, SAC"}</li>
                  {"\n                            "}
                  <li>{"Fr. Abraham, SAC"}</li>
                  {"\n                            "}
                  <li>{"Fr. Chinna, SDB"}</li>
                  {"\n                            "}
                  <li>{"Fr. Sagayaraj, SDB"}</li>
                  {"\n                            "}
                  <li>{"Fr. Satya, SDB"}</li>
                  {"\n                            "}
                  <li>{"Fr. Vincent, SDB"}</li>
                  {"\n                            "}
                  <li>{"Fr. Balraj, SDB"}</li>
                  {"\n                            "}
                  <li>{"Fr. Mahesh, SAC"}</li>
                  {"\n                        "}
                </ul>
                {"\n                    "}
              </div>
              {"\n                "}
            </details>
            {"\n                "}
            <details className={"committee-history"}>
              {"\n                    "}
              <summary className={"history-summary"}>
                <span className={"history-summary-copy"}>
                  <span className={"history-title"}>
                    {"Visiting Priests / Bishops"}
                  </span>
                  <span className={"history-subtitle"}>
                    {
                      "Grateful for the spiritual guidance of our guest\n                                priests."
                    }
                  </span>
                </span>
                <span className={"history-toggle"} aria-hidden={"true"}>
                  <svg
                    viewBox={"0 0 24 24"}
                    fill={"none"}
                    stroke={"currentColor"}
                    strokeWidth={"1.5"}
                  >
                    {"\n                                "}
                    <path d={"m6 9 6 6 6-6"}></path>
                    {"\n                            "}
                  </svg>
                </span>
              </summary>
              {"\n                    "}
              <div className={"history-content"}>
                {"\n                        "}
                <ul
                  className={"history-names history-names--long"}
                  role={"list"}
                >
                  {"\n                            "}
                  <li>
                    {
                      "Most Rev. Bishop Jebalamai Susaimanickam, Diocese of Sivagangai (2018)"
                    }
                  </li>
                  {"\n                            "}
                  <li>{"Fr. Vincent, SDB - From India (2019)"}</li>
                  {"\n                            "}
                  <li>
                    {
                      "Most Rev. Bishop Jeevanandam Amalanathan, Diocese of Kumbakonam (2024)"
                    }
                  </li>
                  {"\n                            "}
                  <li>{"Fr. Petter Thomas - From USA (2024)"}</li>
                  {"\n                        "}
                </ul>
                {"\n                    "}
              </div>
              {"\n                "}
            </details>
            {"\n            "}
          </div>
          {"\n        "}
        </div>
        {"\n    "}
      </section>
    </>
  );
}
