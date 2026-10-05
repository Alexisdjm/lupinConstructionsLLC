"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

export function useMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarId = useId();
  const previousOverflow = useRef("");

  const close = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = previousOverflow.current;
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow.current;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close]);

  return { isOpen, open, close, sidebarId };
}
