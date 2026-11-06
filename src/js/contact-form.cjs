// The Formspree endpoint remains the delivery service. Motion reflects actual
// request state; it never delays submission or invents delivery progress.
function initializeContactForm() {
  const form = document.getElementById("my-form");
  if (!form) return;
  const section = form.closest("#contact");
  const button = form.querySelector('[type="submit"]');
  const label = button.querySelector(".contact-send-label");
  const fields = form.querySelector("fieldset");
  const status = form.querySelector(".contact-status-text");
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  let sending = false;
  let visible = false;

  const updateMotion = () => {
    section.dataset.contactMotion =
      visible && !document.hidden && !preference.matches ? "running" : "paused";
  };
  if (typeof window.IntersectionObserver === "function") {
    new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      updateMotion();
    }).observe(section);
  }
  preference.addEventListener("change", updateMotion);
  document.addEventListener("visibilitychange", updateMotion);
  window.addEventListener("pagehide", () => {
    section.dataset.contactMotion = "paused";
  });
  window.addEventListener("pageshow", updateMotion);
  updateMotion();

  const setState = (
    state,
    message = "We’ll reply to the email address you provide.",
  ) => {
    form.dataset.state = state;
    form.setAttribute("aria-busy", String(state === "sending"));
    button.disabled = state === "sending";
    fields.disabled = state === "sending";
    label.textContent = {
      idle: "Send message",
      sending: "Sending…",
      success: "Message sent",
      error: "Try again",
    }[state];
    status.textContent = message;
  };
  form.addEventListener("input", () => {
    if (!sending && form.dataset.state !== "idle") setState("idle");
  });
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (sending || !form.reportValidity()) return;
    sending = true;
    const restoreFocus =
      event.submitter === button || form.contains(document.activeElement);
    const body = new FormData(form);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    setState("sending", "Sending your message. Please keep this page open.");
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body,
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });
      if (response.ok) {
        form.reset();
        setState(
          "success",
          "Thank you! Your message has been sent. Our team will contact you shortly.",
        );
      } else {
        setState(
          "error",
          "Your message could not be sent. Your details are still in the form. Please try again.",
        );
      }
    } catch {
      setState(
        "error",
        "We couldn’t confirm delivery. Your details are still in the form. Please try again later or email info@edmontontamilcatholics.ca.",
      );
    } finally {
      window.clearTimeout(timeout);
      sending = false;
      if (
        restoreFocus &&
        [document.body, button].includes(document.activeElement)
      ) {
        button.focus({ preventScroll: true });
      }
    }
  });
}

module.exports = initializeContactForm;
