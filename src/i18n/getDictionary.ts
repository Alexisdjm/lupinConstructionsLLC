import { cache } from "react";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import en from "./dictionaries/en.json";
import es from "./dictionaries/es.json";
import { hasLocale, type Locale } from "./locales";

const dictionaries = { en, es } satisfies Record<Locale, typeof en>;

export type Dictionary = typeof en;

export const getDictionary = cache(async () => {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  return { locale, messages: dictionaries[locale] };
});
