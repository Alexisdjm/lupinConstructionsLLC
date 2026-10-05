"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { BrandLockup } from "./BrandLockup";
import { QUOTE_LINK, type NavLink } from "./nav";

type SidebarMenuProps = {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  links: readonly NavLink[];
};

export function SidebarMenu({ id, isOpen, onClose, links }: SidebarMenuProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-black/60 transition-opacity duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        id={id}
        role="dialog"
        aria-modal={isOpen}
        aria-label="Site menu"
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={`fixed inset-y-0 left-0 z-[70] flex w-[min(20rem,85vw)] flex-col bg-[#07111c] shadow-2xl transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
          <Link href="/" onClick={onClose} className="min-w-0">
            <BrandLockup />
          </Link>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
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

        <nav className="flex flex-1 flex-col px-3 py-4" aria-label="Mobile">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="rounded-lg px-3 py-3 text-base font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2ad9c3]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-white/10 p-5">
          <Link
            href={QUOTE_LINK.href}
            onClick={onClose}
            className="inline-flex w-full items-center justify-center rounded-full bg-[#2ad9c3] px-5 py-3 text-sm font-semibold text-[#062018] transition-colors hover:bg-[#5ee8d4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {QUOTE_LINK.label}
          </Link>
        </div>
      </aside>
    </>
  );
}
