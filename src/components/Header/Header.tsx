"use client";

import Link from "next/link";
import { BrandLockup } from "./BrandLockup";
import { NAV_LINKS, QUOTE_LINK } from "./nav";
import { SidebarMenu } from "./SidebarMenu";
import { useMobileMenu } from "./useMobileMenu";

export function Header() {
  const { isOpen, open, close, sidebarId } = useMobileMenu();

  return (
    <header className="fixed inset-x-0 top-0 z-50 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 border-b border-white/10 bg-[#07111c]/25 backdrop-blur-sm"
      />

      <div className="flex h-19 items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="min-w-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2ad9c3]"
        >
          <BrandLockup />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/85 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2ad9c3]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={QUOTE_LINK.href}
            className="rounded-full bg-[#2ad9c3] px-5 py-2.5 text-sm font-semibold text-[#062018] transition-colors hover:bg-[#5ee8d4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {QUOTE_LINK.label}
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2ad9c3] lg:hidden"
          aria-expanded={isOpen}
          aria-controls={sidebarId}
          aria-label="Open menu"
          onClick={open}
        >
          <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
            <path
              d="M4 7h16M4 12h16M4 17h16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <SidebarMenu
        id={sidebarId}
        isOpen={isOpen}
        onClose={close}
        links={NAV_LINKS}
      ></SidebarMenu>
    </header>
  );
}
