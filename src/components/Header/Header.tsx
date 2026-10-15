import Link from "next/link";
import { PrimaryCTA } from "@/src/components/UXUI/PrimaryCTA";
import { getDictionary } from "@/src/i18n/getDictionary";
import { localePath } from "@/src/i18n/locales";
import { BrandLockup } from "./BrandLockup";
import { HeaderNav } from "./HeaderNav";
import { HeaderShell } from "./HeaderShell";
import { LanguageSwitch } from "./LanguageSwitch";
import { Sidebar } from "./Sidebar";

export async function Header() {
  const { locale, messages } = await getDictionary();
  const copy = messages.header;

  return (
    <HeaderShell>
      <div className="page-shell flex h-19 items-center justify-between gap-4">
        <Link
          href={localePath(locale, "/")}
          className="min-w-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2ad9c3]"
        >
          <BrandLockup region={copy.region} />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label={copy.primary}>
          <HeaderNav
            links={copy.nav.map((link) => ({
              href: localePath(locale, link.href),
              label: link.label,
            }))}
          />
          <div className="flex items-center gap-2 rounded-[16px] border border-white/15 bg-white/8 p-1">
            <LanguageSwitch
              locale={locale}
              label={copy.language}
              switchAria={copy.switchAria}
            />
            <PrimaryCTA hoverColor="#C4FCFA" href={localePath(locale, copy.quote.href)}>
              {copy.quote.label}
            </PrimaryCTA>
          </div>
        </nav>

        <div className="flex items-center lg:hidden">
          <Sidebar
            region={copy.region}
            openMenu={copy.openMenu}
            closeMenu={copy.closeMenu}
            siteMenu={copy.siteMenu}
            mobileNav={copy.mobile}
            links={copy.nav.map((link) => ({
              href: localePath(locale, link.href),
              label: link.label,
            }))}
            quote={{
              href: localePath(locale, copy.quote.href),
              label: copy.quote.label,
            }}
            homeHref={localePath(locale, "/")}
            locale={locale}
            language={copy.language}
            switchAria={copy.switchAria}
          />
        </div>
      </div>
    </HeaderShell>
  );
}
