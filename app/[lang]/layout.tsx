import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { PageTransition } from "@/src/components/UXUI/PageTransition";
import { ScrollToTop } from "@/src/components/UXUI/ScrollToTop";
import { getDictionary } from "@/src/i18n/getDictionary";
import { hasLocale, locales } from "@/src/i18n/locales";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const { messages } = await getDictionary();
  return {
    title: messages.meta.title,
    description: messages.meta.description,
    icons: {
      icon: "/svgs/lupin.svg",
      apple: "/svgs/lupin.svg",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { messages } = await getDictionary();

  return (
    <html
      lang={lang}
      className={`${inter.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PageTransition />
        <ScrollToTop label={messages.scrollTop} />
        {children}
      </body>
    </html>
  );
}
