"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type AnimationEvent as ReactAnimationEvent } from "react";

type Phase = "idle" | "rise" | "hold";

type Destination = {
  href: string;
  pathname: string;
};

export function PageTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const routerRef = useRef(router);
  const phaseRef = useRef<Phase>("idle");
  const pending = useRef<Destination | null>(null);
  const safety = useRef(0);
  const [phase, setPhase] = useState<Phase>("idle");

  routerRef.current = router;
  phaseRef.current = phase;

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (phaseRef.current !== "idle") return;
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!anchor || anchor.target && anchor.target !== "_self" || anchor.hasAttribute("download")) return;

      let url: URL;
      try {
        url = new URL(anchor.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;

      event.preventDefault();
      pending.current = {
        href: `${url.pathname}${url.search}${url.hash}`,
        pathname: url.pathname,
      };
      window.clearTimeout(safety.current);
      safety.current = window.setTimeout(() => {
        pending.current = null;
        setPhase("idle");
      }, 15000);
      setPhase("rise");
    }

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.clearTimeout(safety.current);
    };
  }, []);

  function onAnimationEnd(event: ReactAnimationEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget || event.animationName !== "cta-wave") return;

    if (phase === "rise") {
      const destination = pending.current;
      if (!destination) {
        setPhase("idle");
        return;
      }
      setPhase("hold");
      routerRef.current.push(destination.href);
      return;
    }

    if (phase === "hold") {
      window.clearTimeout(safety.current);
      pending.current = null;
      setPhase("idle");
    }
  }

  if (phase === "idle") return null;

  const covered = phase === "hold" && pending.current?.pathname === pathname;

  return (
    <div
      data-page-wave
      data-phase={covered ? "fall" : phase}
      aria-hidden="true"
      className="page-wave"
      onAnimationEnd={onAnimationEnd}
    />
  );
}
