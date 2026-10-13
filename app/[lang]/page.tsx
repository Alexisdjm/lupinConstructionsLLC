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

export default function Home() {
  return (
    <>
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
