import { useEffect, useRef, useState, type FormEvent } from "react";
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
  const [confirming, setConfirming] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
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
    setConfirming(true);
  }

  function confirmSend() {
    setConfirming(false);
    onSubmit(contact);
  }

  useEffect(() => {
    if (!confirming) return;

    const previous = document.activeElement;
    dialogRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setConfirming(false);
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const items = [...dialogRef.current.querySelectorAll<HTMLElement>("button")];
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, [confirming]);

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

      {confirming ? (
        <div
          className="fixed inset-0 z-60 grid place-items-center bg-[#07111c]/75 px-5"
          onClick={() => setConfirming(false)}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-confirm-title"
            aria-describedby="quote-confirm-message"
            tabIndex={-1}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-md rounded-[20px] border border-white/10 bg-[#0b1922] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.45)] outline-none"
          >
            <h2 id="quote-confirm-title" className="text-lg leading-snug font-medium text-white">
              {copy.confirm.title}
            </h2>
            <p id="quote-confirm-message" className="mt-3 text-sm leading-6 text-white/70">
              {copy.confirm.message}
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setConfirming(false)}
                className="rounded-full border border-white/15 px-5 py-3 text-sm text-white transition-colors hover:border-white/40"
              >
                {copy.confirm.cancel}
              </button>
              <button
                type="button"
                onClick={confirmSend}
                className="flex-1 rounded-full bg-[#2ad9c3] px-5 py-3 text-sm font-semibold text-[#06261f] transition-colors hover:bg-[#5eead4]"
              >
                {copy.confirm.confirm}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
