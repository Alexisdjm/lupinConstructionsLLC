"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PrimaryCTA } from "../UXUI/PrimaryCTA";
import { SecondaryCTA } from "../UXUI/SecondaryTSX";
import type { Dictionary } from "@/src/i18n/getDictionary";
import { localePath, type Locale } from "@/src/i18n/locales";
import { OptionCard } from "./OptionCard";

const LIGHTS = ["white", "blue", "green", "pink"] as const;
type LightColor = (typeof LIGHTS)[number];
type Coping = "light" | "dark";
type HotspotId = "lights" | "fountain" | "coping";

function lightSrc(color: LightColor) {
  return `/builderSample/${color}-light.webp`;
}

function fountainSrc(color: LightColor) {
  return `/builderSample/${color}-fountain.webp`;
}

const COPING_WITHOUT_FOUNTAIN = "/builderSample/dark-coping-no-fountain.webp";
const COPING_WITH_FOUNTAIN = "/builderSample/dark-coping.webp";

const INITIAL = lightSrc("white");

const STACK = [
  ...LIGHTS.map(lightSrc),
  ...LIGHTS.map(fountainSrc),
  COPING_WITHOUT_FOUNTAIN,
  COPING_WITH_FOUNTAIN,
];

const HOTSPOTS = [
  {
    id: "lights" as const,
    left: "30%",
    top: "78%",
    placement: "above" as const,
    align: "start" as const,
  },
  {
    id: "fountain" as const,
    left: "70%",
    top: "57%",
    placement: "below" as const,
    align: "end" as const,
  },
  {
    id: "coping" as const,
    left: "50%",
    top: "93%",
    placement: "above" as const,
    align: "center" as const,
  },
];

type BuilderCopy = Dictionary["builder"];

export function BuilderSample({ locale, copy }: { locale: Locale; copy: BuilderCopy }) {
  const [light, setLight] = useState<LightColor>("white");
  const [fountain, setFountain] = useState(false);
  const [coping, setCoping] = useState<Coping>("light");
  const [open, setOpen] = useState<HotspotId | null>(null);
  const [mounted, setMounted] = useState<string[]>([INITIAL]);
  const [entered, setEntered] = useState<string[]>([INITIAL]);

  const active = [
    lightSrc(light),
    ...(fountain ? [fountainSrc(light)] : []),
    ...(coping === "dark"
      ? [fountain ? COPING_WITH_FOUNTAIN : COPING_WITHOUT_FOUNTAIN]
      : []),
  ];

  const missing = active.filter((src) => !mounted.includes(src));
  if (missing.length > 0) {
    setMounted((current) => [
      ...current,
      ...missing.filter((src) => !current.includes(src)),
    ]);
  }

  useEffect(() => {
    const pending = mounted.filter((src) => !entered.includes(src));
    if (pending.length === 0) return;

    const frame = requestAnimationFrame(() => {
      setEntered((current) => {
        const next = current.slice();
        for (const src of pending) {
          if (!next.includes(src)) next.push(src);
        }
        return next;
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [mounted, entered]);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest("[data-hotspot]")) return;
      setOpen(null);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(null);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function choicesFor(id: HotspotId) {
    if (id === "lights") {
      return LIGHTS.map((color) => ({
        id: color,
        label: copy.lights[color].label,
        description: copy.lights[color].detail,
        selected: light === color,
        onSelect: () => setLight(color),
      }));
    }

    if (id === "fountain") {
      return [
        {
          id: "off",
          label: copy.fountainOff,
          description: copy.fountainOffDetail,
          selected: !fountain,
          onSelect: () => setFountain(false),
        },
        {
          id: "on",
          label: copy.fountainOn,
          description: copy.fountainOnDetail,
          selected: fountain,
          onSelect: () => setFountain(true),
        },
      ];
    }

    return [
      {
        id: "light",
        label: copy.copingLight,
        description: copy.copingLightDetail,
        selected: coping === "light",
        onSelect: () => setCoping("light"),
      },
      {
        id: "dark",
        label: copy.copingDark,
        description: copy.copingDarkDetail,
        selected: coping === "dark",
        onSelect: () => setCoping("dark"),
      },
    ];
  }

  return (
    <section id="preview" className="bg-[#061B2D] py-16 lg:py-20">
      <div className="page-shell">
        <div className="mx-auto text-center">
          <p className="flex items-center justify-center gap-2 text-[11px] font-semibold tracking-[0.22em] text-[#2ad9c3] uppercase">
            <span
              className="size-1.5 rounded-full bg-[#2ad9c3]"
              aria-hidden="true"
            />
            {copy.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl leading-tight font-medium text-white sm:text-4xl">
            {copy.title}
          </h2>
          <p className="mt-4 text-base leading-6 text-white/65">
            {copy.subtitle}
          </p>
        </div>

        <div className="relative mt-10 aspect-9/4 w-full">
          <div className="absolute inset-0 overflow-hidden rounded-[20px] shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
            {STACK.map((src) =>
              mounted.includes(src) ? (
                <Image
                  key={src}
                  src={src}
                  alt=""
                  fill
                  quality={90}
                  sizes="(min-width: 1445px) 1300px, 90vw"
                  priority={src === INITIAL}
                  className={`pointer-events-none object-cover object-center transition-opacity duration-500 ease-in-out motion-reduce:transition-none ${
                    active.includes(src) && entered.includes(src)
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                />
              ) : null,
            )}
          </div>

          <p className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#07111c]/75 px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-white uppercase backdrop-blur-sm">
            <span
              className="size-1.5 rounded-full bg-[#2ad9c3]"
              aria-hidden="true"
            />
            {copy.badge}
          </p>

          {HOTSPOTS.map((hotspot) => {
            const isOpen = open === hotspot.id;
            return (
              <div
                key={hotspot.id}
                data-hotspot
                className="absolute z-20"
                style={{ left: hotspot.left, top: hotspot.top }}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-label={copy.hotspots[hotspot.id]}
                  onClick={() => setOpen(isOpen ? null : hotspot.id)}
                  className="absolute top-0 left-0 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-[#2ad9c3] bg-[#0b2c3a] text-white shadow-[0_8px_24px_rgba(7,17,28,0.35)] transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b2c3a]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className={`size-5 transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
                    aria-hidden="true"
                  >
                    <path
                      d="M12 5v14M5 12h14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
                {isOpen ? (
                  <OptionCard
                    title={copy.hotspots[hotspot.id]}
                    choices={choicesFor(hotspot.id)}
                    note={hotspot.id === "coping" ? copy.note : undefined}
                    placement={hotspot.placement}
                    align={hotspot.align}
                    layout={hotspot.id === "lights" ? "row" : "stack"}
                  />
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-xl text-xs leading-5 text-white/45">
            {copy.disclaimer}
          </p>
          <div className="flex shrink-0 flex-wrap gap-3">
            <PrimaryCTA
              hoverColor="#C4FCFA"
              href={localePath(locale, "/create")}
            >
              {copy.design}
            </PrimaryCTA>
            <SecondaryCTA href={localePath(locale, "/contact")}>
              {copy.consult}
            </SecondaryCTA>
          </div>
        </div>
      </div>
    </section>
  );
}
