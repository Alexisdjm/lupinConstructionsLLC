import { getDictionary } from "@/src/i18n/getDictionary";
import { localePath } from "@/src/i18n/locales";
import { FAQList } from "./FAQList";

export async function FAQs() {
  const { locale, messages } = await getDictionary();
  const copy = messages.faqs;

  return (
    <section id="faqs" className="scroll-mt-24 bg-white py-16 lg:py-20">
      <div className="page-shell">
        <div className="mx-auto">
          <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] text-[#149e90] uppercase">
            <span className="size-1.5 rounded-full bg-[#2ad9c3]" aria-hidden="true" />
            {copy.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl leading-tight font-medium text-[#1c2430] sm:text-4xl">
            {copy.title}
          </h2>
          <p className="mt-4 text-base leading-6 text-[#5f6974]">{copy.subtitle}</p>
        </div>

        <FAQList
          items={copy.items}
          cta={copy.cta}
          ctaHref={localePath(locale, "/#quote")}
        />
      </div>
    </section>
  );
}
