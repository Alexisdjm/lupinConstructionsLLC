import { PrimaryCTA } from "@/src/components/UXUI/PrimaryCTA";
import { SecondaryCTA } from "@/src/components/UXUI/SecondaryTSX";
import type { Dictionary } from "@/src/i18n/getDictionary";
import { localePath, type Locale } from "@/src/i18n/locales";

type HeroContentProps = {
  locale: Locale;
  copy: Dictionary["hero"];
};

export function HeroContent({ locale, copy }: HeroContentProps) {
  return (
    <div className="relative z-10 flex min-h-svh items-center text-white">
      <div className="page-shell">
        <div className="max-w-2xl text-left">
        <p className="text-[11px] font-medium tracking-[0.28em] text-white uppercase">
          {copy.eyebrow}
        </p>
        <h1 className="mt-4 max-w-xl text-4xl leading-[1.05] font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {copy.title}
        </h1>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-white sm:text-base">
          {copy.subtitle}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <PrimaryCTA hoverColor="#C4FCFA" href={localePath(locale, "/create")}>{copy.design}</PrimaryCTA>
          <SecondaryCTA href={localePath(locale, "/#portfolio")}>{copy.gallery}</SecondaryCTA>
        </div>
        </div>
      </div>
    </div>
  );
}
