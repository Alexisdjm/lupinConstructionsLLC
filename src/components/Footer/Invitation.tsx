import { PrimaryCTA } from "@/src/components/UXUI/PrimaryCTA";

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
        <PrimaryCTA
          href="/#quote"
          color="#ffffff"
          hoverColor="#C4FCFA"
          className="self-start lg:self-center"
        >
          Request a Custom Proposal
        </PrimaryCTA>
      </div>
    </div>
  );
}
