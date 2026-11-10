const actions =
  'a[href], button, summary, [role="button"], [role="tab"], [role="link"], [draggable="true"], [data-cursor-label]';
const cards =
  ".premium-card, .committee-person, .about-identity, .vision-panel, .mission-points li, .brand-story-card, .brand-logo-card, .brand-rule-card, .brand-swatch, .registration-milestone, .registration-source, .social-video-card, .social-feed-card, .kids-card, .kids-choice-card, .kids-activity-card, .legal-card, article";
const native =
  'input, textarea, select, option, iframe, video, audio, [contenteditable]:not([contenteditable="false"]), [data-cursor="native"], dialog[open]';

function describe(target) {
  if (!(target instanceof Element) || target.closest(native)) return null;
  const action = target.closest(actions);
  if (target.closest('[inert], [aria-disabled="true"], :disabled')) return null;
  if (action) {
    if (action.dataset.cursorLabel)
      return { mode: "action", label: action.dataset.cursorLabel.slice(0, 18) };
    if (action.closest(".gallery-card"))
      return { mode: "media", label: "View" };
    if (action.matches('[draggable="true"]'))
      return { mode: "action", label: "Drag" };
    if (action.matches("a[download]"))
      return { mode: "action", label: "Download" };
    const href = action.getAttribute("href") || "";
    if (href.startsWith("mailto:")) return { mode: "link", label: "Email ↗" };
    if (href.startsWith("tel:")) return { mode: "link", label: "Call ↗" };
    const text = `${action.getAttribute("aria-label") || ""} ${action.textContent || ""}`;
    if (/^(?:\s*)(?:load .*player|watch|play\b)/i.test(text))
      return { mode: "media", label: "Play" };
    if (/\bcopy\b/i.test(text)) return { mode: "action", label: "Copy" };
    if (action.matches('[role="tab"]'))
      return { mode: "action", label: "Choose" };
    if (action.matches('button[type="submit"]'))
      return { mode: "action", label: "Send" };
    if (action.matches("summary"))
      return {
        mode: "action",
        label: action.parentElement.open ? "Close" : "Explore",
      };
    return {
      mode: action.matches("a[href], [role=link]") ? "link" : "action",
      label: action.matches('a[target="_blank"]') ? "Visit ↗" : "",
    };
  }
  return { mode: target.closest(cards) ? "card" : "default", label: "" };
}

export default function initializeCustomCursor(layer) {
  if (
    !layer ||
    typeof window.matchMedia !== "function" ||
    !window.requestAnimationFrame
  )
    return;
  const root = document.documentElement;
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const contrast = window.matchMedia("(forced-colors: active)");
  const point = layer.querySelector(".etcf-cursor-point");
  const follow = layer.querySelector(".etcf-cursor-follow");
  const caption = layer.querySelector(".etcf-cursor-caption");
  const pulse = layer.querySelector(".etcf-cursor-pulse");
  const listeners = [];
  let enabled = false;
  let visible = false;
  let selecting = false;
  let dragging = false;
  let position;
  let follower;
  let frame = 0;
  let previousTime = 0;
  let pulseAnimation;

  const cancelFrame = () => {
    window.cancelAnimationFrame(frame);
    frame = 0;
    previousTime = 0;
    layer.dataset.moving = "false";
  };
  const hide = () => {
    visible = false;
    layer.dataset.visible = "false";
    layer.dataset.pressed = "false";
    delete root.dataset.customCursor;
    cancelFrame();
    pulseAnimation?.cancel();
  };
  const modeFor = (target) => {
    const state = describe(target);
    if (!state) {
      hide();
      return false;
    }
    if (layer.dataset.mode !== state.mode) layer.dataset.mode = state.mode;
    if (caption.textContent !== state.label) caption.textContent = state.label;
    layer.dataset.caption = state.label ? "true" : "false";
    return true;
  };
  const transform = (element, x, y) => {
    element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };
  const paintFollower = () => transform(follow, follower.x, follower.y);
  const tick = (time) => {
    frame = 0;
    if (visible === false) return;
    // Time-based easing feels the same at 60Hz and 120Hz. Stop completely at rest.
    const elapsed = previousTime ? Math.min(time - previousTime, 40) : 16.7;
    previousTime = time;
    const amount = 1 - Math.exp(-elapsed / 48);
    follower.x += (position.x - follower.x) * amount;
    follower.y += (position.y - follower.y) * amount;
    paintFollower();
    if (Math.hypot(position.x - follower.x, position.y - follower.y) > 0.08) {
      frame = window.requestAnimationFrame(tick);
    } else {
      follower = { ...position };
      paintFollower();
      previousTime = 0;
      layer.dataset.moving = "false";
    }
  };
  const show = (event) => {
    if (
      !enabled ||
      event.pointerType !== "mouse" ||
      document.hidden ||
      document.fullscreenElement ||
      dragging
    ) {
      hide();
      return;
    }
    if (selecting && event.buttons) {
      hide();
      return;
    }
    selecting = false;
    if (!modeFor(event.target)) return;
    position = { x: event.clientX, y: event.clientY };
    transform(point, position.x, position.y);
    const left = position.x > window.innerWidth - 150;
    layer.dataset.side = left ? "left" : "right";
    transform(
      caption,
      position.x + (left ? -24 : 24),
      Math.max(22, Math.min(window.innerHeight - 22, position.y)),
    );
    if (visible === false) {
      follower = { ...position };
      paintFollower();
      visible = true;
      layer.dataset.visible = "true";
      root.dataset.customCursor = "active";
    }
    if (!frame) {
      layer.dataset.moving = "true";
      frame = window.requestAnimationFrame(tick);
    }
  };
  const on = (target, name, handler, capture = false) => {
    const options = { passive: true, capture };
    target.addEventListener(name, handler, options);
    listeners.push(() => target.removeEventListener(name, handler, options));
  };
  const configure = () => {
    enabled = fine.matches && !reduced.matches && !contrast.matches;
    hide();
    layer.dataset.enabled = String(enabled);
  };

  on(document, "pointermove", show, true);
  on(document, "pointerover", show, true);
  on(
    document,
    "pointerdown",
    (event) => {
      if (event.pointerType !== "mouse" || event.button !== 0) {
        hide();
        return;
      }
      // Preserve drag-to-select text and all native form controls.
      if (
        event.target instanceof Element &&
        !event.target.closest(actions) &&
        event.target.closest("p, h1, h2, h3, h4, blockquote, li, dd, dt")
      ) {
        selecting = true;
        hide();
        return;
      }
      show(event);
      if (visible === false) return;
      layer.dataset.pressed = "true";
      pulseAnimation?.cancel();
      if (typeof pulse.animate === "function") {
        try {
          pulseAnimation = pulse.animate(
            [
              { opacity: 0.7, transform: "translate(-50%, -50%) scale(.4)" },
              { opacity: 0, transform: "translate(-50%, -50%) scale(1.8)" },
            ],
            { duration: 420, easing: "cubic-bezier(.22,1,.36,1)" },
          );
        } catch {
          /* A decorative effect must never interrupt a click. */
        }
      }
    },
    true,
  );
  on(
    document,
    "pointerup",
    () => {
      selecting = false;
      layer.dataset.pressed = "false";
    },
    true,
  );
  on(document, "pointercancel", hide, true);
  on(
    document,
    "pointerout",
    (event) => {
      if (!event.relatedTarget) hide();
    },
    true,
  );
  on(document, "keydown", hide, true);
  on(document, "contextmenu", hide, true);
  on(
    document,
    "dragstart",
    () => {
      dragging = true;
      hide();
    },
    true,
  );
  on(
    document,
    "dragend",
    () => {
      dragging = false;
      hide();
    },
    true,
  );
  on(document, "visibilitychange", hide);
  on(document, "fullscreenchange", hide);
  on(window, "blur", () => {
    dragging = false;
    selecting = false;
    hide();
  });
  on(window, "pagehide", hide);
  on(window, "resize", hide);
  // Scrolling may put a different component under a stationary pointer.
  on(
    document,
    "scroll",
    () => {
      if (visible && position)
        modeFor(document.elementFromPoint(position.x, position.y));
    },
    true,
  );
  [fine, reduced, contrast].forEach((query) => {
    query.addEventListener("change", configure);
    listeners.push(() => query.removeEventListener("change", configure));
  });
  configure();
  return () => {
    hide();
    listeners.forEach((remove) => remove());
  };
}
