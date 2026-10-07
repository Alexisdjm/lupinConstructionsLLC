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

export const STEPS = [
  { id: "shape", label: "Shape", title: "Define your pool's foundation." },
  { id: "interior", label: "Interior", title: "Choose the shell and the coping." },
  { id: "features", label: "Features", title: "Choose the deck. Add movement." },
  { id: "submit", label: "Submit", title: "Your custom proposal starts here." },
] as const;

export const SHAPES: { id: ShapeId; label: string; detail: string }[] = [
  { id: "rectangular", label: "Rectangular", detail: "Clean geometry, easy to furnish" },
  { id: "l-shape", label: "L-Shape", detail: "A lounge wing off the main basin" },
  { id: "lap", label: "Lap Pool", detail: "Long and narrow for daily laps" },
  { id: "custom", label: "Custom", detail: "A freeform silhouette" },
];

export const SIZE_PRESETS = [
  { id: "small", label: "Small", length: 20, width: 10, depth: 4 },
  { id: "medium", label: "Medium", length: 30, width: 15, depth: 5 },
  { id: "large", label: "Large", length: 40, width: 20, depth: 6 },
] as const;

export const INTERIORS: { id: InteriorId; label: string; detail: string }[] = [
  {
    id: "diamond-brite",
    label: "Diamond Brite",
    detail: "Pebble finish with a soft sparkle",
  },
  {
    id: "glass-tile",
    label: "Glass Tile",
    detail: "Gridded glass across the shell",
  },
];

export const COPINGS: { id: CopingId; label: string; detail: string; swatch: string }[] = [
  { id: "travertine", label: "Travertine", detail: "Warm limestone edge", swatch: "#e6d3b4" },
  { id: "slate", label: "Dark Slate", detail: "Cool, honed stone", swatch: "#3e4c59" },
  { id: "teak", label: "Teak", detail: "Oiled hardwood rim", swatch: "#8d5a32" },
  { id: "brick", label: "Brick", detail: "Clay courses at the waterline", swatch: "#a34b3a" },
  { id: "pavers", label: "Pavers", detail: "Cut stone set in a grid", swatch: "#7d8b86" },
];

export const DECKS: { id: DeckId; label: string; detail: string; swatch: string }[] = [
  { id: "travertine", label: "Travertine", detail: "Warm stone pavers underfoot", swatch: "#f3e6cf" },
  { id: "shellstone", label: "Shellstone", detail: "Cream Florida limestone", swatch: "#d7b56a" },
  { id: "concrete", label: "Concrete", detail: "Smooth cool-gray slab", swatch: "#cfd3d1" },
  { id: "charcoal", label: "Charcoal", detail: "Dark cut pavers", swatch: "#3c444a" },
  { id: "ipe", label: "Ipe", detail: "Hardwood decking", swatch: "#6e4126" },
  { id: "bluestone", label: "Bluestone", detail: "Blue-gray natural stone", swatch: "#7f97a3" },
];

export const VIEWER_MODES: { id: ViewerMode; label: string }[] = [
  { id: "animation", label: "Animation" },
  { id: "realistic", label: "Realistic" },
];

export const COPING_PHOTO_BASE = "/builder/phases/coping/based-pavers.webp";

export const COPING_PHOTO_OVERLAYS: { id: CopingId; src: string }[] = [
  { id: "travertine", src: "/builder/phases/coping/travertine.webp" },
  { id: "slate", src: "/builder/phases/coping/concrete.webp" },
  { id: "teak", src: "/builder/phases/coping/wood.webp" },
  { id: "brick", src: "/builder/phases/coping/brick.webp" },
];

export const DECK_PHOTO_BASE = "/builder/phases/deck/ipe-deck.webp";

export const DECK_PHOTO_OVERLAYS: { id: DeckId; src: string }[] = [
  { id: "travertine", src: "/builder/phases/deck/travertine-deck.webp" },
  { id: "shellstone", src: "/builder/phases/deck/shellstone-deck.webp" },
  { id: "concrete", src: "/builder/phases/deck/concrete-deck.webp" },
  { id: "charcoal", src: "/builder/phases/deck/charcoal-deck.webp" },
  { id: "bluestone", src: "/builder/phases/deck/bluestone-deck.webp" },
];

export const FOUNTAIN_PHOTO_BASE = "/builder/phases/source/no-source.webp";
export const FOUNTAIN_PHOTO_OVERLAY = "/builder/phases/source/source.webp";

export const SPA_PHOTO_BASE = "/builder/phases/spa/no-spa.webp";
export const SPA_PHOTO_OVERLAY = "/builder/phases/spa/spa.webp";

export const INTERIOR_PHOTO_BASE = "/builder/phases/surface/loza.webp";
export const INTERIOR_PHOTO_OVERLAY = "/builder/phases/surface/diamond-bride.webp";

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

export const LIGHTING: { id: LightingId; label: string; detail: string }[] = [
  { id: "white", label: "Warm White", detail: "Even glow along the floor" },
  { id: "color", label: "Color", detail: "Fixed teal and magenta accents" },
  { id: "rgb", label: "RGB Dynamic", detail: "Lights that cycle through color" },
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

export function findById<T extends { id: string }>(items: T[], id: string) {
  const match = items.find((item) => item.id === id);
  if (!match) {
    throw new Error(`Unknown option: ${id}`);
  }
  return match;
}

export function selectionSummary(config: PoolConfig) {
  const shape = findById(SHAPES, config.shape);
  const coping = findById(COPINGS, config.coping);
  const deck = findById(DECKS, config.deck);
  return `${config.length}×${config.width} ft · ${shape.label} · ${coping.label} coping · ${deck.label} deck`;
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

export function validateContact(contact: ContactDetails) {
  const errors: Partial<Record<keyof ContactDetails, string>> = {};

  if (contact.name.trim().length < 2) {
    errors.name = "Enter your full name.";
  }
  if (contact.address.trim().length < 5) {
    errors.address = "Enter the project address.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!/^[\d\s()+.-]{7,}$/.test(contact.phone.trim())) {
    errors.phone = "Enter a valid phone number.";
  }

  return errors;
}
