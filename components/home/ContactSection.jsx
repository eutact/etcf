import ContactFeedback from "./ContactFeedback";

export default function ContactSection() {
  return (
    <section id="contact" className="contact-section py-16 fade-in">
      <div className="contact-ambience" aria-hidden="true" />
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl font-bold text-white text-center">
          Contact <span className="text-yellow-300">Us</span>
        </h2>
        <p className="text-lg text-center text-white mt-4">
          We’d love to hear from you.
          <br />
          Please reach out with any questions, feedback, or inquiries.
        </p>
        <form
          id="my-form"
          action="https://formspree.io/f/xeoeeypo"
          method="post"
          className="contact-form mt-8 max-w-xl mx-auto"
          data-state="idle"
          aria-busy="false"
        >
          <fieldset className="contact-fields">
            <legend className="sr-only">
              Your contact details and message
            </legend>
            <div className="contact-field">
              <label htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                type="text"
                name="text"
                autoComplete="name"
                required
              />
            </div>
            <div className="contact-field">
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                type="email"
                name="email"
                autoComplete="email"
                required
              />
            </div>
            <div className="contact-field">
              <label htmlFor="contact-message">Message</label>
              <textarea id="contact-message" name="message" rows={4} required />
            </div>
          </fieldset>
          <button type="submit" id="my-form-button" className="contact-send">
            <span className="contact-send-label">Send message</span>
            <span className="contact-send-icons" aria-hidden="true">
              <svg
                className="contact-plane"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m21 3-7 18-4-7-7-4L21 3Z" />
                <path d="m10 14 5-5" />
              </svg>
              <span className="contact-spinner" />
              <svg
                className="contact-check"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m5 12 4 4L19 6" />
              </svg>
            </span>
          </button>
          <ContactFeedback />
        </form>
      </div>
    </section>
  );
}
