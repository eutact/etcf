export default function NewsletterSection() {
  return (
    <>
      <section
        id={"newsletter-form"}
        className={"bg-primary text-white py-16 fade-in"}
      >
        {"\n        "}
        <div className={"container mx-auto px-4 text-center"}>
          {"\n            "}
          <h2 className={"text-3xl font-bold"}>
            {"Edmonton Tamil Catholic Newsletter"}
          </h2>
          {"\n            "}
          <p className={"mt-4"}>{"Subscribe to our monthly newsletter"}</p>
          {"\n            "}
          <form
            id={"subscription-form"}
            action={"https://eo6pu70ge5jyfty.m.pipedream.net"}
            method={"POST"}
            className={"mt-6 max-w-md mx-auto flex"}
          >
            {"\n                "}
            <input
              type={"email"}
              name={"email"}
              autoComplete={"email"}
              aria-label={"Email address for the ETCF newsletter"}
              className={
                "w-full px-4 py-2 rounded-l text-primary focus:outline-none focus:ring-2 focus:ring-yellow-500"
              }
              placeholder={"Enter your email"}
              required
            />
            {"\n                "}
            <button
              type={"submit"}
              className={
                "px-6 py-2 bg-yellow-500 text-black font-bold rounded-r hover:bg-yellow-600"
              }
            >
              {"\n                    Subscribe\n                "}
            </button>
            {"\n            "}
          </form>
          {"\n            "}
          {"\n            "}
          <div
            id={"response-message"}
            className={
              "hidden mt-4 text-lg font-semibold p-4 rounded-lg border"
            }
          ></div>
          {"\n        "}
        </div>
        {"\n    "}
      </section>
    </>
  );
}
