const controls = [
  "button",
  "a.premium-button",
  "a.ghost-button",
  "a.kids-button",
  ".annual-month-tab",
  ".history-summary",
  '[role="button"]',
].join(", ");

export default function initializeButtonMotion(preference, engage) {
  const held = new Map();
  const pointers = new Map();
  const keys = new Map();
  const listeners = [];

  const controlFor = (target) => {
    const control = target instanceof Element ? target.closest(controls) : null;
    if (
      !control ||
      control.matches(":disabled") ||
      control.closest('[inert], [aria-disabled="true"]') ||
      (control.tagName === "A" && !control.hasAttribute("href"))
    )
      return null;
    return control;
  };

  const clear = (control) => {
    const record = held.get(control);
    if (!record) return;
    window.clearTimeout(record.timer);
    control.removeAttribute("data-motion-pressed");
    held.delete(control);
  };

  const reset = () => {
    held.forEach((_, control) => clear(control));
    pointers.clear();
    keys.clear();
  };

  const begin = (control, source) => {
    if (preference.matches) return;
    engage(control);
    let record = held.get(control);
    if (!record) {
      record = { since: performance.now(), sources: new Set(), timer: 0 };
      held.set(control, record);
    }
    window.clearTimeout(record.timer);
    record.sources.add(source);
    control.setAttribute("data-motion-pressed", "true");
  };

  const release = (control, source, immediate = false) => {
    const record = held.get(control);
    if (!record) return;
    record.sources.delete(source);
    if (record.sources.size) return;
    window.clearTimeout(record.timer);
    // A quick tap gets visible feedback without delaying its native action.
    const remaining = immediate
      ? 0
      : Math.max(0, 110 - (performance.now() - record.since));
    if (!remaining) clear(control);
    else record.timer = window.setTimeout(() => clear(control), remaining);
  };

  const on = (target, type, handler) => {
    const options = { capture: target !== window, passive: true };
    target.addEventListener(type, handler, options);
    listeners.push(() => target.removeEventListener(type, handler, options));
  };

  const releasePointer = (event, immediate = false) => {
    const control = pointers.get(event.pointerId);
    if (!control) return;
    pointers.delete(event.pointerId);
    release(control, `pointer:${event.pointerId}`, immediate);
  };

  on(document, "pointerdown", (event) => {
    if (event.button !== 0 || event.isPrimary === false || preference.matches)
      return;
    const control = controlFor(event.target);
    if (!control) return;
    releasePointer(event, true);
    pointers.set(event.pointerId, control);
    begin(control, `pointer:${event.pointerId}`);
  });
  on(document, "pointerup", (event) => releasePointer(event));
  on(document, "pointercancel", (event) => releasePointer(event, true));
  on(document, "lostpointercapture", (event) => releasePointer(event, true));
  on(document, "pointerout", (event) => {
    const control = pointers.get(event.pointerId);
    if (control && !control.contains(event.relatedTarget))
      releasePointer(event, true);
  });

  on(document, "keydown", (event) => {
    if (
      event.repeat ||
      !["Enter", " "].includes(event.key) ||
      preference.matches
    )
      return;
    const control = controlFor(event.target);
    if (!control) return;
    if (
      event.key === " " &&
      control.tagName === "A" &&
      !["button", "tab"].includes(control.getAttribute("role"))
    )
      return;
    const previous = keys.get(event.key);
    if (previous) release(previous, `key:${event.key}`, true);
    keys.set(event.key, control);
    begin(control, `key:${event.key}`);
  });
  on(document, "keyup", (event) => {
    const control = keys.get(event.key);
    if (!control) return;
    keys.delete(event.key);
    release(control, `key:${event.key}`);
  });
  on(document, "focusout", (event) => {
    keys.forEach((control, key) => {
      if (
        control.contains(event.target) &&
        !control.contains(event.relatedTarget)
      ) {
        keys.delete(key);
        release(control, `key:${key}`, true);
      }
    });
  });
  on(document, "click", (event) => {
    const control = controlFor(event.target);
    if (!control || held.has(control) || preference.matches) return;
    // Covers assistive-technology activation as well as pointer/keyboard clicks.
    begin(control, "activation");
    release(control, "activation");
  });

  on(window, "blur", reset);
  on(window, "pagehide", reset);
  on(document, "visibilitychange", () => {
    if (document.hidden) reset();
  });
  const updatePreference = () => {
    if (preference.matches) reset();
  };
  preference.addEventListener("change", updatePreference);
  return () => {
    reset();
    listeners.forEach((remove) => remove());
    preference.removeEventListener("change", updatePreference);
  };
}
