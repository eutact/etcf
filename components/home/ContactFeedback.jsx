export default function ContactFeedback() {
  return (
    <div
      id="contact-status"
      className="contact-status"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <p className="contact-status-text">
        We’ll reply to the email address you provide.
      </p>
    </div>
  );
}
