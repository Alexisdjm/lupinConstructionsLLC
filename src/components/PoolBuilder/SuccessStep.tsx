import Link from "next/link";
import { fill } from "@/src/i18n/locales";
import type { WizardCopy } from "./PoolBuilder";
import { extrasLabel } from "./summary";
import type { ContactDetails, PoolConfig } from "./types";

type SuccessStepProps = {
  config: PoolConfig;
  contact: ContactDetails;
  copy: WizardCopy;
  homeHref: string;
};

export function SuccessStep({ config, contact, copy, homeHref }: SuccessStepProps) {
  const labels = copy.success;

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
        {fill(labels.message, {
          name: contact.name.trim(),
          shape: copy.shape.shapes[config.shape].label,
          email: contact.email.trim(),
        })}
      </p>
      <dl className="mt-6 space-y-2 text-sm text-white/80">
        <div className="flex justify-between gap-4">
          <dt className="text-white/45">{labels.project}</dt>
          <dd className="text-right">
            {fill(labels.projectValue, {
              length: config.length,
              width: config.width,
              interior: copy.interior.interiors[config.interior].label,
            })}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-white/45">{labels.edge}</dt>
          <dd className="text-right">
            {fill(labels.edgeValue, {
              coping: copy.interior.copings[config.coping].label,
              deck: copy.features.decks[config.deck].label,
            })}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-white/45">{labels.lighting}</dt>
          <dd className="text-right">{copy.features.lightings[config.lighting].label}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-white/45">{labels.extras}</dt>
          <dd className="max-w-[14rem] text-right">{extrasLabel(config, copy)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-white/45">{labels.address}</dt>
          <dd className="max-w-[14rem] text-right">{contact.address.trim()}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-white/45">{labels.phone}</dt>
          <dd className="text-right">{contact.phone.trim()}</dd>
        </div>
      </dl>
      <Link
        href={homeHref}
        className="mt-8 inline-flex w-fit rounded-full bg-[#2ad9c3] px-5 py-3 text-sm font-semibold text-[#06261f]"
      >
        {labels.home}
      </Link>
    </div>
  );
}
