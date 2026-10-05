import { PrimaryCTA } from "@/src/components/UXUI/PrimaryCTA";
import { SecondaryCTA } from "@/src/components/UXUI/SecondaryTSX";

export function HeroContent() {
  return (
    <div className="relative z-10 flex min-h-svh items-center px-4 text-white sm:px-6 lg:px-10">
      <div className="max-w-2xl text-left">
        <p className="text-[11px] font-medium tracking-[0.28em] text-white uppercase">
          Miami&apos;s Luxury Pool Specialists
        </p>
        <h1 className="mt-4 max-w-xl text-4xl leading-[1.05] font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Build Your Backyard Paradise in South Florida
        </h1>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-white sm:text-base">
          Tell us about your vision and receive a personalized proposal
          crafted by our expert design team, delivered by email.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <PrimaryCTA href="/create">Start Your Design</PrimaryCTA>
          <SecondaryCTA href="/#portfolio">View Gallery</SecondaryCTA>
        </div>
      </div>
    </div>
  );
}
