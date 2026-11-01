import SiteNavigation from "../site/SiteNavigation";
import { KidsResourcesFooter } from "../site/SiteFooters";

export default function KidsResourcesPage() {
  return (
    <>
      {" "}
      {"\n    "}
      <SiteNavigation />
      {"\n\n    "}
      <header className={"page-hero"}>
        {"\n        "}
        <div
          className={
            "site-shell grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center"
          }
        >
          {"\n            "}
          <div>
            {"\n                "}
            <span
              className={
                "section-kicker text-white bg-white/10 border-white/20"
              }
            >
              {"Family Faith Formation"}
            </span>
            {"\n                "}
            <h1 className={"mt-5"}>{"ETCF Kids Corner"}</h1>
            {"\n                "}
            <p className={"kids-hero-message"}>
              {"Learn, Play & Pray Together"}
            </p>
            {"\n                "}
            <p className={"mt-4 max-w-2xl text-lg text-white/85"}>
              {
                "\n                    Little moments of faith for children and families—discover Bible stories, play together, and bring\n                    God’s love into everyday life.\n                "
              }
            </p>
            {"\n            "}
          </div>
          {"\n            "}
          <div className={"kids-card p-8 text-center"}>
            {"\n                "}
            <img
              src={"src/assets/logo-rounded.png"}
              alt={"ETCF Logo"}
              className={"mx-auto h-28 w-auto mb-4"}
            />
            {"\n                "}
            <p className={"text-lg font-semibold text-primary"}>
              {"Learn, play, and grow in faith."}
            </p>
            {"\n            "}
          </div>
          {"\n        "}
        </div>
        {"\n    "}
      </header>
      {"\n\n    "}
      <main className={"section-frame"}>
        {"\n        "}
        <div className={"site-shell relative z-10"}>
          {"\n            "}
          <section
            id={"kids-activities"}
            className={"kids-play"}
            aria-label={"Play and learn together"}
          >
            {"\n                "}
            <span className={"section-kicker"}>
              {"Made for families · Ages 5–10"}
            </span>
            {"\n                "}
            <div data-kids-launcher>
              {"\n                    "}
              <p>{"Our family activities are getting ready."}</p>
              {"\n                "}
            </div>
            {"\n                "}
            <noscript>
              <p>
                {"Please enable JavaScript to play the activities. "}
                <a href={"kids-play.html"}>{"Open the game chooser"}</a>
                {". The resource library below is still available."}
              </p>
            </noscript>
            {"\n            "}
          </section>
          {"\n\n            "}
          <h2 className={"kids-library-title"}>{"More for your family"}</h2>
          {"\n            "}
          <p className={"kids-library-intro"}>
            {"Keep exploring with our collection of free and paid resources."}
          </p>
          {"\n            "}
          <div
            className={"mb-10 flex flex-wrap justify-center gap-4"}
            role={"tablist"}
            aria-label={"Kids resource types"}
          >
            {"\n                "}
            <button
              id={"tab-free"}
              type={"button"}
              className={"tab premium-button px-6 py-2"}
              role={"tab"}
              aria-selected={"true"}
              aria-controls={"free-section"}
            >
              {"Free Resources"}
            </button>
            {"\n                "}
            <button
              id={"tab-paid"}
              type={"button"}
              className={
                "tab px-6 py-2 bg-white text-primary font-semibold rounded-lg border border-primary"
              }
              role={"tab"}
              aria-selected={"false"}
              aria-controls={"paid-section"}
            >
              {"Paid Resources"}
            </button>
            {"\n            "}
          </div>
          {"\n\n            "}
          <div
            id={"free-section"}
            className={"space-y-12"}
            role={"tabpanel"}
            aria-labelledby={"tab-free"}
          >
            {"\n                "}
            <section className={"kids-card p-6"}>
              {"\n                    "}
              <div className={"flex items-center gap-3 mb-4"}>
                {"\n                        "}
                <i
                  className={"fas fa-calendar-day text-primary text-2xl"}
                  aria-hidden={"true"}
                ></i>
                {"\n                        "}
                <h2 className={"text-2xl font-bold text-primary"}>
                  {"A Prayer for Our Family"}
                </h2>
                {"\n                    "}
              </div>
              {"\n                    "}
              <p
                id={"familyPrayer"}
                className={"text-gray-700 leading-relaxed"}
              ></p>
              {"\n                "}
            </section>
            {"\n\n                "}
            <section>
              {"\n                    "}
              <div className={"mb-5"}>
                {"\n                        "}
                <span className={"section-kicker"}>{"Stories & Language"}</span>
                {"\n                        "}
                <h2 className={"mt-4 text-3xl font-extrabold text-primary"}>
                  {"Bible Stories"}
                </h2>
                {"\n                    "}
              </div>
              {"\n                    "}
              <div className={"grid grid-cols-1 md:grid-cols-3 gap-6"}>
                {"\n                        "}
                <article className={"kids-card overflow-hidden"}>
                  {"\n                            "}
                  <div
                    className={
                      "flex aspect-video items-center justify-center bg-gradient-to-br from-primary to-secondary text-white"
                    }
                  >
                    {"\n                                "}
                    <i
                      className={"fas fa-play-circle text-5xl"}
                      aria-hidden={"true"}
                    ></i>
                    {"\n                            "}
                  </div>
                  {"\n                            "}
                  <div className={"p-5"}>
                    {"\n                                "}
                    <h3 className={"font-bold text-lg text-primary mb-2"}>
                      {"Explore Bible Stories"}
                    </h3>
                    {"\n                                "}
                    <p className={"text-gray-600 mb-4"}>
                      {
                        "Build the Nativity story together, one scene at a time."
                      }
                    </p>
                    {"\n                                "}
                    <a
                      href={"#kids-activities"}
                      data-kids-start={"order"}
                      data-kids-unit={"birth"}
                      className={"resource-link"}
                    >
                      {"\n                                    "}
                      <i
                        className={"fas fa-play-circle mr-2"}
                        aria-hidden={"true"}
                      ></i>
                      {
                        "Order the Christmas story\n                                "
                      }
                    </a>
                    {"\n                            "}
                  </div>
                  {"\n                        "}
                </article>
                {"\n\n                        "}
                <article className={"kids-card p-6"}>
                  {"\n                            "}
                  <h3 className={"font-bold text-lg text-primary mb-4"}>
                    {"Featured Stories"}
                  </h3>
                  {"\n                            "}
                  <ul className={"space-y-3"}>
                    {"\n                                "}
                    <li className={"flex items-center gap-3"}>
                      <i
                        className={"fas fa-ship text-primary"}
                        aria-hidden={"true"}
                      ></i>
                      <a
                        href={"#kids-activities"}
                        data-kids-start={"match"}
                        data-kids-unit={"characters"}
                        className={"resource-link text-left"}
                      >
                        {"Meet Noah in Match & Discover"}
                      </a>
                    </li>
                    {"\n                                "}
                    <li className={"flex items-center gap-3"}>
                      <i
                        className={"fas fa-gift text-primary"}
                        aria-hidden={"true"}
                      ></i>
                      <a
                        href={"#kids-activities"}
                        data-kids-start={"order"}
                        data-kids-unit={"birth"}
                        className={"resource-link text-left"}
                      >
                        {"The Christmas Story"}
                      </a>
                      {"\n                                "}
                    </li>
                    {"\n                                "}
                    <li className={"flex items-center gap-3"}>
                      <i
                        className={"fas fa-shield-alt text-primary"}
                        aria-hidden={"true"}
                      ></i>
                      <span className={"kids-unavailable"}>
                        {"David & Goliath "}
                        <small>{"Coming later"}</small>
                      </span>
                      {"\n                                "}
                    </li>
                    {"\n                            "}
                  </ul>
                  {"\n                        "}
                </article>
                {"\n\n                        "}
                <article className={"kids-card p-6"}>
                  {"\n                            "}
                  <h3 className={"font-bold text-lg text-primary mb-4"}>
                    {"Tamil Resources"}
                  </h3>
                  {"\n                            "}
                  <ul className={"space-y-4"}>
                    {"\n                                "}
                    <li className={"flex items-start gap-3"}>
                      {"\n                                    "}
                      <i
                        className={"fas fa-language text-primary mt-1"}
                        aria-hidden={"true"}
                      ></i>
                      {"\n                                    "}
                      <div>
                        {"\n                                        "}
                        <span className={"kids-unavailable"}>
                          {"Tamil Bible Stories "}
                          <small>{"Coming later"}</small>
                        </span>
                        {"\n                                    "}
                      </div>
                      {"\n                                "}
                    </li>
                    {"\n                                "}
                    <li className={"flex items-start gap-3"}>
                      {"\n                                    "}
                      <i
                        className={"fas fa-praying-hands text-primary mt-1"}
                        aria-hidden={"true"}
                      ></i>
                      {"\n                                    "}
                      <div>
                        {"\n                                        "}
                        <span className={"kids-unavailable"}>
                          {"Tamil Catholic Prayers "}
                          <small>{"Coming later"}</small>
                        </span>
                        {"\n                                    "}
                      </div>
                      {"\n                                "}
                    </li>
                    {"\n                            "}
                  </ul>
                  {"\n                        "}
                </article>
                {"\n                    "}
              </div>
              {"\n                "}
            </section>
            {"\n\n                "}
            <section>
              {"\n                    "}
              <div className={"mb-5"}>
                {"\n                        "}
                <span className={"section-kicker"}>{"Prayer Life"}</span>
                {"\n                        "}
                <h2 className={"mt-4 text-3xl font-extrabold text-primary"}>
                  {"Audio & Prayers"}
                </h2>
                {"\n                    "}
              </div>
              {"\n                    "}
              <div className={"grid grid-cols-1 md:grid-cols-2 gap-6"}>
                {"\n                        "}
                <article className={"kids-card p-6"}>
                  {"\n                            "}
                  <div className={"flex items-center gap-3 mb-3"}>
                    {"\n                                "}
                    <i
                      className={"fas fa-podcast text-primary text-2xl"}
                      aria-hidden={"true"}
                    ></i>
                    {"\n                                "}
                    <h3 className={"text-lg font-bold text-primary"}>
                      {"Catholic Sprouts Podcast"}
                    </h3>
                    {"\n                            "}
                  </div>
                  {"\n                            "}
                  <p className={"text-gray-600 mb-4"}>
                    {
                      "Short, 5-minute episodes for kids with Bible stories and\n                                saints."
                    }
                  </p>
                  {"\n                            "}
                  <a
                    href={"https://catholicsprouts.com/podcast"}
                    target={"_blank"}
                    rel={"noopener noreferrer"}
                    className={"resource-link"}
                  >
                    {"\n                                "}
                    <i
                      className={"fas fa-headphones mr-2"}
                      aria-hidden={"true"}
                    ></i>
                    {"Listen Now\n                            "}
                  </a>
                  {"\n                        "}
                </article>
                {"\n                    "}
              </div>
              {"\n                "}
            </section>
            {"\n\n                "}
            <section>
              {"\n                    "}
              <div className={"mb-5"}>
                {"\n                        "}
                <span className={"section-kicker"}>{"Hands-On Faith"}</span>
                {"\n                        "}
                <h2 className={"mt-4 text-3xl font-extrabold text-primary"}>
                  {"Printables & Crafts"}
                </h2>
                {"\n                    "}
              </div>
              {"\n                    "}
              <div className={"grid grid-cols-1 md:grid-cols-3 gap-6"}>
                {"\n                        "}
                <article className={"kids-card p-6"}>
                  {"\n                            "}
                  <h3 className={"text-lg font-bold text-primary mb-3"}>
                    {"Sunday Gospel Activities"}
                  </h3>
                  {"\n                            "}
                  <p className={"text-gray-600 mb-4"}>
                    {
                      "Coloring pages, puzzles, and worksheets for Mass readings.\n                            "
                    }
                  </p>
                  {"\n                            "}
                  <a
                    href={"https://www.catholicmom.com/sunday-mass-activities"}
                    target={"_blank"}
                    rel={"noopener noreferrer"}
                    className={"resource-link"}
                  >
                    {"Download"}
                  </a>
                  {"\n                        "}
                </article>
                {"\n                        "}
                <article className={"kids-card p-6"}>
                  {"\n                            "}
                  <h3 className={"text-lg font-bold text-primary mb-3"}>
                    {"Catholic Icing Crafts"}
                  </h3>
                  {"\n                            "}
                  <p className={"text-gray-600 mb-4"}>
                    {"Creative project ideas and tutorials for kids."}
                  </p>
                  {"\n                            "}
                  <a
                    href={"https://www.catholicicing.com"}
                    target={"_blank"}
                    rel={"noopener noreferrer"}
                    className={"resource-link"}
                  >
                    {"Visit Site"}
                  </a>
                  {"\n                        "}
                </article>
                {"\n                        "}
                <article className={"kids-card p-6"}>
                  {"\n                            "}
                  <h3 className={"text-lg font-bold text-primary mb-3"}>
                    {"Loyola Press Activities"}
                  </h3>
                  {"\n                            "}
                  <p className={"text-gray-600 mb-4"}>
                    {"Family games and faith-building exercises."}
                  </p>
                  {"\n                            "}
                  <a
                    href={
                      "https://www.loyolapress.com/catholic-resources/family/catholic-kids"
                    }
                    target={"_blank"}
                    rel={"noopener noreferrer"}
                    className={"resource-link"}
                  >
                    {"Visit Site"}
                  </a>
                  {"\n                        "}
                </article>
                {"\n                    "}
              </div>
              {"\n                "}
            </section>
            {"\n\n                "}
            <section>
              {"\n                    "}
              <div className={"mb-5"}>
                {"\n                        "}
                <span className={"section-kicker"}>{"Play & Learn"}</span>
                {"\n                        "}
                <h2 className={"mt-4 text-3xl font-extrabold text-primary"}>
                  {"Interactive Games & Apps"}
                </h2>
                {"\n                    "}
              </div>
              {"\n                    "}
              <div className={"grid grid-cols-1 md:grid-cols-2 gap-6"}>
                {"\n                        "}
                <article className={"kids-card p-6"}>
                  {"\n                            "}
                  <h3 className={"text-lg font-bold text-primary mb-3"}>
                    {"Superbook Kids"}
                  </h3>
                  {"\n                            "}
                  <p className={"text-gray-600 mb-4"}>
                    {"Online Bible games and interactive adventures."}
                  </p>
                  {"\n                            "}
                  <a
                    href={"https://superbook.cbn.com/"}
                    target={"_blank"}
                    rel={"noopener noreferrer"}
                    className={"resource-link"}
                  >
                    {"Play Now"}
                  </a>
                  {"\n                        "}
                </article>
                {"\n                        "}
                <article className={"kids-card p-6"}>
                  {"\n                            "}
                  <h3 className={"text-lg font-bold text-primary mb-3"}>
                    {"Bible App for Kids"}
                  </h3>
                  {"\n                            "}
                  <p className={"text-gray-600 mb-4"}>
                    {"Free interactive Bible stories app."}
                  </p>
                  {"\n                            "}
                  <a
                    href={"https://www.bible.com/kids"}
                    target={"_blank"}
                    rel={"noopener noreferrer"}
                    className={"resource-link"}
                  >
                    {"Download App"}
                  </a>
                  {"\n                        "}
                </article>
                {"\n                    "}
              </div>
              {"\n                "}
            </section>
            {"\n            "}
          </div>
          {"\n\n            "}
          <section
            id={"paid-section"}
            className={"hidden"}
            role={"tabpanel"}
            aria-labelledby={"tab-paid"}
          >
            {"\n                "}
            <div className={"kids-card p-6"}>
              {"\n                    "}
              <div className={"flex items-center gap-3 mb-4"}>
                {"\n                        "}
                <i
                  className={"fas fa-lock text-primary text-2xl"}
                  aria-hidden={"true"}
                ></i>
                {"\n                        "}
                <h2 className={"text-2xl font-bold text-primary"}>
                  {"Paid Resources"}
                </h2>
                {"\n                    "}
              </div>
              {"\n                    "}
              <ul className={"list-disc list-inside space-y-3 text-gray-800"}>
                {"\n                        "}
                <li>
                  {"\n                            "}
                  <a
                    href={"https://www.gominno.com"}
                    target={"_blank"}
                    rel={"noopener noreferrer"}
                    className={"resource-link"}
                  >
                    {"Minno Kids"}
                  </a>
                  {
                    " - subscription Christian videos and shows.\n                        "
                  }
                </li>
                {"\n                        "}
                <li>
                  {"\n                            "}
                  <a
                    href={"https://watch.formed.org/kids"}
                    target={"_blank"}
                    rel={"noopener noreferrer"}
                    className={"resource-link"}
                  >
                    {"FORMED Kids"}
                  </a>
                  {
                    " - Catholic cartoons and audio, requires\n                            subscription.\n                        "
                  }
                </li>
                {"\n                    "}
              </ul>
              {"\n                "}
            </div>
            {"\n            "}
          </section>
          {"\n        "}
        </div>
        {"\n    "}
      </main>
      {"\n\n    "}
      <button
        id={"back-to-top"}
        type={"button"}
        className={"hidden fixed bottom-6 right-6 premium-button p-3 shadow-lg"}
        aria-label={"Back to top"}
      >
        {"\n        "}
        <i className={"fas fa-arrow-up"} aria-hidden={"true"}></i>
        {"\n    "}
      </button>
      {"\n\n    "}
      <KidsResourcesFooter />
      {"\n"}{" "}
    </>
  );
}
