import { ServicesGrid } from "./ServicesGrid";

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 bg-[#fff] py-16 lg:py-20">
      <div className="page-shell">
        <div className="mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-2 text-[11px] font-semibold tracking-[0.22em] text-[#149e90] uppercase">
            <span className="size-1.5 rounded-full bg-[#2ad9c3]" aria-hidden="true" />
            Our Services
          </p>
          <h2 className="mt-3 text-3xl leading-tight font-medium text-[#1c2430] sm:text-4xl">
            What We Build For You.
          </h2>
          <p className="mt-4 text-base leading-6 text-[#5f6974]">
            From new pool construction to expert repairs and premium parts, Lupin
            Construction delivers quality at every stage of your pool&apos;s life.
          </p>
        </div>
      </div>

      <ServicesGrid />
    </section>
  );
}
