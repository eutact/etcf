import { useEffect, useRef } from "react";
import initializeCustomCursor from "../../src/js/custom-cursor";

export default function CustomCursor() {
  const cursor = useRef(null);

  useEffect(() => initializeCustomCursor(cursor.current), []);

  return (
    <div
      ref={cursor}
      className="etcf-cursor"
      aria-hidden="true"
      data-visible="false"
    >
      <div className="etcf-cursor-follow">
        <span className="etcf-cursor-ring" />
      </div>
      <div className="etcf-cursor-point">
        <span className="etcf-cursor-dot" />
        <span className="etcf-cursor-pulse" />
      </div>
      <span className="etcf-cursor-caption" />
    </div>
  );
}
