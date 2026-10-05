import { StandardCard } from "./StandardCard";

const STANDARDS = [
  {
    title: "State Licensed & Insured",
    description: "CFC License",
    icon: (
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
        <path
          d="M12 3.5l6.5 2.4v5.2c0 4.2-2.7 7.3-6.5 8.4-3.8-1.1-6.5-4.2-6.5-8.4V5.9L12 3.5z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="M9.2 12.1l1.8 1.8 3.8-4"
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
    title: "Lifetime Structural Warranty",
    description: "Built for lasting confidence",
    icon: (
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
        <path
          d="M12 3.5l6.5 2.4v5.2c0 4.2-2.7 7.3-6.5 8.4-3.8-1.1-6.5-4.2-6.5-8.4V5.9L12 3.5z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "100% Permit Handling",
    description: "From plans to final inspection",
    icon: (
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
        <path
          d="M8 3.5h6.2L19 8.2V20.5H8z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="M14 3.8V8.4H19M10.2 12.5h5.6M10.2 16h5.6"
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
    title: "20+ Years of Excellence",
    description: "Trusted craftsmanship since 2004",
    icon: (
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
        <circle
          cx="12"
          cy="9"
          r="4.2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path
          d="M8.2 12.6L6.4 20l5.6-2.4L17.6 20l-1.8-7.4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
] as const;

export function Standard() {
  return (
    <section id="standard" className="bg-[#f4f1eb] px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] text-[#149e90] uppercase">
              <span className="size-1.5 rounded-full bg-[#2ad9c3]" aria-hidden="true" />
              The Lupin Standard
            </p>
            <h2
              className="mt-3 text-[30px] leading-none font-normal whitespace-nowrap text-[#1c2430]"
            >
              Built beautifully. Backed completely.
            </h2>
          </div>
          <p
            className="text-[16px] leading-6 font-normal text-[#5f6974] xl:text-right"
          >
            <span className="block whitespace-nowrap">
              One expert team manages design, engineering, permits,
            </span>
            <span className="block whitespace-nowrap">
              and construction from first sketch to first swim.
            </span>
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {STANDARDS.map((item) => (
            <StandardCard
              key={item.title}
              title={item.title}
              description={item.description}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
