"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { scrollToSection } from "./sectionScroll";

type HeaderLink = { href: string; label: string };
type Spot = { x: number; y: number; phase: "enter" | "on" | "off" };

function measure(list: HTMLElement, link: HTMLElement) {
  const listBox = list.getBoundingClientRect();
  const linkBox = link.getBoundingClientRect();
  return {
    x: linkBox.left - listBox.left + linkBox.width / 2,
    y: linkBox.bottom - listBox.top + 6,
  };
}

export function HeaderNav({ links }: { links: HeaderLink[] }) {
  const listRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLElement | null>(null);
  const [spot, setSpot] = useState<Spot | null>(null);

  function moveTo(link: HTMLElement) {
    const list = listRef.current;
    if (!list) return;
    activeRef.current = link;
    const next = measure(list, link);
    setSpot((current) =>
      current && current.phase !== "off"
        ? { ...next, phase: "on" }
        : { ...next, phase: "enter" },
    );
  }

  function hide() {
    activeRef.current = null;
    setSpot((current) => (current ? { ...current, phase: "off" } : current));
  }

  useEffect(() => {
    if (spot?.phase !== "enter") return;
    const frame = requestAnimationFrame(() => {
      setSpot((current) =>
        current?.phase === "enter" ? { ...current, phase: "on" } : current,
      );
    });
    return () => cancelAnimationFrame(frame);
  }, [spot]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const observer = new ResizeObserver(() => {
      const link = activeRef.current;
      if (!link) return;
      const next = measure(list, link);
      setSpot((current) =>
        current?.phase === "on" ? { ...next, phase: "on" } : current,
      );
    });
    observer.observe(list);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={listRef}
      className="relative flex items-center gap-8"
      onMouseLeave={() => {
        const list = listRef.current;
        const active = document.activeElement;
        if (list && active instanceof HTMLElement && list.contains(active)) {
          moveTo(active);
          return;
        }
        hide();
      }}
      onBlur={(event) => {
        if (
          event.relatedTarget instanceof Node &&
          event.currentTarget.contains(event.relatedTarget)
        ) {
          return;
        }
        if (listRef.current?.matches(":hover")) return;
        hide();
      }}
    >
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          scroll={false}
          onClick={(event) => scrollToSection(event, link.href)}
          onMouseEnter={(event) => moveTo(event.currentTarget)}
          onFocus={(event) => moveTo(event.currentTarget)}
          className="group text-sm font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2ad9c3]"
        >
          <span className="opacity-85 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
            {link.label}
          </span>
        </Link>
      ))}
      {spot ? (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute size-1.5 -translate-x-1/2 rounded-full bg-[#2ad9c3] transition-[left,top,opacity] duration-500 ease-out motion-reduce:transition-none ${
            spot.phase === "on" ? "opacity-100" : "opacity-0"
          }`}
          style={{ left: spot.x, top: spot.y }}
        />
      ) : null}
    </div>
  );
}
