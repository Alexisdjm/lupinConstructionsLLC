import { fill } from "@/src/i18n/locales";
import type { WizardCopy } from "./PoolBuilder";
import type { PoolConfig } from "./types";

/** Comma-separated list of the enabled extras, or the localized "none" label. */
export function extrasLabel(config: PoolConfig, copy: WizardCopy) {
  const extras = [
    config.spa ? copy.features.spa.label : null,
    config.fountain ? copy.features.fountain.label : null,
    config.heater ? copy.features.heater.label : null,
    config.bubbles ? copy.features.bubbles.label : null,
  ].filter((item): item is string => item !== null);

  return extras.length > 0 ? extras.join(", ") : copy.contact.none;
}

/** One-line description shown under the viewer and announced to screen readers. */
export function selectionSummary(config: PoolConfig, copy: WizardCopy) {
  return fill(copy.summary, {
    length: config.length,
    width: config.width,
    shape: copy.shape.shapes[config.shape].label,
    coping: copy.interior.copings[config.coping].label,
    deck: copy.features.decks[config.deck].label,
  });
}
