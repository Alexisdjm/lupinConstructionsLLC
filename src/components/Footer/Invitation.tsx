import Link from "next/link";

export function Invitation() {
  return (
    <div className="bg-[#2ad9c3] text-[#062018]">
      <div className="page-shell flex flex-col gap-6 py-8 sm:py-9 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <h2 className="text-2xl leading-tight font-semibold tracking-tight sm:text-3xl">
            Your South Florida retreat starts here.
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#062018]/75 sm:text-base">
            Tell us about your vision and we&apos;ll send a tailored proposal
            directly to your inbox.
          </p>
        </div>
        <Link
          href="/#quote"
          className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-[12px] bg-white px-5 py-3 text-sm font-semibold text-[#062018] transition-colors hover:bg-[#f4fffd] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#062018] lg:self-center"
        >
          Request a Custom Proposal
          <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
            <path
              d="M5 12h14M13 6l6 6-6 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
