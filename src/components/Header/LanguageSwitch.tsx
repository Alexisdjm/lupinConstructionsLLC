"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/src/i18n/locales";

const LABELS: Record<Locale, string> = { en: "EN", es: "ES" };
const NAMES: Record<Locale, string> = { en: "English", es: "Español" };

type LanguageSwitchProps = {
  locale: Locale;
  /** Accessible name for the whole control, e.g. "Language" / "Idioma". */
  label: string;
  /** Accessible name for the link to the other language. */
  switchAria: string;
};

/**
 * Segmented EN · ES control. The current locale is a highlighted, non-interactive
 * pill; the other locale is a link to the same path in that language.
 */
export function LanguageSwitch({ locale, label, switchAria }: LanguageSwitchProps) {
  const pathname = usePathname();

  return (
    <nav
      aria-label={label}
      className="inline-flex shrink-0 items-center rounded-[10px] bg-white/8 p-0.5 text-xs font-semibold tracking-wide"
    >
      {locales.map((code) => {
        const current = code === locale;
        if (current) {
          return (
            <span
              key={code}
              lang={code}
              aria-current="true"
              title={NAMES[code]}
              className="inline-flex h-8 items-center rounded-[8px] bg-white px-2.5 text-[#07111c]"
            >
              {LABELS[code]}
            </span>
          );
        }
        const href = pathname.replace(/^\/(en|es)(?=\/|$)/, `/${code}`) || `/${code}`;
        return (
          <Link
            key={code}
            href={href}
            hrefLang={code}
            lang={code}
            aria-label={switchAria}
            title={NAMES[code]}
            className="inline-flex h-8 items-center rounded-[8px] px-2.5 text-white/60 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2ad9c3]"
          >
            {LABELS[code]}
          </Link>
        );
      })}
    </nav>
  );
}
