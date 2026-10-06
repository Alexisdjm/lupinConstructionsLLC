import Link from "next/link";
import { COPINGS, DECKS, INTERIORS, LIGHTING, SHAPES, findById } from "./config";
import type { ContactDetails, PoolConfig } from "./types";

type SuccessStepProps = {
  config: PoolConfig;
  contact: ContactDetails;
};

export function SuccessStep({ config, contact }: SuccessStepProps) {
  return (
    <div className="flex h-full flex-col justify-center">
      <span className="grid size-12 place-items-center rounded-full bg-[#2ad9c3] text-[#06261f]">
        <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
          <path
            d="M5 12.5 9.5 17 19 7.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <p className="mt-5 text-sm leading-relaxed text-white/70">
        {contact.name.trim()}, we&apos;ll email a custom proposal for your{" "}
        {findById(SHAPES, config.shape).label} pool to {contact.email.trim()}.
      </p>
      <dl className="mt-6 space-y-2 text-sm text-white/80">
        <div className="flex justify-between gap-4">
          <dt className="text-white/45">Project</dt>
          <dd className="text-right">
            {config.length}×{config.width} ft · {findById(INTERIORS, config.interior).label}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-white/45">Edge</dt>
          <dd className="text-right">
            {findById(COPINGS, config.coping).label} coping · {findById(DECKS, config.deck).label} deck
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-white/45">Lighting</dt>
          <dd className="text-right">{findById(LIGHTING, config.lighting).label}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-white/45">Extras</dt>
          <dd className="max-w-[14rem] text-right">
            {[
              config.spa ? "Attached spa" : null,
              config.fountain ? "Fountain" : null,
              config.heater ? "Heater" : null,
              config.bubbles ? "Bubble jets" : null,
            ]
              .filter((item) => item !== null)
              .join(", ") || "None"}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-white/45">Address</dt>
          <dd className="max-w-[14rem] text-right">{contact.address.trim()}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-white/45">Phone</dt>
          <dd className="text-right">{contact.phone.trim()}</dd>
        </div>
      </dl>
      <Link
        href="/"
        className="mt-8 inline-flex w-fit rounded-full bg-[#2ad9c3] px-5 py-3 text-sm font-semibold text-[#06261f]"
      >
        Back to Home
      </Link>
    </div>
  );
}
