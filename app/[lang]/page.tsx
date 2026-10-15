import { BuilderSampleSection } from "@/src/components/BuilderSample";
import { FAQs } from "@/src/components/FAQs";
import { Footer } from "@/src/components/Footer";
import { Header } from "@/src/components/Header";
import { HeroSection } from "@/src/components/Hero";
import { Process } from "@/src/components/Process";
import { Projects } from "@/src/components/Projects";
import { Repairs } from "@/src/components/Repairs";
import { Reviews } from "@/src/components/Reviews";
import { Services } from "@/src/components/Services";
import { Standard } from "@/src/components/Standard";
import { getDictionary } from "@/src/i18n/getDictionary";
import { localBusinessJsonLd } from "@/src/i18n/site";

export default async function Home() {
  const { locale, messages } = await getDictionary();
  const jsonLd = JSON.stringify(localBusinessJsonLd(locale, messages.meta.description)).replace(
    /</g,
    "\\u003c",
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <Header />
      <main>
        <HeroSection />
        <Standard />
        <BuilderSampleSection />
        <Services />
        <Repairs />
        <Process />
        <Projects />
        <FAQs />
        <Reviews />
      </main>
      <Footer />
    </>
  );
}
