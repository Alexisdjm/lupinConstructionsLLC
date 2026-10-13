import type { Metadata } from "next";
import { ContactForm } from "@/src/components/Contact";
import { Footer } from "@/src/components/Footer";
import { Header } from "@/src/components/Header";
import { Projects } from "@/src/components/Projects";
import { getDictionary } from "@/src/i18n/getDictionary";

export async function generateMetadata(): Promise<Metadata> {
  const { messages } = await getDictionary();
  return {
    title: messages.contact.metaTitle,
    description: messages.contact.metaDescription,
  };
}

export default async function ContactPage() {
  const { messages } = await getDictionary();
  const copy = messages.contact;

  return (
    <>
      <div className="h-19 bg-[#061B2D]">
        <Header />
      </div>
      <main>
        <section className="bg-[#f6f8f9] py-16 sm:py-20 lg:py-24">
          <div className="page-shell">
            <div className="mx-auto max-w-3xl text-center">
              <p className="flex items-center justify-center gap-2 text-[11px] font-semibold tracking-[0.22em] text-[#149e90] uppercase">
                <span className="size-1.5 rounded-full bg-[#2ad9c3]" aria-hidden="true" />
                {copy.eyebrow}
              </p>
              <h1 className="mt-3 text-4xl leading-tight font-medium text-[#172330] sm:text-5xl">{copy.title}</h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#5f6974]">{copy.subtitle}</p>
            </div>
            <div className="mx-auto mt-10 max-w-5xl">
              <ContactForm copy={copy} />
            </div>
          </div>
        </section>
        <Projects />
      </main>
      <Footer />
    </>
  );
}
