"use client";

import { useEffect, useState } from "react";

type HeaderScrollState = {
  /** True while the page is scrolled to the very top. */
  atTop: boolean;
  /** True while the header should slide out of view (scrolling down). */
  hidden: boolean;
};

type Options = {
  /** Distance from the top before the header is allowed to hide. */
  offset?: number;
  /** Minimum scroll delta (px) needed to flip direction; filters out jitter. */
  threshold?: number;
};

/**
 * Tracks scroll position so a fixed header can stay visible at the top,
 * hide while the user scrolls down, and reappear as soon as they scroll up.
 */
export function useHeaderScroll({ offset = 80, threshold = 6 }: Options = {}): HeaderScrollState {
  const [state, setState] = useState<HeaderScrollState>({ atTop: true, hidden: false });

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    function sync() {
      frame = 0;
      const y = Math.max(window.scrollY, 0);
      const delta = y - lastY;

      setState((current) => {
        const atTop = y === 0;
        let hidden = current.hidden;

        if (y <= offset) {
          hidden = false;
        } else if (delta > threshold) {
          hidden = true;
        } else if (delta < -threshold) {
          hidden = false;
        }

        if (Math.abs(delta) > threshold || atTop) lastY = y;

        return atTop === current.atTop && hidden === current.hidden
          ? current
          : { atTop, hidden };
      });
    }

    function onScroll() {
      if (frame === 0) frame = requestAnimationFrame(sync);
    }

    frame = requestAnimationFrame(sync);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (frame !== 0) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [offset, threshold]);

  return state;
}
