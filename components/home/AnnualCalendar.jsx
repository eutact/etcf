export default function AnnualCalendar() {
  return (
    <>
      <section
        id={"our-year-together"}
        className={"monthly-events annual-calendar section-frame"}
        aria-labelledby={"annual-heading"}
      >
        {"\n        "}
        <div className={"site-shell relative z-10"}>
          {"\n            "}
          <header className={"annual-header"}>
            {"\n                "}
            <span className={"section-kicker"}>{"Annual Rhythm"}</span>
            {"\n                "}
            <p className={"annual-year-label"}>
              <span data-event-year>{"Annual"}</span>
              {" community rhythm"}
            </p>
            {"\n                "}
            <h2 id={"annual-heading"}>{"Our Year Together"}</h2>
            {"\n                "}
            <p>
              {
                "Journey through a year of faith, worship, fellowship and community with ETCF."
              }
            </p>
            {"\n            "}
          </header>
          {"\n\n            "}
          <div className={"annual-explorer"} data-annual-events>
            {"\n                "}
            <nav
              className={"annual-month-nav"}
              aria-label={"Annual month selector"}
            >
              {"\n                    "}
              <div
                className={"annual-track"}
                role={"tablist"}
                aria-label={"Select a month"}
              >
                {"\n                        "}
                <a
                  id={"tab-january"}
                  className={"annual-month-tab"}
                  href={"#month-january"}
                  role={"tab"}
                  aria-controls={"month-january"}
                  aria-selected={"false"}
                  data-month-tab={"january"}
                  data-month-index={"0"}
                >
                  {"\n                            "}
                  <span className={"annual-month-number"}>{"01"}</span>
                  {"\n                            "}
                  <span className={"annual-month-short"}>{"JAN"}</span>
                  {"\n                            "}
                  <span className={"annual-month-name"}>{"January"}</span>
                  {"\n                            "}
                  <span className={"annual-month-current"}>{"Current"}</span>
                  {"\n                        "}
                </a>
                {"\n                        "}
                <a
                  id={"tab-february"}
                  className={"annual-month-tab"}
                  href={"#month-february"}
                  role={"tab"}
                  aria-controls={"month-february"}
                  aria-selected={"false"}
                  data-month-tab={"february"}
                  data-month-index={"1"}
                >
                  {"\n                            "}
                  <span className={"annual-month-number"}>{"02"}</span>
                  {"\n                            "}
                  <span className={"annual-month-short"}>{"FEB"}</span>
                  {"\n                            "}
                  <span className={"annual-month-name"}>{"February"}</span>
                  {"\n                            "}
                  <span className={"annual-month-current"}>{"Current"}</span>
                  {"\n                        "}
                </a>
                {"\n                        "}
                <a
                  id={"tab-march"}
                  className={"annual-month-tab"}
                  href={"#month-march"}
                  role={"tab"}
                  aria-controls={"month-march"}
                  aria-selected={"false"}
                  data-month-tab={"march"}
                  data-month-index={"2"}
                >
                  {"\n                            "}
                  <span className={"annual-month-number"}>{"03"}</span>
                  {"\n                            "}
                  <span className={"annual-month-short"}>{"MAR"}</span>
                  {"\n                            "}
                  <span className={"annual-month-name"}>{"March"}</span>
                  {"\n                            "}
                  <span className={"annual-month-current"}>{"Current"}</span>
                  {"\n                        "}
                </a>
                {"\n                        "}
                <a
                  id={"tab-april"}
                  className={"annual-month-tab"}
                  href={"#month-april"}
                  role={"tab"}
                  aria-controls={"month-april"}
                  aria-selected={"false"}
                  data-month-tab={"april"}
                  data-month-index={"3"}
                >
                  {"\n                            "}
                  <span className={"annual-month-number"}>{"04"}</span>
                  {"\n                            "}
                  <span className={"annual-month-short"}>{"APR"}</span>
                  {"\n                            "}
                  <span className={"annual-month-name"}>{"April"}</span>
                  {"\n                            "}
                  <span className={"annual-month-current"}>{"Current"}</span>
                  {"\n                        "}
                </a>
                {"\n                        "}
                <a
                  id={"tab-may"}
                  className={"annual-month-tab"}
                  href={"#month-may"}
                  role={"tab"}
                  aria-controls={"month-may"}
                  aria-selected={"false"}
                  data-month-tab={"may"}
                  data-month-index={"4"}
                >
                  {"\n                            "}
                  <span className={"annual-month-number"}>{"05"}</span>
                  {"\n                            "}
                  <span className={"annual-month-short"}>{"MAY"}</span>
                  {"\n                            "}
                  <span className={"annual-month-name"}>{"May"}</span>
                  {"\n                            "}
                  <span className={"annual-month-current"}>{"Current"}</span>
                  {"\n                        "}
                </a>
                {"\n                        "}
                <a
                  id={"tab-june"}
                  className={"annual-month-tab"}
                  href={"#month-june"}
                  role={"tab"}
                  aria-controls={"month-june"}
                  aria-selected={"false"}
                  data-month-tab={"june"}
                  data-month-index={"5"}
                >
                  {"\n                            "}
                  <span className={"annual-month-number"}>{"06"}</span>
                  {"\n                            "}
                  <span className={"annual-month-short"}>{"JUN"}</span>
                  {"\n                            "}
                  <span className={"annual-month-name"}>{"June"}</span>
                  {"\n                            "}
                  <span className={"annual-month-current"}>{"Current"}</span>
                  {"\n                        "}
                </a>
                {"\n                        "}
                <a
                  id={"tab-july"}
                  className={"annual-month-tab"}
                  href={"#month-july"}
                  role={"tab"}
                  aria-controls={"month-july"}
                  aria-selected={"false"}
                  data-month-tab={"july"}
                  data-month-index={"6"}
                >
                  {"\n                            "}
                  <span className={"annual-month-number"}>{"07"}</span>
                  {"\n                            "}
                  <span className={"annual-month-short"}>{"JUL"}</span>
                  {"\n                            "}
                  <span className={"annual-month-name"}>{"July"}</span>
                  {"\n                            "}
                  <span className={"annual-month-current"}>{"Current"}</span>
                  {"\n                        "}
                </a>
                {"\n                        "}
                <a
                  id={"tab-august"}
                  className={"annual-month-tab"}
                  href={"#month-august"}
                  role={"tab"}
                  aria-controls={"month-august"}
                  aria-selected={"false"}
                  data-month-tab={"august"}
                  data-month-index={"7"}
                >
                  {"\n                            "}
                  <span className={"annual-month-number"}>{"08"}</span>
                  {"\n                            "}
                  <span className={"annual-month-short"}>{"AUG"}</span>
                  {"\n                            "}
                  <span className={"annual-month-name"}>{"August"}</span>
                  {"\n                            "}
                  <span className={"annual-month-current"}>{"Current"}</span>
                  {"\n                        "}
                </a>
                {"\n                        "}
                <a
                  id={"tab-september"}
                  className={"annual-month-tab"}
                  href={"#month-september"}
                  role={"tab"}
                  aria-controls={"month-september"}
                  aria-selected={"false"}
                  data-month-tab={"september"}
                  data-month-index={"8"}
                >
                  {"\n                            "}
                  <span className={"annual-month-number"}>{"09"}</span>
                  {"\n                            "}
                  <span className={"annual-month-short"}>{"SEP"}</span>
                  {"\n                            "}
                  <span className={"annual-month-name"}>{"September"}</span>
                  {"\n                            "}
                  <span className={"annual-month-current"}>{"Current"}</span>
                  {"\n                        "}
                </a>
                {"\n                        "}
                <a
                  id={"tab-october"}
                  className={"annual-month-tab"}
                  href={"#month-october"}
                  role={"tab"}
                  aria-controls={"month-october"}
                  aria-selected={"false"}
                  data-month-tab={"october"}
                  data-month-index={"9"}
                >
                  {"\n                            "}
                  <span className={"annual-month-number"}>{"10"}</span>
                  {"\n                            "}
                  <span className={"annual-month-short"}>{"OCT"}</span>
                  {"\n                            "}
                  <span className={"annual-month-name"}>{"October"}</span>
                  {"\n                            "}
                  <span className={"annual-month-current"}>{"Current"}</span>
                  {"\n                        "}
                </a>
                {"\n                        "}
                <a
                  id={"tab-november"}
                  className={"annual-month-tab"}
                  href={"#month-november"}
                  role={"tab"}
                  aria-controls={"month-november"}
                  aria-selected={"false"}
                  data-month-tab={"november"}
                  data-month-index={"10"}
                >
                  {"\n                            "}
                  <span className={"annual-month-number"}>{"11"}</span>
                  {"\n                            "}
                  <span className={"annual-month-short"}>{"NOV"}</span>
                  {"\n                            "}
                  <span className={"annual-month-name"}>{"November"}</span>
                  {"\n                            "}
                  <span className={"annual-month-current"}>{"Current"}</span>
                  {"\n                        "}
                </a>
                {"\n                        "}
                <a
                  id={"tab-december"}
                  className={"annual-month-tab"}
                  href={"#month-december"}
                  role={"tab"}
                  aria-controls={"month-december"}
                  aria-selected={"false"}
                  data-month-tab={"december"}
                  data-month-index={"11"}
                >
                  {"\n                            "}
                  <span className={"annual-month-number"}>{"12"}</span>
                  {"\n                            "}
                  <span className={"annual-month-short"}>{"DEC"}</span>
                  {"\n                            "}
                  <span className={"annual-month-name"}>{"December"}</span>
                  {"\n                            "}
                  <span className={"annual-month-current"}>{"Current"}</span>
                  {"\n                        "}
                </a>
                {"\n                    "}
              </div>
              {"\n                "}
            </nav>
            {"\n\n                "}
            <div className={"annual-panel-shell"}>
              {"\n                    "}
              <article
                id={"month-january"}
                className={"annual-month-panel"}
                role={"tabpanel"}
                aria-labelledby={"tab-january"}
                tabIndex={"0"}
                data-month-panel={"january"}
              >
                {"\n                        "}
                <header className={"annual-panel-header"}>
                  {"\n                            "}
                  <div>
                    {"\n                                "}
                    <span className={"annual-panel-index"}>{"01"}</span>
                    {"\n                                "}
                    <p className={"annual-panel-eyebrow"}>{"January"}</p>
                    {"\n                                "}
                    <h3>{"Pongal Celebration"}</h3>
                    {"\n                            "}
                  </div>
                  {"\n                            "}
                  <span className={"annual-panel-count"}>
                    {"1 listed event"}
                  </span>
                  {"\n                        "}
                </header>
                {"\n                        "}
                <div className={"annual-event-list"}>
                  {"\n                            "}
                  <article className={"annual-event-card"}>
                    {"\n                                "}
                    <span className={"annual-event-type"}>{"Tamil Mass"}</span>
                    {"\n                                "}
                    <h4>{"Tamil Mass - Pongal Celebration"}</h4>
                    {"\n                                "}
                    <p>
                      {"Join us for an evening to celebrate Mass together!"}
                    </p>
                    {"\n                                "}
                    <dl className={"annual-event-meta"}>
                      {"\n                                    "}
                      <div>
                        {"\n                                        "}
                        <dt>
                          <i
                            className={"far fa-calendar-alt"}
                            aria-hidden={"true"}
                          ></i>
                          {"Date"}
                        </dt>
                        {"\n                                        "}
                        <dd>
                          {"January 11, "}
                          <span data-event-year>{"this year"}</span>{" "}
                          <span className={"annual-day-note"}>
                            {"(Saturday)"}
                          </span>
                        </dd>
                        {"\n                                    "}
                      </div>
                      {"\n                                    "}
                      <div>
                        {"\n                                        "}
                        <dt>
                          <i
                            className={"far fa-clock"}
                            aria-hidden={"true"}
                          ></i>
                          {"Time"}
                        </dt>
                        {"\n                                        "}
                        <dd>
                          {"6:45 PM "}
                          <span>{"(Rosary)"}</span>
                          {" & 7:15 PM "}
                          <span>{"(Mass)"}</span>
                        </dd>
                        {"\n                                    "}
                      </div>
                      {"\n                                    "}
                      <div>
                        {"\n                                        "}
                        <dt>
                          <i
                            className={"fas fa-location-dot"}
                            aria-hidden={"true"}
                          ></i>
                          {"Venue"}
                        </dt>
                        {"\n                                        "}
                        <dd>
                          {
                            "St. Theresa's Catholic Church, 7508 29 Ave NW, Edmonton, AB - T6K 3Y8."
                          }
                        </dd>
                        {"\n                                    "}
                      </div>
                      {"\n                                "}
                    </dl>
                    {"\n                            "}
                  </article>
                  {"\n                        "}
                </div>
                {"\n                    "}
              </article>
              {"\n\n                    "}
              <article
                id={"month-february"}
                className={"annual-month-panel"}
                role={"tabpanel"}
                aria-labelledby={"tab-february"}
                tabIndex={"0"}
                data-month-panel={"february"}
              >
                {"\n                        "}
                <header className={"annual-panel-header"}>
                  {"\n                            "}
                  <div>
                    {"\n                                "}
                    <span className={"annual-panel-index"}>{"02"}</span>
                    {"\n                                "}
                    <p className={"annual-panel-eyebrow"}>{"February"}</p>
                    {"\n                                "}
                    <h3>{"Holy Family Devotion"}</h3>
                    {"\n                            "}
                  </div>
                  {"\n                            "}
                  <span className={"annual-panel-count"}>
                    {"1 listed event"}
                  </span>
                  {"\n                        "}
                </header>
                {"\n                        "}
                <div className={"annual-event-list"}>
                  {"\n                            "}
                  <article className={"annual-event-card"}>
                    {"\n                                "}
                    <span className={"annual-event-type"}>{"Tamil Mass"}</span>
                    {"\n                                "}
                    <h4>{"Tamil Mass - Dedicated to Holy Family"}</h4>
                    {"\n                                "}
                    <p>
                      {"Join us for an evening to celebrate Mass together!"}
                    </p>
                    {"\n                                "}
                    <dl className={"annual-event-meta"}>
                      {"\n                                    "}
                      <div>
                        {"\n                                        "}
                        <dt>
                          <i
                            className={"far fa-calendar-alt"}
                            aria-hidden={"true"}
                          ></i>
                          {"Date"}
                        </dt>
                        {"\n                                        "}
                        <dd>
                          {"February 08, "}
                          <span data-event-year>{"this year"}</span>{" "}
                          <span className={"annual-day-note"}>
                            {"(Saturday)"}
                          </span>
                        </dd>
                        {"\n                                    "}
                      </div>
                      {"\n                                    "}
                      <div>
                        {"\n                                        "}
                        <dt>
                          <i
                            className={"far fa-clock"}
                            aria-hidden={"true"}
                          ></i>
                          {"Time"}
                        </dt>
                        {"\n                                        "}
                        <dd>
                          {"6:45 PM "}
                          <span>{"(Rosary)"}</span>
                          {" & 7:15 PM "}
                          <span>{"(Mass)"}</span>
                        </dd>
                        {"\n                                    "}
                      </div>
                      {"\n                                    "}
                      <div>
                        {"\n                                        "}
                        <dt>
                          <i
                            className={"fas fa-location-dot"}
                            aria-hidden={"true"}
                          ></i>
                          {"Venue"}
                        </dt>
                        {"\n                                        "}
                        <dd>
                          {
                            "St. Theresa's Catholic Church, 7508 29 Ave NW, Edmonton, AB - T6K 3Y8."
                          }
                        </dd>
                        {"\n                                    "}
                      </div>
                      {"\n                                "}
                    </dl>
                    {"\n                            "}
                  </article>
                  {"\n                        "}
                </div>
                {"\n                    "}
              </article>
              {"\n\n                    "}
              <article
                id={"month-march"}
                className={"annual-month-panel"}
                role={"tabpanel"}
                aria-labelledby={"tab-march"}
                tabIndex={"0"}
                data-month-panel={"march"}
              >
                {"\n                        "}
                <header className={"annual-panel-header"}>
                  {"\n                            "}
                  <div>
                    {"\n                                "}
                    <span className={"annual-panel-index"}>{"03"}</span>
                    {"\n                                "}
                    <p className={"annual-panel-eyebrow"}>{"March"}</p>
                    {"\n                                "}
                    <h3>{"Retreat & Tamil Mass"}</h3>
                    {"\n                            "}
                  </div>
                  {"\n                            "}
                  <span className={"annual-panel-count"}>
                    {"1 listed event"}
                  </span>
                  {"\n                        "}
                </header>
                {"\n                        "}
                <div className={"annual-event-list"}>
                  {"\n                            "}
                  <article className={"annual-event-card"}>
                    {"\n                                "}
                    <span className={"annual-event-type"}>{"Retreat"}</span>
                    {"\n                                "}
                    <h4>{"ETCF Lenten Retreat & Tamil Mass"}</h4>
                    {"\n                                "}
                    <p>
                      {
                        "Join us for a spiritual one-day retreat and celebrate Mass together!"
                      }
                    </p>
                    {"\n                                "}
                    <dl className={"annual-event-meta"}>
                      {"\n                                    "}
                      <div>
                        {"\n                                        "}
                        <dt>
                          <i
                            className={"far fa-calendar-alt"}
                            aria-hidden={"true"}
                          ></i>
                          {"Date"}
                        </dt>
                        {"\n                                        "}
                        <dd>
                          {"March 29, "}
                          <span data-event-year>{"this year"}</span>{" "}
                          <span className={"annual-day-note"}>
                            {"(Saturday)"}
                          </span>
                        </dd>
                        {"\n                                    "}
                      </div>
                      {"\n                                    "}
                      <div>
                        {"\n                                        "}
                        <dt>
                          <i
                            className={"far fa-clock"}
                            aria-hidden={"true"}
                          ></i>
                          {"Time"}
                        </dt>
                        {"\n                                        "}
                        <dd>{"10:00 AM to 4:30 PM"}</dd>
                        {"\n                                    "}
                      </div>
                      {"\n                                    "}
                      <div>
                        {"\n                                        "}
                        <dt>
                          <i
                            className={"fas fa-location-dot"}
                            aria-hidden={"true"}
                          ></i>
                          {"Venue"}
                        </dt>
                        {"\n                                        "}
                        <dd>
                          {
                            "Sacred Heart Catholic Church, 10821 96 St, Edmonton, AB T5H 2J8."
                          }
                        </dd>
                        {"\n                                    "}
                      </div>
                      {"\n                                "}
                    </dl>
                    {"\n                            "}
                  </article>
                  {"\n                        "}
                </div>
                {"\n                    "}
              </article>
              {"\n\n                    "}
              <article
                id={"month-april"}
                className={"annual-month-panel"}
                role={"tabpanel"}
                aria-labelledby={"tab-april"}
                tabIndex={"0"}
                data-month-panel={"april"}
              >
                {"\n                        "}
                <header className={"annual-panel-header"}>
                  {"\n                            "}
                  <div>
                    {"\n                                "}
                    <span className={"annual-panel-index"}>{"04"}</span>
                    {"\n                                "}
                    <p className={"annual-panel-eyebrow"}>{"April"}</p>
                    {"\n                                "}
                    <h3>{"Easter Celebration"}</h3>
                    {"\n                            "}
                  </div>
                  {"\n                            "}
                  <span className={"annual-panel-count"}>
                    {"1 listed event"}
                  </span>
                  {"\n                        "}
                </header>
                {"\n                        "}
                <div className={"annual-event-list"}>
                  {"\n                            "}
                  <article className={"annual-event-card"}>
                    {"\n                                "}
                    <span className={"annual-event-type"}>{"Tamil Mass"}</span>
                    {"\n                                "}
                    <h4>{"Tamil Mass - Easter Celebration"}</h4>
                    {"\n                                "}
                    <p>
                      {"Join us for an evening to celebrate Mass together!"}
                    </p>
                    {"\n                                "}
                    <dl className={"annual-event-meta"}>
                      {"\n                                    "}
                      <div>
                        {"\n                                        "}
                        <dt>
                          <i
                            className={"far fa-calendar-alt"}
                            aria-hidden={"true"}
                          ></i>
                          {"Date"}
                        </dt>
                        {"\n                                        "}
                        <dd>
                          {"April 26, "}
                          <span data-event-year>{"this year"}</span>{" "}
                          <span className={"annual-day-note"}>
                            {"(Saturday)"}
                          </span>
                        </dd>
                        {"\n                                    "}
                      </div>
                      {"\n                                    "}
                      <div>
                        {"\n                                        "}
                        <dt>
                          <i
                            className={"far fa-clock"}
                            aria-hidden={"true"}
                          ></i>
                          {"Time"}
                        </dt>
                        {"\n                                        "}
                        <dd>
                          {"6:45 PM "}
                          <span>{"(Rosary)"}</span>
                          {" & 7:15 PM "}
                          <span>{"(Mass)"}</span>
                        </dd>
                        {"\n                                    "}
                      </div>
                      {"\n                                    "}
                      <div>
                        {"\n                                        "}
                        <dt>
                          <i
                            className={"fas fa-location-dot"}
                            aria-hidden={"true"}
                          ></i>
                          {"Venue"}
                        </dt>
                        {"\n                                        "}
                        <dd>
                          {
                            "St. Theresa's Catholic Church, 7508 29 Ave NW, Edmonton, AB - T6K 3Y8."
                          }
                        </dd>
                        {"\n                                    "}
                      </div>
                      {"\n                                "}
                    </dl>
                    {"\n                            "}
                  </article>
                  {"\n                        "}
                </div>
                {"\n                    "}
              </article>
              {"\n\n                    "}
              <article
                id={"month-may"}
                className={"annual-month-panel"}
                role={"tabpanel"}
                aria-labelledby={"tab-may"}
                tabIndex={"0"}
                data-month-panel={"may"}
              >
                {"\n                        "}
                <header className={"annual-panel-header"}>
                  {"\n                            "}
                  <div>
                    {"\n                                "}
                    <span className={"annual-panel-index"}>{"05"}</span>
                    {"\n                                "}
                    <p className={"annual-panel-eyebrow"}>{"May"}</p>
                    {"\n                                "}
                    <h3>{"Blessed Virgin Mary"}</h3>
                    {"\n                            "}
                  </div>
                  {"\n                            "}
                  <span className={"annual-panel-count"}>
                    {"1 listed event"}
                  </span>
                  {"\n                        "}
                </header>
                {"\n                        "}
                <div className={"annual-event-list"}>
                  {"\n                            "}
                  <article className={"annual-event-card"}>
                    {"\n                                "}
                    <span className={"annual-event-type"}>{"Tamil Mass"}</span>
                    {"\n                                "}
                    <h4>{"Tamil Mass - Dedicated to Blessed Virgin Mary"}</h4>
                    {"\n                                "}
                    <p>
                      {"Join us for an evening to celebrate Mass together!"}
                    </p>
                    {"\n                                "}
                    <dl className={"annual-event-meta"}>
                      {"\n                                    "}
                      <div>
                        {"\n                                        "}
                        <dt>
                          <i
                            className={"far fa-calendar-alt"}
                            aria-hidden={"true"}
                          ></i>
                          {"Date"}
                        </dt>
                        {"\n                                        "}
                        <dd>
                          {"May 10, "}
                          <span data-event-year>{"this year"}</span>{" "}
                          <span className={"annual-day-note"}>
                            {"(Saturday)"}
                          </span>
                        </dd>
                        {"\n                                    "}
                      </div>
                      {"\n                                    "}
                      <div>
                        {"\n                                        "}
                        <dt>
                          <i
                            className={"far fa-clock"}
                            aria-hidden={"true"}
                          ></i>
                          {"Time"}
                        </dt>
                        {"\n                                        "}
                        <dd>
                          {"6:45 PM "}
                          <span>{"(Rosary)"}</span>
                          {" & 7:15 PM "}
                          <span>{"(Mass)"}</span>
                        </dd>
                        {"\n                                    "}
                      </div>
                      {"\n                                    "}
                      <div>
                        {"\n                                        "}
                        <dt>
                          <i
                            className={"fas fa-location-dot"}
                            aria-hidden={"true"}
                          ></i>
                          {"Venue"}
                        </dt>
                        {"\n                                        "}
                        <dd>
                          {
                            "Sacred Heart Catholic Church, 10821 96 St, Edmonton, AB T5H 2J8."
                          }
                        </dd>
                        {"\n                                    "}
                      </div>
                      {"\n                                "}
                    </dl>
                    {"\n                            "}
                  </article>
                  {"\n                        "}
                </div>
                {"\n                    "}
              </article>
              {"\n\n                    "}
              <article
                id={"month-june"}
                className={"annual-month-panel"}
                role={"tabpanel"}
                aria-labelledby={"tab-june"}
                tabIndex={"0"}
                data-month-panel={"june"}
              >
                {"\n                        "}
                <header className={"annual-panel-header"}>
                  {"\n                            "}
                  <div>
                    {"\n                                "}
                    <span className={"annual-panel-index"}>{"06"}</span>
                    {"\n                                "}
                    <p className={"annual-panel-eyebrow"}>{"June"}</p>
                    {"\n                                "}
                    <h3>{"Sacred Heart Devotion"}</h3>
                    {"\n                            "}
                  </div>
                  {"\n                            "}
                  <span className={"annual-panel-count"}>
                    {"1 listed event"}
                  </span>
                  {"\n                        "}
                </header>
                {"\n                        "}
                <div className={"annual-event-list"}>
                  {"\n                            "}
                  <article className={"annual-event-card"}>
                    {"\n                                "}
                    <span className={"annual-event-type"}>{"Tamil Mass"}</span>
                    {"\n                                "}
                    <h4>{"Tamil Mass - Dedicated to Sacred Heart of Jesus"}</h4>
                    {"\n                                "}
                    <p>
                      {"Join us for an evening to celebrate Mass together!"}
                    </p>
                    {"\n                                "}
                    <dl className={"annual-event-meta"}>
                      {"\n                                    "}
                      <div>
                        {"\n                                        "}
                        <dt>
                          <i
                            className={"far fa-calendar-alt"}
                            aria-hidden={"true"}
                          ></i>
                          {"Date"}
                        </dt>
                        {"\n                                        "}
                        <dd>
                          {"June 14, "}
                          <span data-event-year>{"this year"}</span>{" "}
                          <span className={"annual-day-note"}>
                            {"(Saturday)"}
                          </span>
                        </dd>
                        {"\n                                    "}
                      </div>
                      {"\n                                    "}
                      <div>
                        {"\n                                        "}
                        <dt>
                          <i
                            className={"far fa-clock"}
                            aria-hidden={"true"}
                          ></i>
                          {"Time"}
                        </dt>
                        {"\n                                        "}
                        <dd>
                          {"6:45 PM "}
                          <span>{"(Rosary)"}</span>
                          {" & 7:15 PM "}
                          <span>{"(Mass)"}</span>
                        </dd>
                        {"\n                                    "}
                      </div>
                      {"\n                                    "}
                      <div>
                        {"\n                                        "}
                        <dt>
                          <i
                            className={"fas fa-location-dot"}
                            aria-hidden={"true"}
                          ></i>
                          {"Venue"}
                        </dt>
                        {"\n                                        "}
                        <dd>
                          {
                            "St. Theresa's Catholic Church, 7508 29 Ave NW, Edmonton, AB - T6K 3Y8."
                          }
                        </dd>
                        {"\n                                    "}
                      </div>
                      {"\n                                "}
                    </dl>
                    {"\n                            "}
                  </article>
                  {"\n                        "}
                </div>
                {"\n                    "}
              </article>
              {"\n\n                    "}
              <article
                id={"month-july"}
                className={"annual-month-panel"}
                role={"tabpanel"}
                aria-labelledby={"tab-july"}
                tabIndex={"0"}
                data-month-panel={"july"}
              >
                {"\n                        "}
                <header className={"annual-panel-header"}>
                  {"\n                            "}
                  <div>
                    {"\n                                "}
                    <span className={"annual-panel-index"}>{"07"}</span>
                    {"\n                                "}
                    <p className={"annual-panel-eyebrow"}>{"July"}</p>
                    {"\n                                "}
                    <h3>{"Jubilee Celebration"}</h3>
                    {"\n                            "}
                  </div>
                  {"\n                            "}
                  <span className={"annual-panel-count"}>
                    {"1 listed event"}
                  </span>
                  {"\n                        "}
                </header>
                {"\n                        "}
                <div className={"annual-event-list"}>
                  {"\n                            "}
                  <article className={"annual-event-card"}>
                    {"\n                                "}
                    <span className={"annual-event-type"}>{"Tamil Mass"}</span>
                    {"\n                                "}
                    <h4>{"Tamil Mass - Fr. Susai Jubilee Celebration Mass"}</h4>
                    {"\n                                "}
                    <p>{"Join us to celebrate Mass together!"}</p>
                    {"\n                                "}
                    <dl className={"annual-event-meta"}>
                      {"\n                                    "}
                      <div>
                        {"\n                                        "}
                        <dt>
                          <i
                            className={"far fa-calendar-alt"}
                            aria-hidden={"true"}
                          ></i>
                          {"Date"}
                        </dt>
                        {"\n                                        "}
                        <dd>
                          {"July 26, "}
                          <span data-event-year>{"this year"}</span>{" "}
                          <span className={"annual-day-note"}>
                            {"(Saturday)"}
                          </span>
                        </dd>
                        {"\n                                    "}
                      </div>
                      {"\n                                    "}
                      <div>
                        {"\n                                        "}
                        <dt>
                          <i
                            className={"far fa-clock"}
                            aria-hidden={"true"}
                          ></i>
                          {"Time"}
                        </dt>
                        {"\n                                        "}
                        <dd>
                          {"5:30 PM "}
                          <span>{"(Rosary)"}</span>
                          {" & 6:00 PM "}
                          <span>{"(Mass)"}</span>
                        </dd>
                        {"\n                                    "}
                      </div>
                      {"\n                                    "}
                      <div>
                        {"\n                                        "}
                        <dt>
                          <i
                            className={"fas fa-location-dot"}
                            aria-hidden={"true"}
                          ></i>
                          {"Venue"}
                        </dt>
                        {"\n                                        "}
                        <dd>
                          {
                            "Sacred Heart Church of the First Peoples, 10821 96 St, Edmonton, AB T5H 2J8.\n                                        "
                          }
                        </dd>
                        {"\n                                    "}
                      </div>
                      {"\n                                "}
                    </dl>
                    {"\n                            "}
                  </article>
                  {"\n                        "}
                </div>
                {"\n                    "}
              </article>
              {"\n\n                    "}
              <article
                id={"month-august"}
                className={"annual-month-panel"}
                role={"tabpanel"}
                aria-labelledby={"tab-august"}
                tabIndex={"0"}
                data-month-panel={"august"}
              >
                {"\n                        "}
                <header className={"annual-panel-header"}>
                  {"\n                            "}
                  <div>
                    {"\n                                "}
                    <span className={"annual-panel-index"}>{"08"}</span>
                    {"\n                                "}
                    <p className={"annual-panel-eyebrow"}>{"August"}</p>
                    {"\n                                "}
                    <h3>{"Madhu Madha & Family Picnic"}</h3>
                    {"\n                            "}
                  </div>
                  {"\n                            "}
                  <span className={"annual-panel-count"}>
                    {"1 listed event"}
                  </span>
                  {"\n                        "}
                </header>
                {"\n                        "}
                <div className={"annual-event-list"}>
                  {"\n                            "}
                  <article className={"annual-event-card"}>
                    {"\n                                "}
                    <span className={"annual-event-type"}>
                      {"Tamil Mass + Gathering"}
                    </span>
                    {"\n                                "}
                    <h4>
                      {
                        "Tamil Mass - Dedicated to Madhu Madha | Annual Family Picnic 2025 @ Lac St. Anne\n                                "
                      }
                    </h4>
                    {"\n                                "}
                    <p>{"Join us to celebrate Mass together!"}</p>
                    {"\n                                "}
                    <dl className={"annual-event-meta"}>
                      {"\n                                    "}
                      <div>
                        {"\n                                        "}
                        <dt>
                          <i
                            className={"far fa-calendar-alt"}
                            aria-hidden={"true"}
                          ></i>
                          {"Date"}
                        </dt>
                        {"\n                                        "}
                        <dd>
                          {"16 August "}
                          <span data-event-year>{"this year"}</span>
                        </dd>
                        {"\n                                    "}
                      </div>
                      {"\n                                    "}
                      <div>
                        {"\n                                        "}
                        <dt>
                          <i
                            className={"far fa-clock"}
                            aria-hidden={"true"}
                          ></i>
                          {"Time"}
                        </dt>
                        {"\n                                        "}
                        <dd>{"10 AM"}</dd>
                        {"\n                                    "}
                      </div>
                      {"\n                                    "}
                      <div>
                        {"\n                                        "}
                        <dt>
                          <i
                            className={"fas fa-location-dot"}
                            aria-hidden={"true"}
                          ></i>
                          {"Venue"}
                        </dt>
                        {"\n                                        "}
                        <dd>
                          {
                            "St. Anne Shrine (Lac Ste Anne Pilgrimage Grounds), Comp 33, Site 114, RR 1,\n                                            Lac Ste. Anne, AB T0E 0A0"
                          }
                        </dd>
                        {"\n                                    "}
                      </div>
                      {"\n                                "}
                    </dl>
                    {"\n                            "}
                  </article>
                  {"\n                        "}
                </div>
                {"\n                    "}
              </article>
              {"\n\n                    "}
              <article
                id={"month-september"}
                className={"annual-month-panel"}
                role={"tabpanel"}
                aria-labelledby={"tab-september"}
                tabIndex={"0"}
                data-month-panel={"september"}
              >
                {"\n                        "}
                <header className={"annual-panel-header"}>
                  {"\n                            "}
                  <div>
                    {"\n                                "}
                    <span className={"annual-panel-index"}>{"09"}</span>
                    {"\n                                "}
                    <p className={"annual-panel-eyebrow"}>{"September"}</p>
                    {"\n                                "}
                    <h3>{"Annai Velankanni Feast"}</h3>
                    {"\n                            "}
                  </div>
                  {"\n                            "}
                  <span className={"annual-panel-count"}>
                    {"1 listed event"}
                  </span>
                  {"\n                        "}
                </header>
                {"\n                        "}
                <div className={"annual-event-list"}>
                  {"\n                            "}
                  <article className={"annual-event-card"}>
                    {"\n                                "}
                    <span className={"annual-event-type"}>{"Tamil Mass"}</span>
                    {"\n                                "}
                    <h4>{"Tamil Mass - Annai Velankanni Feast"}</h4>
                    {"\n                                "}
                    <p>
                      {"Join us for an evening to celebrate Mass together!"}
                    </p>
                    {"\n                                "}
                    <dl className={"annual-event-meta"}>
                      {"\n                                    "}
                      <div>
                        {"\n                                        "}
                        <dt>
                          <i
                            className={"far fa-calendar-alt"}
                            aria-hidden={"true"}
                          ></i>
                          {"Date"}
                        </dt>
                        {"\n                                        "}
                        <dd>
                          {"September 13, "}
                          <span data-event-year>{"this year"}</span>{" "}
                          <span className={"annual-day-note"}>
                            {"(Saturday)"}
                          </span>
                        </dd>
                        {"\n                                    "}
                      </div>
                      {"\n                                    "}
                      <div>
                        {"\n                                        "}
                        <dt>
                          <i
                            className={"far fa-clock"}
                            aria-hidden={"true"}
                          ></i>
                          {"Time"}
                        </dt>
                        {"\n                                        "}
                        <dd>
                          {"6:45 PM "}
                          <span>{"(Rosary)"}</span>
                          {" & 7:15 PM "}
                          <span>{"(Mass)"}</span>
                        </dd>
                        {"\n                                    "}
                      </div>
                      {"\n                                    "}
                      <div>
                        {"\n                                        "}
                        <dt>
                          <i
                            className={"fas fa-location-dot"}
                            aria-hidden={"true"}
                          ></i>
                          {"Venue"}
                        </dt>
                        {"\n                                        "}
                        <dd>
                          {
                            "St. Theresa's Catholic Church, 7508 29 Ave NW, Edmonton, AB - T6K 3Y8."
                          }
                        </dd>
                        {"\n                                    "}
                      </div>
                      {"\n                                "}
                    </dl>
                    {"\n                            "}
                  </article>
                  {"\n                        "}
                </div>
                {"\n                    "}
              </article>
              {"\n\n                    "}
              <article
                id={"month-october"}
                className={"annual-month-panel"}
                role={"tabpanel"}
                aria-labelledby={"tab-october"}
                tabIndex={"0"}
                data-month-panel={"october"}
              >
                {"\n                        "}
                <header className={"annual-panel-header"}>
                  {"\n                            "}
                  <div>
                    {"\n                                "}
                    <span className={"annual-panel-index"}>{"10"}</span>
                    {"\n                                "}
                    <p className={"annual-panel-eyebrow"}>{"October"}</p>
                    {"\n                                "}
                    <h3>{"Holy Rosary"}</h3>
                    {"\n                            "}
                  </div>
                  {"\n                            "}
                  <span className={"annual-panel-count"}>
                    {"1 listed event"}
                  </span>
                  {"\n                        "}
                </header>
                {"\n                        "}
                <div className={"annual-event-list"}>
                  {"\n                            "}
                  <article className={"annual-event-card"}>
                    {"\n                                "}
                    <span className={"annual-event-type"}>{"Tamil Mass"}</span>
                    {"\n                                "}
                    <h4>{"Tamil Mass - Dedicated to Holy Rosary"}</h4>
                    {"\n                                "}
                    <p>
                      {"Join us for an evening to celebrate Mass together!"}
                    </p>
                    {"\n                                "}
                    <dl className={"annual-event-meta"}>
                      {"\n                                    "}
                      <div>
                        {"\n                                        "}
                        <dt>
                          <i
                            className={"far fa-calendar-alt"}
                            aria-hidden={"true"}
                          ></i>
                          {"Date"}
                        </dt>
                        {"\n                                        "}
                        <dd>
                          {"October 11, "}
                          <span data-event-year>{"this year"}</span>{" "}
                          <span className={"annual-day-note"}>
                            {"(Saturday)"}
                          </span>
                        </dd>
                        {"\n                                    "}
                      </div>
                      {"\n                                    "}
                      <div>
                        {"\n                                        "}
                        <dt>
                          <i
                            className={"far fa-clock"}
                            aria-hidden={"true"}
                          ></i>
                          {"Time"}
                        </dt>
                        {"\n                                        "}
                        <dd>
                          {"6:45 PM "}
                          <span>{"(Rosary)"}</span>
                          {" & 7:15 PM "}
                          <span>{"(Mass)"}</span>
                        </dd>
                        {"\n                                    "}
                      </div>
                      {"\n                                    "}
                      <div>
                        {"\n                                        "}
                        <dt>
                          <i
                            className={"fas fa-location-dot"}
                            aria-hidden={"true"}
                          ></i>
                          {"Venue"}
                        </dt>
                        {"\n                                        "}
                        <dd>
                          {
                            "St. Theresa's Catholic Church, 7508 29 Ave NW, Edmonton, AB - T6K 3Y8."
                          }
                        </dd>
                        {"\n                                    "}
                      </div>
                      {"\n                                "}
                    </dl>
                    {"\n                            "}
                  </article>
                  {"\n                        "}
                </div>
                {"\n                    "}
              </article>
              {"\n\n                    "}
              <article
                id={"month-november"}
                className={"annual-month-panel"}
                role={"tabpanel"}
                aria-labelledby={"tab-november"}
                tabIndex={"0"}
                data-month-panel={"november"}
              >
                {"\n                        "}
                <header className={"annual-panel-header"}>
                  {"\n                            "}
                  <div>
                    {"\n                                "}
                    <span className={"annual-panel-index"}>{"11"}</span>
                    {"\n                                "}
                    <p className={"annual-panel-eyebrow"}>{"November"}</p>
                    {"\n                                "}
                    <h3>{"All Saints & All Souls"}</h3>
                    {"\n                            "}
                  </div>
                  {"\n                            "}
                  <span className={"annual-panel-count"}>
                    {"1 listed event"}
                  </span>
                  {"\n                        "}
                </header>
                {"\n                        "}
                <div className={"annual-event-list"}>
                  {"\n                            "}
                  <article className={"annual-event-card"}>
                    {"\n                                "}
                    <span className={"annual-event-type"}>{"Tamil Mass"}</span>
                    {"\n                                "}
                    <h4>{"Tamil Mass - All saints & All souls Days"}</h4>
                    {"\n                                "}
                    <p>
                      {"Join us for an evening to celebrate Mass together!"}
                    </p>
                    {"\n                                "}
                    <dl className={"annual-event-meta"}>
                      {"\n                                    "}
                      <div>
                        {"\n                                        "}
                        <dt>
                          <i
                            className={"far fa-calendar-alt"}
                            aria-hidden={"true"}
                          ></i>
                          {"Date"}
                        </dt>
                        {"\n                                        "}
                        <dd>
                          {"November 01, "}
                          <span data-event-year>{"this year"}</span>{" "}
                          <span className={"annual-day-note"}>
                            {"(Saturday)"}
                          </span>
                        </dd>
                        {"\n                                    "}
                      </div>
                      {"\n                                    "}
                      <div>
                        {"\n                                        "}
                        <dt>
                          <i
                            className={"far fa-clock"}
                            aria-hidden={"true"}
                          ></i>
                          {"Time"}
                        </dt>
                        {"\n                                        "}
                        <dd>
                          {"6:45 PM "}
                          <span>{"(Rosary)"}</span>
                          {" & 7:15 PM "}
                          <span>{"(Mass)"}</span>
                        </dd>
                        {"\n                                    "}
                      </div>
                      {"\n                                    "}
                      <div>
                        {"\n                                        "}
                        <dt>
                          <i
                            className={"fas fa-location-dot"}
                            aria-hidden={"true"}
                          ></i>
                          {"Venue"}
                        </dt>
                        {"\n                                        "}
                        <dd>
                          {
                            "St. Theresa's Catholic Church, 7508 29 Ave NW, Edmonton, AB - T6K 3Y8."
                          }
                        </dd>
                        {"\n                                    "}
                      </div>
                      {"\n                                "}
                    </dl>
                    {"\n                            "}
                  </article>
                  {"\n                        "}
                </div>
                {"\n                    "}
              </article>
              {"\n\n                    "}
              <article
                id={"month-december"}
                className={"annual-month-panel"}
                role={"tabpanel"}
                aria-labelledby={"tab-december"}
                tabIndex={"0"}
                data-month-panel={"december"}
              >
                {"\n                        "}
                <header className={"annual-panel-header"}>
                  {"\n                            "}
                  <div>
                    {"\n                                "}
                    <span className={"annual-panel-index"}>{"12"}</span>
                    {"\n                                "}
                    <p className={"annual-panel-eyebrow"}>{"December"}</p>
                    {"\n                                "}
                    <h3>{"Christmas Celebration"}</h3>
                    {"\n                            "}
                  </div>
                  {"\n                            "}
                  <span className={"annual-panel-count"}>
                    {"1 listed event"}
                  </span>
                  {"\n                        "}
                </header>
                {"\n                        "}
                <div className={"annual-event-list"}>
                  {"\n                            "}
                  <article className={"annual-event-card"}>
                    {"\n                                "}
                    <span className={"annual-event-type"}>
                      {"Tamil Mass + Celebration"}
                    </span>
                    {"\n                                "}
                    <h4>{"Tamil Mass - Christmas Celebration"}</h4>
                    {"\n                                "}
                    <p>
                      {"Join us for an evening to celebrate Mass together!"}
                    </p>
                    {"\n                                "}
                    <dl className={"annual-event-meta"}>
                      {"\n                                    "}
                      <div>
                        {"\n                                        "}
                        <dt>
                          <i
                            className={"far fa-calendar-alt"}
                            aria-hidden={"true"}
                          ></i>
                          {"Date"}
                        </dt>
                        {"\n                                        "}
                        <dd>
                          {"December 27, "}
                          <span data-event-year>{"this year"}</span>{" "}
                          <span className={"annual-day-note"}>
                            {"(Saturday)"}
                          </span>
                        </dd>
                        {"\n                                    "}
                      </div>
                      {"\n                                    "}
                      <div>
                        {"\n                                        "}
                        <dt>
                          <i
                            className={"far fa-clock"}
                            aria-hidden={"true"}
                          ></i>
                          {"Time"}
                        </dt>
                        {"\n                                        "}
                        <dd>
                          {"11:00 AM "}
                          <span>{"(Rosary)"}</span>
                          {" & 11:15 AM "}
                          <span>{"(Mass)"}</span>
                        </dd>
                        {"\n                                    "}
                      </div>
                      {"\n                                    "}
                      <div>
                        {"\n                                        "}
                        <dt>
                          <i
                            className={"fas fa-location-dot"}
                            aria-hidden={"true"}
                          ></i>
                          {"Venue"}
                        </dt>
                        {"\n                                        "}
                        <dd>
                          {
                            "St. Theresa's Catholic Church, 7508 29 Ave NW, Edmonton, AB - T6K 3Y8."
                          }
                        </dd>
                        {"\n                                    "}
                      </div>
                      {"\n                                "}
                    </dl>
                    {"\n                                "}
                    <p className={"annual-event-note"}>
                      <strong>
                        {
                          "Followed by Luncheon and Christmas\n                                        Culturals."
                        }
                      </strong>
                      {"\n                                "}
                    </p>
                    {"\n                            "}
                  </article>
                  {"\n                        "}
                </div>
                {"\n                    "}
              </article>
              {"\n                "}
            </div>
            {"\n\n                "}
            <p className={"annual-empty-state"} data-annual-empty hidden>
              {
                "No event details are currently listed for this\n                    month."
              }
            </p>
            {"\n            "}
          </div>
          {"\n        "}
        </div>
        {"\n    "}
      </section>
    </>
  );
}
