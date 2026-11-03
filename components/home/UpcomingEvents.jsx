export default function UpcomingEvents() {
  return (
    <>
      <section id={"event-section"} className={"section-frame px-6"}>
        {"\n        "}
        <div className={"relative z-10 text-center"}>
          {"\n            "}
          <h2 className={"text-3xl md:text-4xl font-bold text-white"}>
            {"Upcoming "}
            <span className={"text-yellow-300"}>{"Events"}</span>
          </h2>
          {"\n            "}
          <p className={"text-center text-lg text-gray-200 mt-3 mb-10"}>
            {
              "Join us for meaningful gatherings and celebrations.\n            "
            }
          </p>
          {"\n        "}
        </div>
        {"\n\n        "}
        <div
          id={"event-card"}
          className={
            "event-card premium-card bg-white mx-auto p-6 md:p-8 flex flex-col items-center md:flex-row gap-8"
          }
        >
          {"\n            "}
          {"\n            "}
          <div className={"w-full md:w-1/2 flex justify-center"}>
            {"\n                "}
            <div className={"event-poster-frame"}>
              {"\n                    "}
              <img
                id={"event-image"}
                src={"images/events/willupdate.png"}
                alt={"Upcoming Event Poster"}
              />
              {"\n                "}
            </div>
            {"\n            "}
          </div>
          {"\n\n            "}
          {"\n            "}
          <div
            className={
              "flex flex-col justify-center md:w-1/2 text-center md:text-left"
            }
          >
            {"\n                "}
            <div id={"event-details"}>
              {"\n                    "}
              <span className={"event-date-pill"}>
                <i className={"far fa-calendar-alt"} aria-hidden={"true"}></i>
                <span id={"event-date"}></span>
              </span>
              {"\n                    "}
              <h3 className={"mt-4 text-3xl font-bold text-gray-800"}>
                <span id={"event-title"}></span>
              </h3>
              {"\n                    "}
              <h4 className={"mt-2 text-xl font-bold text-primary"}>
                <span id={"event-subtitle"}></span>
              </h4>
              {"\n                    "}
              <p className={"mt-4 text-lg text-gray-600 italic"}>
                <span id={"event-description"}></span>
              </p>
              {"\n\n                    "}
              <div className={"event-meta-grid"}>
                {"\n                        "}
                <div>
                  {"\n                            "}
                  <strong className={"block text-primary"}>{"Time"}</strong>
                  {"\n                            "}
                  <span id={"event-time"}></span>
                  {"\n                        "}
                </div>
                {"\n                        "}
                <div>
                  {"\n                            "}
                  <strong className={"block text-primary"}>{"Venue"}</strong>
                  {"\n                            "}
                  <span id={"event-venue"}></span>
                  {"\n                        "}
                </div>
                {"\n                    "}
              </div>
              {"\n                "}
            </div>
            {"\n\n                "}
            <div
              id={"event-empty"}
              className={"event-empty-state hidden text-left"}
            >
              {"\n                    "}
              <h3 className={"text-2xl font-bold text-primary"}>
                {"Next event details coming soon"}
              </h3>
              {"\n                    "}
              <p className={"mt-3 text-gray-700"} data-empty-message>
                {
                  "The committee will publish the next confirmed\n                        Tamil Mass details here."
                }
              </p>
              {"\n                "}
            </div>
            {"\n\n                "}
            <div
              className={"event-actions mt-5 grid w-full gap-3 sm:grid-cols-2"}
            >
              {"\n                    "}
              <a
                id={"register-link"}
                className={"premium-button px-5 py-3"}
                target={"_blank"}
                rel={"noopener noreferrer"}
              >
                {"Register for Mass"}
              </a>
              {"\n\n                    "}
              <button
                id={"reminder-button"}
                type={"button"}
                className={"ghost-button bg-primary px-5 py-3 text-white"}
                onClick={() => window.setReminder?.()}
              >
                {"\n                        Set Reminder\n                    "}
              </button>
              {"\n                "}
            </div>
            {"\n\n            "}
          </div>
          {"\n        "}
        </div>
        {"\n    "}
      </section>
    </>
  );
}
