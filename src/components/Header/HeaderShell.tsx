"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, type ReactNode } from "react";
import { useHeaderScroll } from "@/src/hooks/useHeaderScroll";
import { consumePendingSection, dropPendingSection } from "./sectionScroll";

type HeaderShellProps = {
  children: ReactNode;
};

export function HeaderShell({ children }: HeaderShellProps) {
  const { atTop, hidden } = useHeaderScroll();
  const pathname = usePathname();

  useLayoutEffect(() => {
    let frame = 0;
    let tries = 0;

    function attempt() {
      const pending = consumePendingSection(pathname);
      if (pending !== "wait" || tries >= 12) {
        if (pending === "wait") dropPendingSection();
        return;
      }
      tries += 1;
      frame = requestAnimationFrame(attempt);
    }

    attempt();
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

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
