import { PrimaryCTA } from "@/src/components/UXUI/PrimaryCTA";
import { getDictionary } from "@/src/i18n/getDictionary";
import { localePath } from "@/src/i18n/locales";

export async function Invitation() {
  const { locale, messages } = await getDictionary();
  const copy = messages.footer;

  return (
    <div id="quote" className="bg-[#2ad9c3] text-[#062018]">
      <div className="page-shell flex flex-col gap-6 py-8 sm:py-9 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <h2 className="text-2xl leading-tight font-semibold tracking-tight sm:text-3xl">
            {copy.invitationTitle}
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#062018]/75 sm:text-base">
            {copy.invitationBody}
          </p>
        </div>
        <PrimaryCTA
          href={localePath(locale, "/contact")}
          color="#ffffff"
          hoverColor="#C4FCFA"
          className="self-start lg:self-center"
        >
          {copy.invitationCta}
        </PrimaryCTA>
      </div>
    </div>
  );
}
