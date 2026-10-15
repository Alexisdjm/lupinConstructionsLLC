"use client";

import Link from "next/link";
import { scrollToSection } from "@/src/components/Header/sectionScroll";

type FooterLink = { href: string; label: string };

export function FooterLinks({ links }: { links: FooterLink[] }) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">
      {links.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          scroll={item.href.includes("#") ? false : undefined}
          onClick={(event) => scrollToSection(event, item.href)}
          className="text-sm text-white/75 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2ad9c3]"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
