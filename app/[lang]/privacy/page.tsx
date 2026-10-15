import type { Metadata } from "next";
import { Footer } from "@/src/components/Footer";
import { Header } from "@/src/components/Header";
import { LegalPage } from "@/src/components/Legal/LegalPage";
import { getDictionary } from "@/src/i18n/getDictionary";
import { localePath } from "@/src/i18n/locales";
import { pageMetadata } from "@/src/i18n/site";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, messages } = await getDictionary();
  return pageMetadata(
    locale,
    "/privacy",
    messages.privacy.metaTitle,
    messages.privacy.metaDescription,
  );
}

export default async function PrivacyPage() {
  const { locale, messages } = await getDictionary();

  return (
    <>
      <Header />
      <LegalPage copy={messages.privacy} homeHref={localePath(locale, "/")} noteIcon="shield" />
      <Footer />
    </>
  );
}
