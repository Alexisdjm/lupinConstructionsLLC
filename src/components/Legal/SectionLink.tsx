"use client";

import type { MouseEvent, ReactNode } from "react";

export function SectionLink({ id, className, children }: { id: string; className?: string; children: ReactNode }) {
  function scrollToSection(event: MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const target = document.getElementById(id);
    if (!target) return;

    event.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    history.pushState(null, "", `#${id}`);
  }

  return (
    <a href={`#${id}`} onClick={scrollToSection} className={className}>
      {children}
    </a>
  );
}
