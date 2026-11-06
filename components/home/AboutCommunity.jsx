export default function AboutCommunity() {
  return (
    <>
      <section
        id={"about"}
        className={"community-section community-section--about"}
        aria-labelledby={"about-heading"}
      >
        {"\n        "}
        <div className={"site-shell"}>
          {"\n            "}
          <div className={"about-layout"}>
            {"\n                "}
            <div className={"about-copy"}>
              {"\n                    "}
              <header className={"community-header"}>
                {"\n                        "}
                <p className={"community-eyebrow"}>{"Our community"}</p>
                {"\n                        "}
                <h2 id={"about-heading"}>
                  {"About "}
                  <span>{"ETCF"}</span>
                </h2>
                {"\n                    "}
              </header>
              {"\n                    "}
              <div className={"about-story"}>
                {"\n                        "}
                <p className={"about-lead"}>
                  {
                    "Edmonton Tamil Catholic Family (ETCF) is a Tamil-speaking Catholic community in Edmonton, Alberta, Canada. We joyfully celebrate our Catholic faith and the rich heritage of the Tamil language."
                  }
                </p>
                {"\n                        "}
                <p>
                  {
                    "Most of our members hail from India, Sri Lanka, and Singapore, all united by our shared\n                            Tamil-speaking background. Each month, we gather to celebrate the Holy Mass in Tamil,\n                            embracing our spiritual roots and cultural identity. Through the beauty of our Tamil\n                            prayers, hymns, and liturgy, we deepen our relationship with Jesus Christ and each other.\n                        "
                  }
                </p>
                {"\n                    "}
              </div>
              {"\n                "}
            </div>
            {"\n                "}
            <figure className={"about-identity"}>
              {"\n                    "}
              <div className={"about-emblem"}>
                {"\n                        "}
                <img
                  src={"src/assets/logo.png"}
                  alt={"Edmonton Tamil Catholic Family emblem"}
                  loading={"lazy"}
                  decoding={"async"}
                  width={"926"}
                  height={"906"}
                />
                {"\n                    "}
              </div>
              {"\n                    "}
              <figcaption>{"Edmonton Tamil Catholic Family"}</figcaption>
              {"\n                "}
            </figure>
            {"\n            "}
          </div>
          {"\n            "}
          <div className={"about-church"}>
            {"\n                "}
            <div className={"about-church-icon"}>
              <svg
                viewBox={"0 0 24 24"}
                fill={"none"}
                stroke={"currentColor"}
                strokeWidth={"1.5"}
                strokeLinecap={"round"}
                strokeLinejoin={"round"}
                aria-hidden={"true"}
              >
                {"\n                        "}
                <path
                  d={
                    "M12 2v5M10 4h4M4 21V11l8-5 8 5v10ZM10 21v-6h4v6M7 12v2M17 12v2"
                  }
                ></path>
                {"\n                    "}
              </svg>
            </div>
            {"\n                "}
            <div>
              {"\n                    "}
              <h3>{"Rooted in the Church"}</h3>
              {"\n                    "}
              <p>
                {
                  "We are truly blessed to have the approval of the Catholic Archdiocese of Edmonton, allowing us to\n                        celebrate the Holy Mass in Tamil on the second Saturday of every month at St. Theresa's Catholic\n                        Church, Edmonton, AB."
                }
              </p>
              {"\n                "}
            </div>
            {"\n            "}
          </div>
          {"\n        "}
          <div className="community-visitor" aria-labelledby="visitor-heading">
            <h3 id="visitor-heading">
              Tamil Mass in Edmonton: plan your visit
            </h3>
            <details className="community-question">
              <summary>
                Where can I attend Tamil Catholic Mass in Edmonton?
              </summary>
              <p>
                ETCF gathers for Tamil Holy Mass at St. Theresa’s Catholic
                Church, 7508 29 Avenue NW, Edmonton, Alberta T6K 3Y8. Check our{" "}
                <a href="#event-section">upcoming event details</a> for the
                confirmed date, time and registration information before
                travelling. You can also find parish information on the{" "}
                <a href="https://sttheresa.caedm.ca/contact/">
                  St. Theresa Parish website
                </a>
                .
              </p>
            </details>
            <details className="community-question">
              <summary>How can I connect if I am new to Edmonton?</summary>
              <p>
                <a href="#contact">Contact the ETCF committee</a> to learn about
                Tamil Mass, community gatherings and ways to take part. Whether
                you are new to Edmonton or visiting from elsewhere in Canada,
                our committee can help you plan your visit.
              </p>
            </details>
            <details className="community-question">
              <summary>
                Are there Catholic resources for Tamil families across Canada?
              </summary>
              <p>
                Our <a href="kids-resources.html">Kids Corner</a> offers Bible
                games, prayers and family faith activities that you can use
                online wherever you live in Canada. Kids Corner is currently in
                beta; parents and children can explore the activities together.{" "}
                Our{" "}
                <a href="tamil-catholics-canada.html">
                  guide for Tamil Catholics in Canada
                </a>{" "}
                also links to official parish and diocese information.
              </p>
            </details>
          </div>
        </div>
        {"\n    "}
      </section>
    </>
  );
}
