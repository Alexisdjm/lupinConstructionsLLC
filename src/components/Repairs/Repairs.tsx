import { PrimaryCTA } from "@/src/components/UXUI/PrimaryCTA";
import { getDictionary } from "@/src/i18n/getDictionary";
import { localePath } from "@/src/i18n/locales";
import { BeforeAfter } from "./BeforeAfter";

export async function Repairs() {
  const { locale, messages } = await getDictionary();
  const copy = messages.repairs;
  return (
    <section id="repairs" className="scroll-mt-24 bg-white py-16 lg:py-20">
      <div className="page-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="flex items-center justify-center gap-2 text-[11px] font-semibold tracking-[0.22em] text-[#149e90] uppercase">
            <span className="size-1.5 rounded-full bg-[#2ad9c3]" aria-hidden="true" />
            {copy.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl leading-tight font-medium text-[#1c2430] sm:text-4xl">
            {copy.title}
          </h2>
          <p className="mt-4 text-base leading-6 text-[#5f6974]">
            {copy.subtitle}
          </p>
        </div>

        <BeforeAfter
          before={copy.before}
          after={copy.after}
          beforeAlt={copy.beforeAlt}
          slider={copy.slider}
          value={copy.value}
        />

        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-xs leading-5 text-[#8b97a3]">
            {copy.disclaimer}
          </p>
          <div className="shrink-0">
            <PrimaryCTA hoverColor="#C4FCFA" href={localePath(locale, "/contact")}>{copy.consult}</PrimaryCTA>
          </div>
        </div>
      </div>
    </section>
  );
}
