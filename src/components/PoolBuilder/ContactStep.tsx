import { useState, type FormEvent } from "react";
import { fill } from "@/src/i18n/locales";
import { validateContact, type ContactErrors } from "./config";
import { TextField } from "./controls";
import type { WizardCopy } from "./PoolBuilder";
import { extrasLabel } from "./summary";
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
  copy: WizardCopy;
  onSubmit: (contact: ContactDetails) => void;
};

export function ContactStep({ config, copy, onSubmit }: ContactStepProps) {
  const [contact, setContact] = useState<ContactDetails>(EMPTY_CONTACT);
  const [errors, setErrors] = useState<ContactErrors>({});
  const labels = copy.contact;

  function update(field: keyof ContactDetails, value: string) {
    setContact((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateContact(contact, labels.errors);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }
    onSubmit(contact);
  }

  return (
    <div className="space-y-6">
      <dl>
        <SummaryRow label={labels.shape} value={copy.shape.shapes[config.shape].label} />
        <SummaryRow
          label={labels.size}
          value={fill(labels.sizeValue, {
            length: config.length,
            width: config.width,
            depth: config.depth,
          })}
        />
        <SummaryRow label={labels.interior} value={copy.interior.interiors[config.interior].label} />
        <SummaryRow label={labels.coping} value={copy.interior.copings[config.coping].label} />
        <SummaryRow label={labels.deck} value={copy.features.decks[config.deck].label} />
        <SummaryRow label={labels.lighting} value={copy.features.lightings[config.lighting].label} />
        <SummaryRow label={labels.extras} value={extrasLabel(config, copy)} />
      </dl>

      <form id="quote-form" className="space-y-3" onSubmit={handleSubmit} noValidate>
        <TextField
          id="name"
          label={labels.name}
          autoComplete="name"
          value={contact.name}
          error={errors.name}
          onChange={(value) => update("name", value)}
        />
        <TextField
          id="address"
          label={labels.address}
          autoComplete="street-address"
          value={contact.address}
          error={errors.address}
          onChange={(value) => update("address", value)}
        />
        <TextField
          id="email"
          label={labels.email}
          type="email"
          autoComplete="email"
          value={contact.email}
          error={errors.email}
          onChange={(value) => update("email", value)}
        />
        <TextField
          id="phone"
          label={labels.phone}
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
