import type { Metadata } from "next";
import type { Locale } from "./locales";

export const companyName = "Lupin Constructions LLC";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://lupinconstructionsllc.com"
).replace(/\/$/, "");

export function localizedUrl(locale: Locale, path = "") {
  const suffix = path.startsWith("/") ? path : path ? `/${path}` : "";
  return `${siteUrl}/${locale}${suffix}`;
}

export function languageAlternates(path = "") {
  return {
    en: localizedUrl("en", path),
    es: localizedUrl("es", path),
    "x-default": localizedUrl("en", path),
  };
}

export function pageMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
): Metadata {
  const url = localizedUrl(locale, path);
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: companyName,
      locale: locale === "es" ? "es_US" : "en_US",
      alternateLocale: locale === "es" ? ["en_US"] : ["es_US"],
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export function localBusinessJsonLd(locale: Locale, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: companyName,
    description,
    url: localizedUrl(locale),
    logo: `${siteUrl}/svgs/lupin.svg`,
    image: `${siteUrl}/hero/villa-night.jpg`,
    telephone: "+1-305-321-2186",
    address: {
      "@type": "PostalAddress",
      streetAddress: "3941 SW 89th Av Apt 3",
      addressLocality: "Miami",
      addressRegion: "FL",
      addressCountry: "US",
    },
    areaServed: ["Miami", "Fort Lauderdale", "Palm Beach"],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    inLanguage: locale,
  };
}
