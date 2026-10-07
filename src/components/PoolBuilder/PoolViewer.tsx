import { BrandLockup } from "@/src/components/Header/BrandLockup";
import Link from "next/link";
import { useState } from "react";
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
  const [mode, setMode] = useState<ViewerMode>("animation");
  const [realisticMounted, setRealisticMounted] = useState(false);

  function selectMode(next: ViewerMode) {
    if (next === "realistic" && !realisticMounted) {
      setRealisticMounted(true);
      window.setTimeout(() => setMode("realistic"), 20);
      return;
    }
    setMode(next);
  }

  return (
    <section
      className="relative min-h-[42dvh] flex-1 overflow-hidden bg-[#07111c]"
      aria-label="Pool preview"
    >
      <div
        className="absolute inset-0 transition-opacity duration-[400ms] ease-in-out motion-reduce:transition-none"
        style={{ opacity: mode === "animation" ? 1 : 0 }}
        aria-hidden={mode !== "animation"}
      >
        <img
          src="/hero/villa-night.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[center_40%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,17,28,0.55)_0%,rgba(7,17,28,0.08)_34%,rgba(7,17,28,0.28)_52%,rgba(6,16,24,0.82)_100%)]" />
        {DECKS.map((layer) => (
          <LayerImage
            key={layer.key}
            src={layer.src}
            visible={layer.shape === config.shape && layer.deck === config.deck}
          />
        ))}
        {WATER.map((layer) => (
          <LayerImage
            key={layer.key}
            src={layer.src}
            visible={
              layer.shape === config.shape && layer.interior === config.interior
            }
          />
        ))}
        {BUBBLES.map((layer) => (
          <LayerImage
            key={layer.key}
            src={layer.src}
            visible={config.bubbles && layer.shape === config.shape}
          />
        ))}
        {LIGHTS.map((layer) => (
          <LayerImage
            key={layer.key}
            src={layer.src}
            visible={
              layer.shape === config.shape && layer.lighting === config.lighting
            }
          />
        ))}
        {COPING.map((layer) => (
          <LayerImage
            key={layer.key}
            src={layer.src}
            visible={
              layer.shape === config.shape && layer.coping === config.coping
            }
          />
        ))}
        {SPAS.map((layer) => (
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
        {FOUNTAINS.map((layer) => (
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

      {realisticMounted ? (
        <div
          className="absolute inset-0 z-1 transition-opacity duration-400 ease-in-out motion-reduce:transition-none"
          style={{ opacity: mode === "realistic" ? 1 : 0 }}
          aria-hidden={mode !== "realistic"}
        >
          <div
            className="absolute inset-0 transition-opacity duration-400 ease-in-out motion-reduce:transition-none"
            style={{ opacity: photoPhase === "shape" ? 1 : 0 }}
          >
            <LayerImage
              src={SHAPE_PHOTOS.rectangular}
              visible={config.shape === "rectangular"}
              fit={PHOTO_FRAME.shape}
            />
            <LayerImage
              src={SHAPE_PHOTOS["l-shape"]}
              visible={config.shape === "l-shape"}
              fit={PHOTO_FRAME.shape}
            />
            <LayerImage
              src={SHAPE_PHOTOS.lap}
              visible={config.shape === "lap"}
              fit={PHOTO_FRAME.shape}
            />
            <LayerImage
              src={SHAPE_PHOTOS.custom}
              visible={config.shape === "custom"}
              fit={PHOTO_FRAME.shape}
            />
          </div>
          <div
            className="absolute inset-0 transition-opacity duration-400 ease-in-out motion-reduce:transition-none"
            style={{ opacity: photoPhase === "interior" ? 1 : 0 }}
          >
            <LayerImage
              src={INTERIOR_PHOTOS["diamond-brite"]}
              visible={config.interior === "diamond-brite"}
              fit={PHOTO_FRAME.interior}
            />
            <LayerImage
              src={INTERIOR_PHOTOS["glass-tile"]}
              visible={config.interior === "glass-tile"}
              fit={PHOTO_FRAME.interior}
            />
          </div>
          <div
            className="absolute inset-0 transition-opacity duration-400 ease-in-out motion-reduce:transition-none"
            style={{ opacity: photoPhase === "coping" ? 1 : 0 }}
          >
            <LayerImage src={COPING_PHOTO_BASE} visible fit={PHOTO_FRAME.coping} />
            {COPING_PHOTO_OVERLAYS.map((overlay) => (
              <LayerImage
                key={`coping-${overlay.id}`}
                src={overlay.src}
                visible={config.coping === overlay.id}
                fit={PHOTO_FRAME.coping}
              />
            ))}
          </div>
          <div
            className="absolute inset-0 transition-opacity duration-400 ease-in-out motion-reduce:transition-none"
            style={{ opacity: photoPhase === "deck" ? 1 : 0 }}
          >
            <LayerImage src={DECK_PHOTO_BASE} visible fit={PHOTO_FRAME.deck} />
            {DECK_PHOTO_OVERLAYS.map((overlay) => (
              <LayerImage
                key={`deck-${overlay.id}`}
                src={overlay.src}
                visible={config.deck === overlay.id}
                fit={PHOTO_FRAME.deck}
              />
            ))}
          </div>
          <div
            className="absolute inset-0 transition-opacity duration-400 ease-in-out motion-reduce:transition-none"
            style={{ opacity: photoPhase === "fountain" ? 1 : 0 }}
          >
            <LayerImage src={FOUNTAIN_PHOTO_BASE} visible fit={PHOTO_FRAME.fountain} />
            <LayerImage
              src={FOUNTAIN_PHOTO_OVERLAY}
              visible={config.fountain}
              fit={PHOTO_FRAME.fountain}
            />
          </div>
          <div
            className="absolute inset-0 transition-opacity duration-400 ease-in-out motion-reduce:transition-none"
            style={{ opacity: photoPhase === "spa" ? 1 : 0 }}
          >
            <LayerImage src={SPA_PHOTO_BASE} visible fit={PHOTO_FRAME.spa} />
            <LayerImage
              src={SPA_PHOTO_OVERLAY}
              visible={config.spa}
              fit={PHOTO_FRAME.spa}
            />
          </div>
          <div
            className="absolute inset-0 transition-opacity duration-400 ease-in-out motion-reduce:transition-none"
            style={{ opacity: photoPhase === "lights" ? 1 : 0 }}
          >
            <LayerImage
              src={LIGHT_PHOTOS.white}
              visible={config.lighting === "white"}
              fit={PHOTO_FRAME.lights}
            />
            {LIGHT_COLOR_PHOTOS.map((color) => (
              <LayerImage
                key={`color-${color}`}
                src={LIGHT_PHOTOS[color]}
                visible={config.lighting === "color" && color === accentLight}
                fit={PHOTO_FRAME.lights}
              />
            ))}
            <LayerImage
              src={LIGHT_PHOTOS.red}
              visible={config.lighting === "rgb"}
              fit={PHOTO_FRAME.lights}
            />
            {config.lighting === "rgb"
              ? RGB_LIGHT_CYCLE.map((color, index) => (
                  <img
                    key={`rgb-${color}`}
                    src={LIGHT_PHOTOS[color]}
                    alt=""
                    aria-hidden="true"
                    draggable={false}
                    className={`pool-light-fade pointer-events-none absolute inset-0 h-full w-full ${PHOTO_FRAME.lights} opacity-0 motion-reduce:animate-none`}
                    style={{ animationDelay: `${index * 4}s` }}
                  />
                ))
              : null}
          </div>
        </div>
      ) : null}

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
          <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[10px] font-medium tracking-[0.16em] text-white/80 uppercase">
            <span
              className="size-1.5 rounded-full bg-[#2ad9c3]"
              aria-hidden="true"
            />
            Live preview
          </p>
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
