"use client";

import { useEffect, useState, type TransitionEvent } from "react";
import type { DesktopSlides, SliderBreakpoints } from "@/src/components/Projects/config/project";

const AUTOPLAY_MS = 4500;
const TRANSITION_MS = 600;

type UseProjectSliderOptions = {
  count: number;
  slidesPerView: DesktopSlides;
  breakpoints: SliderBreakpoints;
};

export function useProjectSlider({ count, slidesPerView, breakpoints }: UseProjectSliderOptions) {
  const [index, setIndex] = useState(count);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState<number>(slidesPerView);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)");
    const tablet = window.matchMedia("(min-width: 768px) and (max-width: 1023px)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function sync() {
      const next = mobile.matches
        ? breakpoints.mobile
        : tablet.matches
          ? breakpoints.tablet
          : slidesPerView;
      setVisible(Math.min(Math.max(1, next), count));
      setReduced(motion.matches);
    }

    const frame = requestAnimationFrame(sync);
    mobile.addEventListener("change", sync);
    tablet.addEventListener("change", sync);
    motion.addEventListener("change", sync);
    return () => {
      cancelAnimationFrame(frame);
      mobile.removeEventListener("change", sync);
      tablet.removeEventListener("change", sync);
      motion.removeEventListener("change", sync);
    };
  }, [breakpoints.mobile, breakpoints.tablet, count, slidesPerView]);

  useEffect(() => {
    if (paused || reduced || count === 0) return;
    const timer = window.setTimeout(() => {
      setIndex((current) => current + 1);
    }, AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [count, index, paused, reduced]);

  useEffect(() => {
    if (animate) return;
    const frame = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(frame);
  }, [animate]);

  function onTransitionEnd(event: TransitionEvent<HTMLDivElement>) {
    if (event.propertyName !== "transform" || event.target !== event.currentTarget) return;
    if (index >= count * 2) {
      setAnimate(false);
      setIndex(index - count);
    } else if (index < count) {
      setAnimate(false);
      setIndex(index + count);
    }
  }

  function goTo(dot: number) {
    setAnimate(!reduced);
    setIndex(count + dot);
  }

  function step(direction: -1 | 1) {
    setAnimate(!reduced);
    setIndex((current) => {
      const next = current + direction;
      if (!reduced) return next;
      return count + (((next % count) + count) % count);
    });
  }

  const sizes = `(max-width: 767px) ${Math.round(100 / Math.max(1, breakpoints.mobile))}vw, (max-width: 1023px) ${Math.round(100 / Math.max(1, breakpoints.tablet))}vw, ${Math.round(100 / slidesPerView)}vw`;
  const activeDot = ((index % count) + count) % count;

  return {
    index,
    visible,
    animate,
    reduced,
    activeDot,
    duration: TRANSITION_MS,
    sizes,
    onTransitionEnd,
    goTo,
    previous: () => step(-1),
    next: () => step(1),
    pause: () => setPaused(true),
    resume: () => setPaused(false),
  };
}
