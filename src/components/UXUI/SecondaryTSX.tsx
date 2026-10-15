"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { scrollToSection } from "@/src/components/Header/sectionScroll";

type SecondaryCTAProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export function SecondaryCTA({
  href,
  children,
  className = "",
  external = false,
  onClick,
}: SecondaryCTAProps) {
  const classes = `inline-flex items-center gap-2 rounded-[12px] border border-white/35 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${className}`;
  const sectionLink = !external && href.includes("#");

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (sectionLink) scrollToSection(event, href);
  }

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={classes}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      scroll={sectionLink ? false : undefined}
      className={classes}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
