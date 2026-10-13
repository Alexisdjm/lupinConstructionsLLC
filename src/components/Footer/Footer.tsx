import Link from "next/link";
import { getDictionary } from "@/src/i18n/getDictionary";
import { localePath } from "@/src/i18n/locales";
import { LanguageSwitch } from "@/src/components/Header/LanguageSwitch";
import { Invitation } from "./Invitation";

export async function Footer() {
  const { locale, messages } = await getDictionary();
  const copy = messages.footer;
  return (
    <footer className="bg-[#061B2D] text-white">
      <section>
        <Invitation />

        <div className="page-shell pt-12 pb-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-8">
            <div>
              <Link
                href={localePath(locale, "/")}
                className="inline-flex min-w-0 items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2ad9c3]"
              >
                <img
                  src="/svgs/lupin.svg"
                  alt=""
                  width={40}
                  height={40}
                  className="size-10 shrink-0"
                />
                <span className="text-[15px] font-semibold tracking-tight">
                  Lupin Construction LLC
                </span>
              </Link>
              <p className="mt-4 max-w-xs text-sm leading-6 text-white/60">
                {copy.description}
              </p>
              <p className="mt-6 text-sm text-white/80">
                {copy.serving}
              </p>
            </div>

            <nav aria-label={copy.exploreNav}>
              <p className="text-[11px] font-semibold tracking-[0.18em] text-white/45 uppercase">
                {copy.explore}
              </p>
              <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">
                {copy.links.map((item) => (
                  <Link
                    key={item.label}
                    href={localePath(locale, item.href)}
                    className="text-sm text-white/75 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2ad9c3]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>

            <div>
              <p className="text-[11px] font-semibold tracking-[0.18em] text-white/45 uppercase">
                {copy.studio}
              </p>
              <p className="mt-4 text-sm leading-6 text-white/75">
                7300 Biscayne Boulevard, Suite 210
                <br />
                Miami, FL 33138
              </p>
              <a
                href="tel:3055550188"
                className="mt-4 inline-block text-lg font-semibold tracking-tight text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2ad9c3]"
              >
                (305) 555-0188
              </a>
              <p className="mt-3 text-sm text-white/55">
                {copy.hours}
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <p>
              {copy.copyright}
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <LanguageSwitch
                locale={locale}
                label={messages.header.language}
                switchAria={messages.header.switchAria}
              />
              <Link
                href={localePath(locale, "/terms")}
                className="transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2ad9c3]"
              >
                {copy.terms}
              </Link>
              <Link
                href={localePath(locale, "/privacy")}
                className="transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2ad9c3]"
              >
                {copy.privacy}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
