export const locales = ["en", "es"] as const;

export type Locale = (typeof locales)[number];

export function hasLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}

export function localeFromPath(pathname: string): Locale {
  return pathname === "/es" || pathname.startsWith("/es/") ? "es" : "en";
}

export function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

export function localePath(locale: Locale, href: string) {
  if (href.startsWith("/#")) return `/${locale}${href.slice(1)}`;
  if (href === "/") return `/${locale}`;
  return `/${locale}${href}`;
}
