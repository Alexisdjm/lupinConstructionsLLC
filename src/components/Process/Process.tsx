import { PrimaryCTA } from "@/src/components/UXUI/PrimaryCTA";
import { getDictionary } from "@/src/i18n/getDictionary";
import { localePath } from "@/src/i18n/locales";
import { ProcessCard } from "./ProcessCard";

const STEPS = [
  {
    step: "01",
    title: "1. Share Your Vision",
    description:
      "Tell us about your ideal pool — dimensions, finish, lighting, water features — and we'll capture every detail.",
    duration: "About 1 minute",
    icon: (
      <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
        <path
          d="M8 4.5h8.5L19 7v12.5H8z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="M14 4.8V7.2H19M10.2 11h5.2M10.2 14.2h5.2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    step: "02",
    title: "2. Receive Your Proposal",
    description:
      "Our team reviews your submission and sends a tailored proposal by email, followed by a complimentary site visit.",
    duration: "Proposal within 24 hours",
    icon: (
      <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
        <path
          d="M7 4.5h7.2L18.5 8.6V19.5H7z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="M14 4.8V8.6h4.4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    step: "03",
    title: "3. We Build",
    description:
      "Our licensed team manages engineering, permits, construction, and your white-glove pool orientation.",
    duration: "Typical build: 10-14 weeks",
    icon: (
      <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
        <circle
          cx="12"
          cy="12"
          r="3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path
          d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6 6l1.6 1.6M16.4 16.4L18 18M18 6l-1.6 1.6M7.6 16.4L6 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
] as const;

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
              key={STEPS[index].step}
              step={STEPS[index].step}
              title={step.title}
              description={step.description}
              duration={step.duration}
              icon={STEPS[index].icon}
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
