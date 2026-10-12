"use client";

import { useEffect, useState } from "react";
import type { DesktopSlides, Project, SliderBreakpoints } from "./config/project";
import { ProjectCard } from "./ProjectCard";

const AUTOPLAY_MS = 4500;
const TRANSITION_MS = 600;

type ProjectSliderProps = {
  projects: Project[];
  slidesPerView?: DesktopSlides;
  breakpoints?: SliderBreakpoints;
};

const DEFAULT_BREAKPOINTS: SliderBreakpoints = {
  mobile: 1,
  tablet: 2,
};

export function ProjectSlider({
  projects,
  slidesPerView = 4,
  breakpoints = DEFAULT_BREAKPOINTS,
}: ProjectSliderProps) {
  const count = projects.length;
  const slides = [...projects, ...projects, ...projects];
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

  function onTransitionEnd(event: React.TransitionEvent<HTMLDivElement>) {
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

  const sizes = `(max-width: 767px) ${Math.round(100 / Math.max(1, breakpoints.mobile))}vw, (max-width: 1023px) ${Math.round(100 / Math.max(1, breakpoints.tablet))}vw, ${Math.round(100 / slidesPerView)}vw`;
  const activeDot = ((index % count) + count) % count;

  return (
    <div
      className="mt-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="overflow-hidden" aria-roledescription="carousel" aria-label="Completed projects">
        <div
          className="flex"
          onTransitionEnd={onTransitionEnd}
          style={{
            width: `${(slides.length / visible) * 100}%`,
            transform: `translateX(-${index * (100 / slides.length)}%)`,
            transition: animate && !reduced ? `transform ${TRANSITION_MS}ms ease` : "none",
          }}
        >
          {slides.map((project, slideIndex) => (
            <div
              key={`${project.id}-${slideIndex}`}
              className="shrink-0"
              style={{ width: `${100 / slides.length}%` }}
              aria-hidden={slideIndex < index || slideIndex >= index + visible}
            >
              <ProjectCard project={project} sizes={sizes} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {projects.map((project, dot) => {
          const selected = dot === activeDot;
          return (
            <button
              key={project.id}
              type="button"
              aria-label={`Show ${project.title}`}
              aria-current={selected ? "true" : undefined}
              onClick={() => goTo(dot)}
              className={`size-2 rounded-full transition-colors ${
                selected ? "bg-[#2ad9c3]" : "bg-[#c5ced6] hover:bg-[#8ea0aa]"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
