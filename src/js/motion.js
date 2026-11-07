import initializeButtonMotion from "./button-motion";

// Animate only as content enters the viewport. No CSS hides pending content,
// so unsupported browsers, slow hydration and interrupted effects stay readable.
const targets = [
  ".page-hero .site-shell",
  "#home + section > div",
  "section h2",
  ".community-header",
  ".committee-header",
  ".annual-header",
  ".annual-month-nav",
  "#event-card",
  ".about-story",
  ".about-identity",
  ".about-church",
  ".vision-panel",
  ".mission-panel",
  ".committee-person",
  ".committee-history",
  ".premium-card",
  ".kids-card",
  ".kids-activity-card",
  ".kids-choice-card",
  ".kids-beta-notice",
  ".gallery-card",
  ".legal-content > div > div",
  "#my-form",
  "#newsletter-form form",
  ".site-footer-grid > div",
  ".brand-hero-copy",
  ".brand-hero-art",
  ".brand-story-card",
  ".brand-logo-card",
  ".brand-swatch",
  ".brand-rule-card",
  ".brand-colour-note",
  ".brand-contact .site-shell",
  ".game-topbar",
].join(", ");

export default function initializeMotion() {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const supported =
    typeof window.IntersectionObserver === "function" &&
    typeof Element.prototype.animate === "function";
  const seen = new WeakSet();
  const active = new Map();
  let observer;
  let mutations;

  const finishActive = () => {
    active.forEach((animation) => animation.cancel());
    active.clear();
  };

  const cancel = () => {
    observer?.disconnect();
    mutations?.disconnect();
    finishActive();
  };

  const configure = () => {
    cancel();
    document.documentElement.dataset.siteMotion = preference.matches
      ? "reduced"
      : supported
        ? "ready"
        : "unsupported";
    if (preference.matches || !supported) return;

    observer = new IntersectionObserver(
      (entries) => {
        const groups = new Map();
        for (const { target, isIntersecting } of entries) {
          if (!isIntersecting || document.hidden) continue;
          observer.unobserve(target);
          if (seen.has(target)) continue;
          seen.add(target);
          target.dataset.motionState = "entered";
          // Keyboard users should never wait for the control they just focused.
          if (target.contains(document.activeElement)) continue;
          const heading = target.matches(
            "h2, .community-header, .committee-header, .annual-header, .page-hero .site-shell",
          );
          const order = groups.get(target.parentElement) || 0;
          groups.set(target.parentElement, order + 1);
          try {
            const animation = target.animate(
              [
                { opacity: 0, transform: `translateY(${heading ? 14 : 20}px)` },
                { opacity: 1, transform: "translateY(0)" },
              ],
              {
                duration: heading ? 560 : 640,
                delay: Math.min(order, 3) * 70,
                easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                fill: "backwards",
              },
            );
            active.set(target, animation);
            animation.finished
              .catch(() => {})
              .finally(() => {
                if (active.get(target) === animation) active.delete(target);
              });
          } catch {
            // An unavailable animation engine must never hide or block content.
          }
        }
      },
      { threshold: 0, rootMargin: "0px 0px -40px 0px" },
    );

    const visit = (root, callback) => {
      if (!(root instanceof Element)) return;
      if (root.matches(targets)) callback(root);
      root.querySelectorAll(targets).forEach(callback);
    };
    const observe = (target) => {
      // Avoid animating the same content twice through nested wrappers.
      if (!seen.has(target) && !target.parentElement?.closest(targets)) {
        observer.observe(target);
      }
    };
    visit(document.body, observe);
    mutations = new MutationObserver((records) => {
      for (const record of records) {
        record.removedNodes.forEach((node) =>
          visit(node, (target) => {
            observer.unobserve(target);
            active.get(target)?.cancel();
            active.delete(target);
          }),
        );
        record.addedNodes.forEach((node) => visit(node, observe));
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });
  };

  const engage = (element) => {
    if (!(element instanceof Element)) return;
    for (
      let target = element.closest(`${targets}, .kids-stage`);
      target;
      target = target.parentElement?.closest(`${targets}, .kids-stage`)
    ) {
      seen.add(target);
      observer?.unobserve(target);
      target.dataset.motionState = "entered";
      active.get(target)?.cancel();
      active.delete(target);
      // Includes the existing game-screen entrance, without touching card flips.
      target.getAnimations?.().forEach((animation) => animation.cancel());
    }
  };
  const revealFocus = (event) => engage(event.target);
  const visibilityChanged = () => {
    if (document.hidden) finishActive();
  };
  configure();
  const cleanupButtons = initializeButtonMotion(preference, engage);
  preference.addEventListener("change", configure);
  document.addEventListener("focusin", revealFocus);
  document.addEventListener("visibilitychange", visibilityChanged);
  window.addEventListener("pagehide", finishActive);
  return () => {
    cleanupButtons();
    cancel();
    preference.removeEventListener("change", configure);
    document.removeEventListener("focusin", revealFocus);
    document.removeEventListener("visibilitychange", visibilityChanged);
    window.removeEventListener("pagehide", finishActive);
    delete document.documentElement.dataset.siteMotion;
  };
}
