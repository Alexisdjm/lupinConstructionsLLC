"use client";

import type { DesktopSlides, Project, SliderBreakpoints } from "./config/project";
import { ProjectCard } from "./ProjectCard";
import { useProjectSlider } from "@/src/hooks/useProjectSlider";

type ProjectSliderProps = {
  projects: Project[];
  slidesPerView?: DesktopSlides;
  breakpoints?: SliderBreakpoints;
  labels: { carousel: string; show: string; previous: string; next: string };
};

const DEFAULT_BREAKPOINTS: SliderBreakpoints = {
  mobile: 1,
  tablet: 2,
};

export function ProjectSlider({
  projects,
  slidesPerView = 4,
  breakpoints = DEFAULT_BREAKPOINTS,
  labels,
}: ProjectSliderProps) {
  const count = projects.length;
  const slides = [...projects, ...projects, ...projects];
  const slider = useProjectSlider({ count, slidesPerView, breakpoints });

  return (
    <div
      className="mt-10"
      onMouseEnter={slider.pause}
      onMouseLeave={slider.resume}
      onFocus={slider.pause}
      onBlur={slider.resume}
    >
      <div className="relative">
        <div className="overflow-hidden" aria-roledescription="carousel" aria-label={labels.carousel}>
          <div
            className="flex"
            onTransitionEnd={slider.onTransitionEnd}
            style={{
              width: `${(slides.length / slider.visible) * 100}%`,
              transform: `translateX(-${slider.index * (100 / slides.length)}%)`,
              transition: slider.animate && !slider.reduced ? `transform ${slider.duration}ms ease` : "none",
            }}
          >
            {slides.map((project, slideIndex) => (
              <div
                key={`${project.id}-${slideIndex}`}
                className="shrink-0"
                style={{ width: `${100 / slides.length}%` }}
                aria-hidden={slideIndex < slider.index || slideIndex >= slider.index + slider.visible}
              >
                <ProjectCard project={project} sizes={slider.sizes} />
              </div>
            ))}
          </div>
        </div>

        <SliderArrow label={labels.previous} direction="previous" onClick={slider.previous} />
        <SliderArrow label={labels.next} direction="next" onClick={slider.next} />
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {projects.map((project, dot) => {
          const selected = dot === slider.activeDot;
          return (
            <button
              key={project.id}
              type="button"
              aria-label={labels.show.replace("{title}", project.title)}
              aria-current={selected ? "true" : undefined}
              onClick={() => slider.goTo(dot)}
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

function SliderArrow({
  label,
  direction,
  onClick,
}: {
  label: string;
  direction: "previous" | "next";
  onClick: () => void;
}) {
  const side = direction === "previous" ? "left-3 sm:left-5" : "right-3 sm:right-5";
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`absolute top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-[#102433] shadow-[0_8px_24px_rgba(16,24,40,0.06)] backdrop-blur-[2px] transition-[background-color,box-shadow] duration-300 ease-out hover:bg-white/35 hover:shadow-[0_8px_24px_rgba(16,24,40,0.16)] motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2ad9c3] sm:size-12 ${side}`}
    >
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
        <path
          d={direction === "previous" ? "M14 6 8 12l6 6" : "M10 6l6 6-6 6"}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
