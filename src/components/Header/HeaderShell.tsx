"use client";

import type { ReactNode } from "react";
import { useHeaderScroll } from "@/src/hooks/useHeaderScroll";

type HeaderShellProps = {
  children: ReactNode;
};

export function HeaderShell({ children }: HeaderShellProps) {
  const { atTop, hidden } = useHeaderScroll();

  return (
    <header
      data-hidden={hidden || undefined}
      className={`fixed inset-x-0 top-0 z-50 text-white transition-[background-color,border-color,backdrop-filter,translate] duration-300 ease-out focus-within:translate-none motion-reduce:transition-none ${
        hidden ? "-translate-y-full" : "translate-none"
      } ${
        atTop
          ? "border-b border-transparent bg-transparent"
          : "border-b border-white/10 bg-[#07111c]/85 backdrop-blur-md"
      }`}
    >
      {children}
    </header>
  );
}
