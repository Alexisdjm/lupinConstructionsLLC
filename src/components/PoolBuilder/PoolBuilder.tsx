"use client";

import { useState } from "react";
import { ContactStep } from "./ContactStep";
import { DEFAULT_CONFIG, STEPS, dimensionsValid } from "./config";
import { FeaturesStep } from "./FeaturesStep";
import { InteriorStep } from "./InteriorStep";
import { PoolViewer } from "./PoolViewer";
import { ShapeStep } from "./ShapeStep";
import { SuccessStep } from "./SuccessStep";
import type { ContactDetails, PoolConfig } from "./types";

export function PoolBuilder() {
  const [step, setStep] = useState(0);
  const [config, setConfig] = useState<PoolConfig>(DEFAULT_CONFIG);
  const [stepError, setStepError] = useState("");
  const [quote, setQuote] = useState<ContactDetails | null>(null);

  function updateConfig(patch: Partial<PoolConfig>) {
    setConfig((current) => ({ ...current, ...patch }));
    if ("length" in patch || "width" in patch || "depth" in patch) {
      setStepError("");
    }
  }

  function goNext() {
    if (step === 0 && !dimensionsValid(config)) {
      setStepError("Enter a length, width, and depth inside the allowed range.");
      return;
    }
    setStepError("");
    setStep((current) => Math.min(current + 1, STEPS.length - 1));
  }

  const stepMeta = STEPS[step];

  return (
    <div className="flex h-dvh flex-col bg-[#07111c] text-white lg:flex-row">
      <PoolViewer config={config} />
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
                    onClick={() => setStep(index)}
                    className={`flex items-center gap-1.5 rounded-full px-1.5 py-1 text-[11px] tracking-wide uppercase disabled:cursor-default ${
                      current ? "text-white" : reached ? "text-white/70" : "text-white/35"
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
                    <span className="hidden sm:inline">{item.label}</span>
                  </button>
                  {index < STEPS.length - 1 ? <span className="h-px w-3 bg-white/15" aria-hidden="true" /> : null}
                </li>
              );
            })}
          </ol>
          <p className="mt-4 text-[11px] font-medium tracking-[0.16em] text-[#2ad9c3] uppercase">
            Step {Math.min(step + 1, 4)} of 4
          </p>
          <h1 className="mt-1 text-xl leading-snug font-medium text-white">
            {quote ? "Proposal received." : stepMeta.title}
          </h1>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
          {quote ? (
            <SuccessStep config={config} contact={quote} />
          ) : (
            <>
              {step === 0 ? <ShapeStep config={config} error={stepError} onChange={updateConfig} /> : null}
              {step === 1 ? <InteriorStep config={config} onChange={updateConfig} /> : null}
              {step === 2 ? <FeaturesStep config={config} onChange={updateConfig} /> : null}
              {step === 3 ? <ContactStep config={config} onSubmit={setQuote} /> : null}
            </>
          )}
        </div>

        {quote ? null : (
          <div className="flex gap-3 border-t border-white/10 px-5 py-4">
            <button
              type="button"
              onClick={() => setStep((current) => Math.max(current - 1, 0))}
              disabled={step === 0}
              className="rounded-full border border-white/15 px-5 py-3 text-sm text-white transition-colors hover:border-white/40 disabled:cursor-not-allowed disabled:opacity-35"
            >
              Back
            </button>
            {step < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={goNext}
                className="flex-1 rounded-full bg-[#2ad9c3] px-5 py-3 text-sm font-semibold text-[#06261f] transition-colors hover:bg-[#5eead4]"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                form="quote-form"
                className="flex-1 rounded-full bg-[#2ad9c3] px-5 py-3 text-sm font-semibold text-[#06261f] transition-colors hover:bg-[#5eead4]"
              >
                Send My Custom Proposal
              </button>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}
