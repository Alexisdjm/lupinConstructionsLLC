import { fill } from "@/src/i18n/locales";
import type { WizardCopy } from "./PoolBuilder";
import type { ContactDetails, PoolConfig } from "./types";

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

/** Selection summary, plus address and phone, sent as the contact message. */
export function quoteMessage(config: PoolConfig, copy: WizardCopy, contact: ContactDetails) {
  const labels = copy.contact;
  const lines = [
    [labels.shape, copy.shape.shapes[config.shape].label],
    [
      labels.size,
      fill(labels.sizeValue, {
        length: config.length,
        width: config.width,
        depth: config.depth,
      }),
    ],
    [labels.interior, copy.interior.interiors[config.interior].label],
    [labels.coping, copy.interior.copings[config.coping].label],
    [labels.deck, copy.features.decks[config.deck].label],
    [labels.lighting, copy.features.lightings[config.lighting].label],
    [labels.extras, extrasLabel(config, copy)],
    [labels.address, contact.address.trim()],
    [labels.phone, contact.phone.trim()],
  ];

  return lines.map(([label, value]) => `${label}: ${value}`).join("\n");
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
