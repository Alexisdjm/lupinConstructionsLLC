import { useState, type FormEvent } from "react";
import {
  COPINGS,
  DECKS,
  INTERIORS,
  LIGHTING,
  SHAPES,
  findById,
  validateContact,
} from "./config";
import { TextField } from "./controls";
import type { ContactDetails, PoolConfig } from "./types";

const EMPTY_CONTACT: ContactDetails = {
  name: "",
  address: "",
  email: "",
  phone: "",
};

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-white/10 py-2.5 last:border-b-0">
      <dt className="text-xs tracking-wide text-white/45 uppercase">{label}</dt>
      <dd className="text-right text-sm text-white">{value}</dd>
    </div>
  );
}

type ContactStepProps = {
  config: PoolConfig;
  onSubmit: (contact: ContactDetails) => void;
};

export function ContactStep({ config, onSubmit }: ContactStepProps) {
  const [contact, setContact] = useState<ContactDetails>(EMPTY_CONTACT);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactDetails, string>>>({});

  function update(field: keyof ContactDetails, value: string) {
    setContact((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateContact(contact);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }
    onSubmit(contact);
  }

  const extras = [
    config.spa ? "Attached spa" : null,
    config.heater ? "Heater" : null,
    config.bubbles ? "Bubble jets" : null,
  ].filter((item): item is string => item !== null);

  return (
    <div className="space-y-6">
      <dl>
        <SummaryRow label="Shape" value={findById(SHAPES, config.shape).label} />
        <SummaryRow
          label="Size"
          value={`${config.length} × ${config.width} ft · ${config.depth} ft deep`}
        />
        <SummaryRow label="Interior" value={findById(INTERIORS, config.interior).label} />
        <SummaryRow label="Coping" value={findById(COPINGS, config.coping).label} />
        <SummaryRow label="Deck" value={findById(DECKS, config.deck).label} />
        <SummaryRow label="Lighting" value={findById(LIGHTING, config.lighting).label} />
        <SummaryRow label="Extras" value={extras.length > 0 ? extras.join(", ") : "None"} />
      </dl>

      <form id="quote-form" className="space-y-3" onSubmit={handleSubmit} noValidate>
        <TextField
          id="name"
          label="Name"
          autoComplete="name"
          value={contact.name}
          error={errors.name}
          onChange={(value) => update("name", value)}
        />
        <TextField
          id="address"
          label="Address"
          autoComplete="street-address"
          value={contact.address}
          error={errors.address}
          onChange={(value) => update("address", value)}
        />
        <TextField
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          value={contact.email}
          error={errors.email}
          onChange={(value) => update("email", value)}
        />
        <TextField
          id="phone"
          label="Phone"
          type="tel"
          autoComplete="tel"
          value={contact.phone}
          error={errors.phone}
          onChange={(value) => update("phone", value)}
        />
      </form>
    </div>
  );
}
