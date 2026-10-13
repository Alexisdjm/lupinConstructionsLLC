import type {
  ContactDetails,
  CopingId,
  DeckId,
  InteriorId,
  LightingId,
  PoolConfig,
  ShapeId,
  ViewerMode,
} from "./types";

// Option labels and descriptions live in the i18n dictionaries under `wizard`.
// These arrays only hold ids and language-neutral data (sizes, swatches, assets).
export const STEPS = [
  { id: "shape" },
  { id: "interior" },
  { id: "features" },
  { id: "submit" },
] as const;

export const SHAPES: { id: ShapeId }[] = [
  { id: "rectangular" },
  { id: "l-shape" },
  { id: "lap" },
  { id: "custom" },
];

export const SIZE_PRESETS = [
  { id: "small", length: 20, width: 10, depth: 4 },
  { id: "medium", length: 30, width: 15, depth: 5 },
  { id: "large", length: 40, width: 20, depth: 6 },
] as const;

export const INTERIORS: { id: InteriorId }[] = [
  { id: "diamond-brite" },
  { id: "glass-tile" },
];

export const COPINGS: { id: CopingId; swatch: string }[] = [
  { id: "travertine", swatch: "#e6d3b4" },
  { id: "slate", swatch: "#3e4c59" },
  { id: "teak", swatch: "#8d5a32" },
  { id: "brick", swatch: "#a34b3a" },
  { id: "pavers", swatch: "#7d8b86" },
];

export const DECKS: { id: DeckId; swatch: string }[] = [
  { id: "travertine", swatch: "#f3e6cf" },
  { id: "shellstone", swatch: "#d7b56a" },
  { id: "concrete", swatch: "#cfd3d1" },
  { id: "charcoal", swatch: "#3c444a" },
  { id: "ipe", swatch: "#6e4126" },
  { id: "bluestone", swatch: "#7f97a3" },
];

export const VIEWER_MODES: ViewerMode[] = ["animation", "realistic"];

export const COPING_PHOTO_BASE = "/builder/phases/coping/based-pavers.webp";

export const COPING_PHOTO_OVERLAYS: { id: CopingId; src: string }[] = [
  { id: "travertine", src: "/builder/phases/coping/travertine.webp" },
  { id: "slate", src: "/builder/phases/coping/concrete.webp" },
  { id: "teak", src: "/builder/phases/coping/wood.webp" },
  { id: "brick", src: "/builder/phases/coping/brick.webp" },
];

export const DECK_PHOTO_BASE = "/builder/phases/deck/ipe-new.webp";

export const DECK_PHOTO_OVERLAYS: { id: DeckId; src: string }[] = [
  { id: "travertine", src: "/builder/phases/deck/travertine-new.webp" },
  { id: "shellstone", src: "/builder/phases/deck/shellstone-new.webp" },
  { id: "concrete", src: "/builder/phases/deck/concrete-new.webp" },
  { id: "charcoal", src: "/builder/phases/deck/charcoal-new.webp" },
  { id: "bluestone", src: "/builder/phases/deck/bluestone-new.webp" },
];

export const FOUNTAIN_PHOTO_BASE = "/builder/phases/fountain/no-fountain.webp";
export const FOUNTAIN_PHOTO_OVERLAY = "/builder/phases/fountain/fountain.webp";

export const SPA_PHOTO_BASE = "/builder/phases/spa/no-spa-new.webp";
export const SPA_PHOTO_OVERLAY = "/builder/phases/spa/spa-new.webp";

export const SHAPE_PHOTOS: Record<ShapeId, string> = {
  rectangular: "/builder/phases/shape/squared.webp",
  "l-shape": "/builder/phases/shape/l-shape.webp",
  lap: "/builder/phases/shape/lap.webp",
  custom: "/builder/phases/shape/freeform.webp",
};

export const INTERIOR_PHOTOS: Record<InteriorId, string> = {
  "diamond-brite": "/builder/phases/surface/diamond.webp",
  "glass-tile": "/builder/phases/surface/tile.webp",
};

export const LIGHT_PHOTOS = {
  white: "/builder/phases/lights/white.webp",
  red: "/builder/phases/lights/red.webp",
  blue: "/builder/phases/lights/blue.webp",
  green: "/builder/phases/lights/green.webp",
  pink: "/builder/phases/lights/pink.webp",
} as const;

export const LIGHT_COLOR_PHOTOS = ["red", "blue", "green", "pink"] as const;
export type LightColorPhoto = (typeof LIGHT_COLOR_PHOTOS)[number];

export const RGB_LIGHT_CYCLE = ["blue", "green", "pink"] as const;

export function nextAccentLight(current: LightColorPhoto): LightColorPhoto {
  const pool = LIGHT_COLOR_PHOTOS.filter((color) => color !== current);
  return pool[Math.floor(Math.random() * pool.length)];
}

export const LIGHTING: { id: LightingId }[] = [
  { id: "white" },
  { id: "color" },
  { id: "rgb" },
];

export const DEFAULT_CONFIG: PoolConfig = {
  shape: "rectangular",
  length: 30,
  width: 15,
  depth: 5,
  interior: "diamond-brite",
  coping: "travertine",
  deck: "shellstone",
  lighting: "white",
  spa: false,
  fountain: false,
  heater: false,
  bubbles: false,
};

export function dimensionsValid(config: PoolConfig) {
  return (
    config.length >= 10 &&
    config.length <= 80 &&
    config.width >= 6 &&
    config.width <= 40 &&
    config.depth >= 3 &&
    config.depth <= 12
  );
}

export function waterSources() {
  return SHAPES.flatMap((shape) =>
    INTERIORS.map((interior) => ({
      key: `water-${shape.id}-${interior.id}`,
      src: `/builder/water-${shape.id}-${interior.id}-turquoise.svg`,
      shape: shape.id,
      interior: interior.id,
    })),
  );
}

export function deckSources() {
  return SHAPES.flatMap((shape) =>
    DECKS.map((deck) => ({
      key: `deck-${shape.id}-${deck.id}`,
      src: `/builder/deck-${shape.id}-${deck.id}.svg`,
      shape: shape.id,
      deck: deck.id,
    })),
  );
}

export function copingSources() {
  return SHAPES.flatMap((shape) =>
    COPINGS.map((coping) => ({
      key: `coping-${shape.id}-${coping.id}`,
      src: `/builder/coping-${shape.id}-${coping.id}.svg`,
      shape: shape.id,
      coping: coping.id,
    })),
  );
}

export function lightingSources() {
  return SHAPES.flatMap((shape) =>
    LIGHTING.map((lighting) => ({
      key: `lights-${shape.id}-${lighting.id}`,
      src: `/builder/lights-${shape.id}-${lighting.id}.svg`,
      shape: shape.id,
      lighting: lighting.id,
    })),
  );
}

export function spaSources() {
  return SHAPES.flatMap((shape) =>
    COPINGS.map((coping) => ({
      key: `spa-${shape.id}-${coping.id}`,
      src: `/builder/spa-${shape.id}-${coping.id}.svg`,
      shape: shape.id,
      coping: coping.id,
    })),
  );
}

export function fountainSources() {
  return SHAPES.flatMap((shape) =>
    COPINGS.map((coping) => ({
      key: `fountain-${shape.id}-${coping.id}`,
      src: `/builder/fountain-${shape.id}-${coping.id}.svg`,
      shape: shape.id,
      coping: coping.id,
    })),
  );
}

export function shapeSources(kind: "bubbles") {
  return SHAPES.map((shape) => ({
    key: `${kind}-${shape.id}`,
    src: `/builder/${kind}-${shape.id}.svg`,
    shape: shape.id,
  }));
}

export type ContactErrors = Partial<Record<keyof ContactDetails, string>>;

/** Returns the invalid fields; the caller maps them to localized messages. */
export function validateContact(
  contact: ContactDetails,
  messages: Record<keyof ContactDetails, string>,
): ContactErrors {
  const errors: ContactErrors = {};

  if (contact.name.trim().length < 2) {
    errors.name = messages.name;
  }
  if (contact.address.trim().length < 5) {
    errors.address = messages.address;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim())) {
    errors.email = messages.email;
  }
  if (!/^[\d\s()+.-]{7,}$/.test(contact.phone.trim())) {
    errors.phone = messages.phone;
  }

  return errors;
}
