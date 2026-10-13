"use client";

import Link from "next/link";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { PrimaryCTA } from "@/src/components/UXUI/PrimaryCTA";
import type { Locale } from "@/src/i18n/locales";
import { BrandLockup } from "./BrandLockup";
import { LanguageSwitch } from "./LanguageSwitch";
import { useSidebar } from "@/src/hooks/useSidebar";

type SidebarLink = { href: string; label: string };

// The drawer is portaled to <body>: the header uses backdrop-filter and
// translate, and both turn it into the containing block of fixed children.
const noopSubscribe = () => () => {};
const useIsClient = () =>
  useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

type SidebarProps = {
  region: string;
  openMenu: string;
  closeMenu: string;
  siteMenu: string;
  mobileNav: string;
  links: SidebarLink[];
  quote: SidebarLink;
  homeHref: string;
  locale: Locale;
  language: string;
  switchAria: string;
};

export function Sidebar({
  region,
  openMenu,
  closeMenu,
  siteMenu,
  mobileNav,
  links,
  quote,
  homeHref,
  locale,
  language,
  switchAria,
}: SidebarProps) {
  const { isOpen, open, close, sidebarId } = useSidebar();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isClient = useIsClient();

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  const drawer = (
    <>
      <div
        className={`fixed inset-0 z-60 bg-black/60 transition-opacity duration-400 ease-cubic-bezier-0.4-0-0.2-1 motion-reduce:transition-none ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={close}
        aria-hidden="true"
      />
      <aside
        id={sidebarId}
        role="dialog"
        aria-modal={isOpen}
        aria-label={siteMenu}
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={`fixed inset-y-0 left-0 z-70 flex w-[min(20rem,85vw)] flex-col bg-[#07111c] shadow-2xl transition-transform duration-400 ease-cubic-bezier-0.4-0-0.2-1 motion-reduce:transition-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
          <Link href={homeHref} onClick={close} className="min-w-0">
            <BrandLockup region={region} />
          </Link>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={close}
            aria-label={closeMenu}
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2ad9c3]"
          >
            <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav className="flex flex-1 flex-col px-3 py-4" aria-label={mobileNav}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              className="rounded-lg px-3 py-3 text-base font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2ad9c3]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-white/10 p-5">
          <div className="flex items-center gap-2 rounded-[16px] border border-white/15 bg-white/8 p-1">
            <LanguageSwitch locale={locale} label={language} switchAria={switchAria} />
            <PrimaryCTA
              hoverColor="#C4FCFA"
              href={quote.href}
              onClick={close}
              className="min-w-0 flex-1 justify-center"
            >
              {quote.label}
            </PrimaryCTA>
          </div>
        </div>
      </aside>
    </>
  );

  return (
    <>
      <button
        type="button"
        className="inline-flex size-11 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2ad9c3] lg:hidden"
        aria-expanded={isOpen}
        aria-controls={sidebarId}
        aria-label={openMenu}
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
      {isClient ? createPortal(drawer, document.body) : null}
    </>
  );
}
