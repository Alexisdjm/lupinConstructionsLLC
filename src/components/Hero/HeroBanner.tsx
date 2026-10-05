"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { HeroContent } from "./HeroContent";

const HERO_SLIDES = [
  {
    src: "/hero/villa-night.jpg",
    alt: "Modern white home with a reflecting pool and palm trees",
  },
  {
    src: "/hero/palms-house.jpg",
    alt: "Backyard pool beside a house framed by palms",
  },
  {
    src: "/hero/glass-villa.jpg",
    alt: "Glass villa opening onto a turquoise pool",
  },
] as const;

const SLIDE_DURATION_MS = 6000;

export function HeroBanner() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % HERO_SLIDES.length);
    }, SLIDE_DURATION_MS);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section aria-label="Lupin Construction" className="relative min-h-svh">
      <div className="absolute inset-0 z-0">
        {HERO_SLIDES.map((slide, index) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="100vw"
            preload={index === 0}
            className={`object-cover transition-opacity duration-[1200ms] ease-in-out motion-reduce:transition-none ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-[#041018]/70 via-[#041018]/30 to-transparent" />
      </div>
      <HeroContent />
    </section>
  );
}
