export default function ContactSection() {
  return (
    <>
      <section id={"contact"} className={"bg-secondary py-16 fade-in"}>
        {"\n        "}
        {"\n        "}
        <div
          className={
            "absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-20"
          }
        ></div>
        {"\n\n        "}
        <div className={"container mx-auto px-6 relative z-10"}>
          {"\n            "}
          {"\n            "}
          <h2
            className={
              "text-4xl font-bold text-white text-center animate__animated animate__fadeIn"
            }
          >
            {"\n                Contact "}
            <span className={"text-yellow-300"}>{"Us"}</span>
            {"\n            "}
          </h2>
          {"\n            "}
          <p className={"text-lg text-center text-white mt-4"}>
            {"We’d love to hear from you. "}
            <br />
            {
              " Please reach out with any\n                questions,\n                feedback, or inquiries."
            }
          </p>
          {"\n\n            "}
          {"\n            "}
          <form
            id={"my-form"}
            action={"https://formspree.io/f/xeoeeypo"}
            method={"post"}
            className={
              "mt-8 max-w-xl mx-auto space-y-8 bg-white p-8 rounded-xl shadow-xl transform transition duration-500 hover:scale-105 hover:shadow-lg"
            }
          >
            {"\n                "}
            <div className={"space-y-4"}>
              {"\n                    "}
              {"\n                    "}
              <div>
                {"\n                        "}
                <label
                  htmlFor={"contact-name"}
                  className={"block text-lg font-semibold text-gray-700"}
                >
                  {"Name"}
                </label>
                {"\n                        "}
                <input
                  id={"contact-name"}
                  type={"text"}
                  name={"text"}
                  autoComplete={"name"}
                  className={
                    "w-full px-6 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 ease-in-out"
                  }
                />
                {"\n                    "}
              </div>
              {"\n\n                    "}
              {"\n                    "}
              <div>
                {"\n                        "}
                <label
                  htmlFor={"contact-email"}
                  className={"block text-lg font-semibold text-gray-700"}
                >
                  {"Email"}
                </label>
                {"\n                        "}
                <input
                  id={"contact-email"}
                  type={"email"}
                  name={"email"}
                  autoComplete={"email"}
                  className={
                    "w-full px-6 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 ease-in-out"
                  }
                />
                {"\n                    "}
              </div>
              {"\n\n                    "}
              {"\n                    "}
              <div>
                {"\n                        "}
                <label
                  htmlFor={"contact-message"}
                  className={"block text-lg font-semibold text-gray-700"}
                >
                  {"Message"}
                </label>
                {"\n                        "}
                <textarea
                  id={"contact-message"}
                  name={"message"}
                  className={
                    "w-full px-6 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 ease-in-out"
                  }
                ></textarea>
                {"\n                    "}
              </div>
              {"\n                "}
            </div>
            {"\n\n                "}
            {"\n                "}
            <button
              type={"submit"}
              id={"my-form-button"}
              className={
                "w-full px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-secondary hover:scale-105 transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              }
            >
              {"\n                    Submit\n                "}
            </button>
            {"\n            "}
          </form>
          {"\n        "}
        </div>
        {"\n    "}
      </section>
    </>
  );
}
