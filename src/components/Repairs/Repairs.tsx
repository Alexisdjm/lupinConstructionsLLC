import { PrimaryCTA } from "@/src/components/UXUI/PrimaryCTA";
import { BeforeAfter } from "./BeforeAfter";

export function Repairs() {
  return (
    <section id="repairs" className="scroll-mt-24 bg-[#fff] py-16 lg:py-20">
      <div className="page-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="flex items-center justify-center gap-2 text-[11px] font-semibold tracking-[0.22em] text-[#149e90] uppercase">
            <span className="size-1.5 rounded-full bg-[#2ad9c3]" aria-hidden="true" />
            Pool Repair & Remodeling
          </p>
          <h2 className="mt-3 text-3xl leading-tight font-medium text-[#1c2430] sm:text-4xl">
            Restore What You Have. Elevate What&apos;s Possible.
          </h2>
          <p className="mt-4 text-base leading-6 text-[#5f6974]">
            From structural repairs and surface resurfacing to full-scale
            renovations, our team brings deteriorated or outdated pools back to
            life — beautifully and durably.
          </p>
        </div>

        <BeforeAfter />

        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-xs leading-5 text-[#8b97a3]">
            Conceptual before-and-after illustration. Actual results depend on
            site conditions and project scope.
          </p>
          <div className="shrink-0">
            <PrimaryCTA href="/#quote">Request a Consultation</PrimaryCTA>
          </div>
        </div>
      </div>
    </section>
  );
}
