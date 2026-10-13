"use client";

import { useId, useState } from "react";
import { PrimaryCTA } from "@/src/components/UXUI/PrimaryCTA";

type ServiceItem = { title: string; description: string };

const POSITIONS = ["0%", "33.333%", "66.666%", "100%"] as const;

type ServicesGridProps = {
  items: ServiceItem[];
  learnMore: string;
  quoteHref: string;
};

/**
 * Below `lg` the cards stack over one shared photo and behave like an accordion
 * (tap to expand). From `lg` up each card shows its slice of the photo and
 * expands on hover / focus, as before.
 */
export function ServicesGrid({ items, learnMore, quoteHref }: ServicesGridProps) {
  const [active, setActive] = useState(0);
  const baseId = useId();

  return (
    <div className="mt-10 grid w-full grid-cols-1 max-lg:bg-[url(/Services/sunset.webp)] max-lg:bg-cover max-lg:bg-left lg:grid-cols-4">
      {items.map((service, index) => {
        const expanded = active === index;
        const panelId = `${baseId}-panel-${index}`;
        return (
          <article
            key={service.title}
            className={`group relative flex flex-col justify-end overflow-hidden transition-colors duration-300 motion-reduce:transition-none max-lg:border-t-2 lg:aspect-541/727 lg:border-l lg:border-white/20 lg:first:border-l-0 ${
              expanded
                ? "max-lg:border-[#2ad9c3] max-lg:bg-[#06283a]/80"
                : "max-lg:border-white/15 max-lg:bg-[#041018]/50"
            }`}
          >
            <div
              className="pointer-events-none absolute inset-0 hidden lg:block"
              style={{
                backgroundImage: "url(/Services/sunset.webp)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "400% 100%",
                backgroundPosition: `${POSITIONS[index]} center`,
              }}
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-0 hidden bg-linear-to-t from-[#041018]/80 via-[#041018]/15 to-transparent lg:block"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-0 hidden bg-linear-to-t from-[#06283a] via-[#0b3a4c]/85 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none lg:block"
              aria-hidden="true"
            />

            <div className="relative z-10 p-5 sm:p-6">
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setActive(index)}
                className="block w-full cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2ad9c3] lg:cursor-default"
              >
                <span className="block text-xs font-medium tracking-wide text-[#2ad9c3] lg:text-sm lg:text-white/80">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-xl font-semibold text-white">{service.title}</h3>
              </button>
              <div
                id={panelId}
                className={`grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] lg:group-focus-within:grid-rows-[1fr] ${
                  expanded ? "max-lg:grid-rows-[1fr]" : "max-lg:grid-rows-[0fr]"
                }`}
              >
                <div
                  className={`overflow-hidden transition-[visibility] duration-300 motion-reduce:transition-none ${
                    expanded ? "" : "max-lg:invisible"
                  }`}
                >
                  <p className="pt-3 text-sm leading-relaxed text-white/85">
                    {service.description}
                  </p>
                  <PrimaryCTA hoverColor="#C4FCFA" href={quoteHref} className="mt-4">
                    {learnMore}
                  </PrimaryCTA>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
