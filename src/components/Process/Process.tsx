import { PrimaryCTA } from "@/src/components/UXUI/PrimaryCTA";
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

export function Process() {
  return (
    <section
      id="process"
      className="scroll-mt-24 bg-[#0c2430] px-4 py-16 sm:px-6 lg:px-10 lg:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] text-[#2ad9c3] uppercase">
              <span className="size-1.5 rounded-full bg-[#2ad9c3]" aria-hidden="true" />
              How it works
            </p>
            <h2 className="mt-3 text-3xl leading-tight font-medium text-white sm:text-4xl">
              From inspiration to first swim,
              <br />
              without the guesswork.
            </h2>
          </div>
          <div className="shrink-0 self-start">
            <PrimaryCTA href="/create">Start Your Design</PrimaryCTA>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step) => (
            <ProcessCard
              key={step.step}
              step={step.step}
              title={step.title}
              description={step.description}
              duration={step.duration}
              icon={step.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
