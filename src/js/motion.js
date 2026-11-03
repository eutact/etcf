// Animate only as content enters the viewport. No CSS hides pending content,
// so unsupported browsers, slow hydration and interrupted effects stay readable.
const targets = [
  ".page-hero .site-shell",
  "#home + section > div",
  "section h2",
  ".community-header",
  ".committee-header",
  ".annual-header",
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
  ".gallery-card",
  ".legal-content > div",
  "#my-form",
  "#newsletter-form form",
  "footer > .container > div",
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

  const cancel = () => {
    observer?.disconnect();
    mutations?.disconnect();
    active.forEach((animation) => animation.cancel());
    active.clear();
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
        let order = 0;
        for (const { target, isIntersecting } of entries) {
          if (!isIntersecting) continue;
          observer.unobserve(target);
          if (seen.has(target)) continue;
          seen.add(target);
          target.dataset.motionState = "entered";
          // Keyboard users should never wait for the control they just focused.
          if (target.contains(document.activeElement)) continue;
          const animation = target.animate(
            [
              { opacity: 0, transform: "translateY(14px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            {
              duration: 480,
              delay: Math.min(order++, 3) * 55,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              fill: "backwards",
            },
          );
          active.set(target, animation);
          animation.finished
            .catch(() => {})
            .finally(() => active.delete(target));
        }
      },
      { threshold: 0, rootMargin: "0px 0px -24px 0px" },
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

  const revealFocus = (event) => {
    active.forEach((animation, target) => {
      if (target.contains(event.target)) animation.cancel();
    });
  };
  configure();
  preference.addEventListener("change", configure);
  document.addEventListener("focusin", revealFocus);
  return () => {
    cancel();
    preference.removeEventListener("change", configure);
    document.removeEventListener("focusin", revealFocus);
    delete document.documentElement.dataset.siteMotion;
  };
}
