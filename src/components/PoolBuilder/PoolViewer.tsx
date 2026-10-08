import { BrandLockup } from "@/src/components/Header/BrandLockup";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  COPING_PHOTO_BASE,
  COPING_PHOTO_OVERLAYS,
  DECK_PHOTO_BASE,
  DECK_PHOTO_OVERLAYS,
  FOUNTAIN_PHOTO_BASE,
  FOUNTAIN_PHOTO_OVERLAY,
  INTERIOR_PHOTOS,
  SHAPE_PHOTOS,
  SPA_PHOTO_BASE,
  SPA_PHOTO_OVERLAY,
  LIGHT_COLOR_PHOTOS,
  LIGHT_PHOTOS,
  RGB_LIGHT_CYCLE,
  type LightColorPhoto,
  VIEWER_MODES,
  copingSources,
  deckSources,
  fountainSources,
  lightingSources,
  selectionSummary,
  shapeSources,
  spaSources,
  waterSources,
} from "./config";
import { LayerImage } from "./LayerImage";
import type { PhotoPhase, PoolConfig, ViewerMode } from "./types";

const WATER = waterSources();
const DECKS = deckSources();
const COPING = copingSources();
const LIGHTS = lightingSources();
const SPAS = spaSources();
const FOUNTAINS = fountainSources();
const BUBBLES = shapeSources("bubbles");
function addSources(current: ReadonlySet<string>, sources: readonly string[]) {
  if (sources.every((src) => current.has(src))) return current;
  const next = new Set(current);
  for (const src of sources) next.add(src);
  return next;
}

function activePhotoSrcs(phase: PhotoPhase, config: PoolConfig, accentLight: LightColorPhoto) {
  switch (phase) {
    case "shape":
      return [SHAPE_PHOTOS[config.shape]];
    case "interior":
      return [INTERIOR_PHOTOS[config.interior]];
    case "coping": {
      const overlay = COPING_PHOTO_OVERLAYS.find((item) => item.id === config.coping);
      return overlay ? [COPING_PHOTO_BASE, overlay.src] : [COPING_PHOTO_BASE];
    }
    case "deck": {
      const overlay = DECK_PHOTO_OVERLAYS.find((item) => item.id === config.deck);
      return overlay ? [DECK_PHOTO_BASE, overlay.src] : [DECK_PHOTO_BASE];
    }
    case "fountain":
      return config.fountain
        ? [FOUNTAIN_PHOTO_BASE, FOUNTAIN_PHOTO_OVERLAY]
        : [FOUNTAIN_PHOTO_BASE];
    case "spa":
      return config.spa ? [SPA_PHOTO_BASE, SPA_PHOTO_OVERLAY] : [SPA_PHOTO_BASE];
    case "lights":
      if (config.lighting === "white") return [LIGHT_PHOTOS.white];
      if (config.lighting === "color") return [LIGHT_PHOTOS[accentLight]];
      return [LIGHT_PHOTOS.red, ...RGB_LIGHT_CYCLE.map((color) => LIGHT_PHOTOS[color])];
  }
}

function phasePhotoSrcs(phase: PhotoPhase) {
  switch (phase) {
    case "shape":
      return Object.values(SHAPE_PHOTOS);
    case "interior":
      return Object.values(INTERIOR_PHOTOS);
    case "coping":
      return [COPING_PHOTO_BASE, ...COPING_PHOTO_OVERLAYS.map((item) => item.src)];
    case "deck":
      return [DECK_PHOTO_BASE, ...DECK_PHOTO_OVERLAYS.map((item) => item.src)];
    case "fountain":
      return [FOUNTAIN_PHOTO_BASE, FOUNTAIN_PHOTO_OVERLAY];
    case "spa":
      return [SPA_PHOTO_BASE, SPA_PHOTO_OVERLAY];
    case "lights":
      return Object.values(LIGHT_PHOTOS);
  }
}

const PHOTO_FRAME: Record<PhotoPhase, string> = {
  shape: "object-cover object-center",
  interior: "object-cover object-center",
  coping: "object-cover object-center",
  deck: "object-cover object-center",
  fountain: "object-cover object-center",
  spa: "object-cover object-center",
  lights: "object-cover object-center",
};

type PoolViewerProps = {
  config: PoolConfig;
  photoPhase: PhotoPhase;
  accentLight: LightColorPhoto;
};

export function PoolViewer({
  config,
  photoPhase,
  accentLight,
}: PoolViewerProps) {
  const [mode, setMode] = useState<ViewerMode>("realistic");
  const [animationMounted, setAnimationMounted] = useState(false);
  const [revealed, setRevealed] = useState<ReadonlySet<string>>(
    () => new Set([SHAPE_PHOTOS.rectangular]),
  );
  const [entered, setEntered] = useState<ReadonlySet<string>>(
    () => new Set([SHAPE_PHOTOS.rectangular]),
  );

  const needed = activePhotoSrcs(photoPhase, config, accentLight);
  if (needed.some((src) => !revealed.has(src))) {
    setRevealed(addSources(revealed, needed));
  }

  useEffect(() => {
    const pending = [...revealed].filter((src) => !entered.has(src));
    if (pending.length === 0) return;
    const id = window.requestAnimationFrame(() => {
      setEntered((current) => addSources(current, pending));
    });
    return () => window.cancelAnimationFrame(id);
  }, [revealed, entered]);

  useEffect(() => {
    const phase = photoPhase;
    const id = window.setTimeout(() => {
      setRevealed((current) => addSources(current, phasePhotoSrcs(phase)));
    }, 1500);
    return () => window.clearTimeout(id);
  }, [photoPhase]);

  function prefetchPhase(phase: PhotoPhase) {
    setRevealed((current) => addSources(current, phasePhotoSrcs(phase)));
  }

  function selectMode(next: ViewerMode) {
    if (next === "animation" && !animationMounted) {
      setAnimationMounted(true);
      window.setTimeout(() => setMode("animation"), 20);
      return;
    }
    setMode(next);
  }

  function photo(src: string, visible: boolean, fit: string) {
    if (!revealed.has(src)) return null;
    return (
      <LayerImage
        key={src}
        src={src}
        visible={visible && entered.has(src)}
        fit={fit}
        priority={visible}
        onLoad={visible ? () => prefetchPhase(photoPhase) : undefined}
      />
    );
  }

  return (
    <section
      className="relative min-h-[42dvh] flex-1 overflow-hidden bg-[#07111c]"
      aria-label="Pool preview"
    >
      {animationMounted ? (
      <div
        className="absolute inset-0 transition-opacity duration-[400ms] ease-in-out motion-reduce:transition-none"
        style={{ opacity: mode === "animation" ? 1 : 0 }}
        aria-hidden={mode !== "animation"}
      >
        <Image
          src="/hero/villa-night.jpg"
          alt=""
          fill
          sizes="(min-width: 1024px) calc(100vw - 420px), 100vw"
          className="object-cover object-[center_40%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,17,28,0.55)_0%,rgba(7,17,28,0.08)_34%,rgba(7,17,28,0.28)_52%,rgba(6,16,24,0.82)_100%)]" />
        {DECKS.filter((layer) => layer.shape === config.shape && layer.deck === config.deck).map((layer) => (
          <LayerImage
            key={layer.key}
            src={layer.src}
            visible={layer.shape === config.shape && layer.deck === config.deck}
          />
        ))}
        {WATER.filter(
          (layer) => layer.shape === config.shape && layer.interior === config.interior,
        ).map((layer) => (
          <LayerImage
            key={layer.key}
            src={layer.src}
            visible={
              layer.shape === config.shape && layer.interior === config.interior
            }
          />
        ))}
        {BUBBLES.filter((layer) => config.bubbles && layer.shape === config.shape).map((layer) => (
          <LayerImage
            key={layer.key}
            src={layer.src}
            visible={config.bubbles && layer.shape === config.shape}
          />
        ))}
        {LIGHTS.filter(
          (layer) => layer.shape === config.shape && layer.lighting === config.lighting,
        ).map((layer) => (
          <LayerImage
            key={layer.key}
            src={layer.src}
            visible={
              layer.shape === config.shape && layer.lighting === config.lighting
            }
          />
        ))}
        {COPING.filter(
          (layer) => layer.shape === config.shape && layer.coping === config.coping,
        ).map((layer) => (
          <LayerImage
            key={layer.key}
            src={layer.src}
            visible={
              layer.shape === config.shape && layer.coping === config.coping
            }
          />
        ))}
        {SPAS.filter(
          (layer) => config.spa && layer.shape === config.shape && layer.coping === config.coping,
        ).map((layer) => (
          <LayerImage
            key={layer.key}
            src={layer.src}
            visible={
              config.spa &&
              layer.shape === config.shape &&
              layer.coping === config.coping
            }
          />
        ))}
        {FOUNTAINS.filter(
          (layer) =>
            config.fountain && layer.shape === config.shape && layer.coping === config.coping,
        ).map((layer) => (
          <LayerImage
            key={layer.key}
            src={layer.src}
            visible={
              config.fountain &&
              layer.shape === config.shape &&
              layer.coping === config.coping
            }
          />
        ))}
      </div>
      ) : null}

      <div
          className="absolute inset-0 z-1 transition-opacity duration-400 ease-in-out motion-reduce:transition-none"
          style={{ opacity: mode === "realistic" ? 1 : 0 }}
          aria-hidden={mode !== "realistic"}
        >
          <div
            className="absolute inset-0 transition-opacity duration-400 ease-in-out motion-reduce:transition-none"
            style={{ opacity: photoPhase === "shape" ? 1 : 0 }}
          >
            {photo(SHAPE_PHOTOS.rectangular, config.shape === "rectangular", PHOTO_FRAME.shape)}
            {photo(SHAPE_PHOTOS["l-shape"], config.shape === "l-shape", PHOTO_FRAME.shape)}
            {photo(SHAPE_PHOTOS.lap, config.shape === "lap", PHOTO_FRAME.shape)}
            {photo(SHAPE_PHOTOS.custom, config.shape === "custom", PHOTO_FRAME.shape)}
          </div>
          <div
            className="absolute inset-0 transition-opacity duration-400 ease-in-out motion-reduce:transition-none"
            style={{ opacity: photoPhase === "interior" ? 1 : 0 }}
          >
            {photo(INTERIOR_PHOTOS["diamond-brite"], config.interior === "diamond-brite", PHOTO_FRAME.interior)}
            {photo(INTERIOR_PHOTOS["glass-tile"], config.interior === "glass-tile", PHOTO_FRAME.interior)}
          </div>
          <div
            className="absolute inset-0 transition-opacity duration-400 ease-in-out motion-reduce:transition-none"
            style={{ opacity: photoPhase === "coping" ? 1 : 0 }}
          >
            {photo(COPING_PHOTO_BASE, true, PHOTO_FRAME.coping)}
            {COPING_PHOTO_OVERLAYS.map((overlay) =>
              photo(overlay.src, config.coping === overlay.id, PHOTO_FRAME.coping),
            )}
          </div>
          <div
            className="absolute inset-0 transition-opacity duration-400 ease-in-out motion-reduce:transition-none"
            style={{ opacity: photoPhase === "deck" ? 1 : 0 }}
          >
            {photo(DECK_PHOTO_BASE, true, PHOTO_FRAME.deck)}
            {DECK_PHOTO_OVERLAYS.map((overlay) =>
              photo(overlay.src, config.deck === overlay.id, PHOTO_FRAME.deck),
            )}
          </div>
          <div
            className="absolute inset-0 transition-opacity duration-400 ease-in-out motion-reduce:transition-none"
            style={{ opacity: photoPhase === "fountain" ? 1 : 0 }}
          >
            {photo(FOUNTAIN_PHOTO_BASE, true, PHOTO_FRAME.fountain)}
            {photo(FOUNTAIN_PHOTO_OVERLAY, config.fountain, PHOTO_FRAME.fountain)}
          </div>
          <div
            className="absolute inset-0 transition-opacity duration-400 ease-in-out motion-reduce:transition-none"
            style={{ opacity: photoPhase === "spa" ? 1 : 0 }}
          >
            {photo(SPA_PHOTO_BASE, true, PHOTO_FRAME.spa)}
            {photo(SPA_PHOTO_OVERLAY, config.spa, PHOTO_FRAME.spa)}
          </div>
          <div
            className="absolute inset-0 transition-opacity duration-400 ease-in-out motion-reduce:transition-none"
            style={{ opacity: photoPhase === "lights" ? 1 : 0 }}
          >
            {photo(LIGHT_PHOTOS.white, config.lighting === "white", PHOTO_FRAME.lights)}
            {LIGHT_COLOR_PHOTOS.map((color) =>
              photo(
                LIGHT_PHOTOS[color],
                config.lighting === "color" && color === accentLight,
                PHOTO_FRAME.lights,
              ),
            )}
            {photo(LIGHT_PHOTOS.red, config.lighting === "rgb", PHOTO_FRAME.lights)}
            {config.lighting === "rgb"
              ? RGB_LIGHT_CYCLE.map((color, index) =>
                  revealed.has(LIGHT_PHOTOS[color]) ? (
                    <Image
                      key={`rgb-${color}`}
                      src={LIGHT_PHOTOS[color]}
                      alt=""
                      fill
                      aria-hidden
                      draggable={false}
                      sizes="(min-width: 1024px) calc(100vw - 420px), 100vw"
                      className={`pool-light-fade pointer-events-none ${PHOTO_FRAME.lights} opacity-0 motion-reduce:animate-none`}
                      style={{ animationDelay: `${index * 4}s` }}
                    />
                  ) : null,
                )
              : null}
          </div>
        </div>

      <div className="absolute top-28 left-1/2 z-20 -translate-x-1/2 md:top-4">
        <div
          role="radiogroup"
          aria-label="Preview style"
          className="flex rounded-full border border-white/15 bg-[#07111c]/75 p-1"
        >
          {VIEWER_MODES.map((item) => {
            const selected = mode === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => selectMode(item.id)}
                className={`rounded-full px-4 py-2 text-xs font-medium tracking-wide transition-colors ${
                  selected
                    ? "bg-[#2ad9c3] text-[#06261f]"
                    : "text-white/75 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-4 bg-gradient-to-b from-[#07111c]/75 to-transparent px-4 py-4 sm:px-6">
        <div className="min-w-0">
          <BrandLockup />
        </div>
        <Link
          href="/"
          className="shrink-0 rounded-full border border-white/15 bg-black/30 px-4 py-2 text-sm text-white transition-colors hover:border-white/40"
        >
          Exit to Home
        </Link>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#07111c] via-[#07111c]/85 to-transparent px-4 pt-16 pb-4 sm:px-6">
        <p className="text-[10px] font-medium tracking-[0.18em] text-white/50 uppercase">
          Current selection
        </p>
        <p className="mt-1 text-sm text-white">{selectionSummary(config)}</p>
        <p className="sr-only" aria-live="polite">
          {selectionSummary(config)}
        </p>
      </div>
    </section>
  );
}
