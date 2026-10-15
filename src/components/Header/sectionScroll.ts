import type { MouseEvent } from "react";

const PENDING_SECTION = "lupin-pending-section";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function smoothScrollTo(target: HTMLElement) {
  target.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
}

function sectionFromHref(href: string) {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) return null;
  const id = decodeURIComponent(href.slice(hashIndex + 1));
  if (!id) return null;
  return { id, path: href.slice(0, hashIndex) || "/" };
}

function rememberSection(href: string) {
  try {
    sessionStorage.setItem(PENDING_SECTION, href);
  } catch {
    // Storage can be blocked. The link still navigates.
  }
}

function forgetSection() {
  try {
    sessionStorage.removeItem(PENDING_SECTION);
  } catch {
    // Nothing left to clean up.
  }
}

/** Scroll when the section is already on the page. Otherwise remember it for the next page. */
export function scrollToSection(event: MouseEvent<HTMLAnchorElement>, href: string) {
  if (
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }

  const section = sectionFromHref(href);
  if (!section) return;

  const target = document.getElementById(section.id);
  if (!target) {
    rememberSection(href);
    return;
  }

  event.preventDefault();
  smoothScrollTo(target);
  const nextUrl = `${section.path}#${section.id}`;
  if (`${window.location.pathname}${window.location.hash}` !== nextUrl) {
    history.pushState(null, "", nextUrl);
  }
}

export type PendingSection = "done" | "wait" | "skip";

/** Finish a header click that had to change pages before the section existed. */
export function consumePendingSection(pathname: string): PendingSection {
  let stored: string | null = null;
  try {
    stored = sessionStorage.getItem(PENDING_SECTION);
  } catch {
    return "skip";
  }
  if (!stored) return "skip";

  const section = sectionFromHref(stored);
  if (!section || section.path !== pathname) return "skip";

  const target = document.getElementById(section.id);
  if (!target) return "wait";

  forgetSection();
  smoothScrollTo(target);
  return "done";
}

export function dropPendingSection() {
  forgetSection();
}
