import type { Metadata } from "next";
import { Footer } from "@/src/components/Footer";
import { Header } from "@/src/components/Header";
import { LegalPage } from "@/src/components/Legal/LegalPage";
import { getDictionary } from "@/src/i18n/getDictionary";
import { localePath } from "@/src/i18n/locales";

export async function generateMetadata(): Promise<Metadata> {
  const { messages } = await getDictionary();
  return {
    title: messages.terms.metaTitle,
    description: messages.terms.metaDescription,
  };
}

export default async function TermsPage() {
  const { locale, messages } = await getDictionary();

  return (
    <>
      <Header />
      <LegalPage copy={messages.terms} homeHref={localePath(locale, "/")} />
      <Footer />
    </>
  );
}
