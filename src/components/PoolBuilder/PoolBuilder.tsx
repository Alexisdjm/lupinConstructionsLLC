"use client";

import { useState } from "react";
import { useContactSubmit } from "@/src/hooks/useContactSubmit";
import type { Dictionary } from "@/src/i18n/getDictionary";
import { fill, localePath, type Locale } from "@/src/i18n/locales";
import { ContactStep } from "./ContactStep";
import {
  DEFAULT_CONFIG,
  STEPS,
  dimensionsValid,
  nextAccentLight,
  type LightColorPhoto,
} from "./config";
import { FeaturesStep } from "./FeaturesStep";
import { InteriorStep } from "./InteriorStep";
import { PoolViewer } from "./PoolViewer";
import { ShapeStep } from "./ShapeStep";
import { SuccessStep } from "./SuccessStep";
import { quoteMessage } from "./summary";
import type { ContactDetails, PhotoPhase, PoolConfig } from "./types";

export type WizardCopy = Dictionary["wizard"];

const STEP_PHOTO: Partial<Record<number, PhotoPhase>> = {
  0: "shape",
  1: "interior",
  2: "deck",
};

type PoolBuilderProps = {
  locale: Locale;
  copy: WizardCopy;
  region: string;
};

export function PoolBuilder({ locale, copy, region }: PoolBuilderProps) {
  const [step, setStep] = useState(0);
  const [config, setConfig] = useState<PoolConfig>(DEFAULT_CONFIG);
  const [photoPhase, setPhotoPhase] = useState<PhotoPhase>("shape");
  const [accentLight, setAccentLight] = useState<LightColorPhoto>("blue");
  const [stepError, setStepError] = useState("");
  const [quote, setQuote] = useState<ContactDetails | null>(null);
  const { status, submit } = useContactSubmit();

  const homeHref = localePath(locale, "/");
  const sending = status === "submitting";

  async function handleQuote(contact: ContactDetails) {
    if (sending) return;

    const sent = await submit({
      name: contact.name.trim(),
      email: contact.email.trim(),
      phone: contact.phone.trim(),
      address: contact.address.trim(),
      message: quoteMessage(config, copy, contact),
    });

    if (sent) setQuote(contact);
  }

  function updateConfig(patch: Partial<PoolConfig>) {
    setConfig((current) => ({ ...current, ...patch }));
    if ("shape" in patch) setPhotoPhase("shape");
    if ("interior" in patch) setPhotoPhase("interior");
    if ("coping" in patch) setPhotoPhase("coping");
    if ("deck" in patch) setPhotoPhase("deck");
    if ("fountain" in patch) setPhotoPhase("fountain");
    if ("spa" in patch) setPhotoPhase("spa");
    if ("lighting" in patch) {
      setPhotoPhase("lights");
      if (patch.lighting === "color") {
        setAccentLight((current) => nextAccentLight(current));
      }
    }
    if ("length" in patch || "width" in patch || "depth" in patch) {
      setStepError("");
    }
  }

  function openStep(index: number) {
    const next = Math.min(Math.max(index, 0), STEPS.length - 1);
    setStep(next);
    const phase = STEP_PHOTO[next];
    if (phase) setPhotoPhase(phase);
  }

  function goNext() {
    if (step === 0 && !dimensionsValid(config)) {
      setStepError(copy.dimensionsError);
      return;
    }
    setStepError("");
    openStep(step + 1);
  }

  const stepMeta = copy.steps[step];

  return (
    <div className="flex h-dvh flex-col bg-[#07111c] text-white lg:flex-row">
      <PoolViewer
        config={config}
        photoPhase={photoPhase}
        accentLight={accentLight}
        copy={copy}
        region={region}
        homeHref={homeHref}
      />
      <aside className="flex h-[58dvh] w-full shrink-0 flex-col border-t border-white/10 bg-[#0b1922] lg:h-auto lg:w-[420px] lg:border-t-0 lg:border-l">
        <div className="border-b border-white/10 px-5 py-4">
          <ol className="flex items-center gap-1.5">
            {STEPS.map((item, index) => {
              const reached = index <= step && !quote;
              const current = index === step && !quote;
              return (
                <li key={item.id} className="flex min-w-0 items-center gap-1.5">
                  <button
                    type="button"
                    disabled={Boolean(quote) || index > step}
                    onClick={() => openStep(index)}
                    className={`flex items-center gap-1.5 rounded-full px-1.5 py-1 text-[11px] tracking-wide uppercase disabled:cursor-default ${
                      current
                        ? "text-white"
                        : reached
                          ? "text-white/70"
                          : "text-white/35"
                    }`}
                  >
                    <span
                      className={`grid size-5 place-items-center rounded-full text-[10px] ${
                        current || (quote && index === STEPS.length - 1)
                          ? "bg-[#2ad9c3] text-[#06261f]"
                          : index < step
                            ? "bg-[#2ad9c3]/25 text-[#2ad9c3]"
                            : "bg-white/10 text-white/60"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span className="hidden sm:inline">{copy.steps[index].label}</span>
                  </button>
                  {index < STEPS.length - 1 ? (
                    <span className="h-px w-3 bg-white/15" aria-hidden="true" />
                  ) : null}
                </li>
              );
            })}
          </ol>
          <p className="mt-4 text-[11px] font-medium tracking-[0.16em] text-[#2ad9c3] uppercase">
            {fill(copy.stepOf, {
              current: Math.min(step + 1, STEPS.length),
              total: STEPS.length,
            })}
          </p>
          <h1 className="mt-1 text-xl leading-snug font-medium text-white">
            {quote ? copy.received : stepMeta.title}
          </h1>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
          {quote ? (
            <SuccessStep
              config={config}
              contact={quote}
              copy={copy}
              homeHref={homeHref}
            />
          ) : (
            <>
              {step === 0 ? (
                <ShapeStep
                  config={config}
                  error={stepError}
                  copy={copy.shape}
                  onChange={updateConfig}
                />
              ) : null}
              {step === 1 ? (
                <InteriorStep
                  config={config}
                  copy={copy.interior}
                  onChange={updateConfig}
                />
              ) : null}
              {step === 2 ? (
                <FeaturesStep
                  config={config}
                  copy={copy.features}
                  onChange={updateConfig}
                />
              ) : null}
              {step === 3 ? (
                <ContactStep config={config} copy={copy} onSubmit={handleQuote} />
              ) : null}
            </>
          )}
        </div>

        {quote ? null : (
          <div className="border-t border-white/10 px-5 py-4">
            {step === STEPS.length - 1 && status === "error" ? (
              <p role="alert" className="mb-3 text-sm text-[#ffb4ab]">{copy.submitError}</p>
            ) : null}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => openStep(step - 1)}
                disabled={step === 0 || sending}
                className="rounded-full border border-white/15 px-5 py-3 text-sm text-white transition-colors hover:border-white/40 disabled:cursor-not-allowed disabled:opacity-35"
              >
                {copy.back}
              </button>
              {step < STEPS.length - 1 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="flex-1 rounded-full bg-[#2ad9c3] px-5 py-3 text-sm font-semibold text-[#06261f] transition-colors hover:bg-[#5eead4]"
                >
                  {copy.continue}
                </button>
              ) : (
                <button
                  type="submit"
                  form="quote-form"
                  disabled={sending}
                  className="flex-1 rounded-full bg-[#2ad9c3] px-5 py-3 text-sm font-semibold text-[#06261f] transition-colors hover:bg-[#5eead4] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {sending ? copy.sending : copy.send}
                </button>
              )}
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
