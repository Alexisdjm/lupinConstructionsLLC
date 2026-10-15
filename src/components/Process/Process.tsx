import { PrimaryCTA } from "@/src/components/UXUI/PrimaryCTA";
import { getDictionary } from "@/src/i18n/getDictionary";
import { localePath } from "@/src/i18n/locales";
import { ProcessCard } from "./ProcessCard";
import { ProcessIcon } from "./ProcessIcon";

export async function Process() {
  const { locale, messages } = await getDictionary();
  const copy = messages.process;

  return (
    <section id="process" className="scroll-mt-24 bg-[#061B2D] pt-16 lg:pt-20">
      <div className="page-shell">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] text-[#2ad9c3] uppercase">
              <span
                className="size-1.5 rounded-full bg-[#2ad9c3]"
                aria-hidden="true"
              />
              {copy.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl leading-tight font-medium text-white sm:text-4xl">
              {copy.title1}
              <br />
              {copy.title2}
            </h2>
          </div>
          <div className="shrink-0 self-start">
            <PrimaryCTA hoverColor="#C4FCFA" href={localePath(locale, "/create")}>{copy.design}</PrimaryCTA>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {copy.steps.map((step, index) => (
            <ProcessCard
              key={step.id}
              step={String(index + 1).padStart(2, "0")}
              title={step.title}
              description={step.description}
              duration={step.duration}
              icon={<ProcessIcon id={step.id} />}
            />
          ))}
        </div>
      </div>

      <svg
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        className="mt-12 block h-30 w-full sm:h-39"
        aria-hidden="true"
      >
        <path
          fill="#3d6278"
          d="M0 78c150 52 280-28 460-6 190 24 270 86 470 58 170-24 280-70 510-28v98H0Z"
        />
        <path
          fill="#c5d0d6"
          d="M0 118c170-42 300 36 500 16 210-22 290-70 500-46 180 20 280 52 440 14v98H0Z"
        />
        <path
          fill="#ffffff"
          d="M0 154c190 30 320-28 540-6 210 22 300 42 500 12 160-24 250 10 400-8v48H0Z"
        />
      </svg>
    </section>
  );
}
