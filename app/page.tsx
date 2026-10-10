import { BuilderSample } from "@/src/components/BuilderSample";
import { Footer } from "@/src/components/Footer";
import { Header } from "@/src/components/Header";
import { HeroBanner } from "@/src/components/Hero";
import { Process } from "@/src/components/Process";
import { Services } from "@/src/components/Services";
import { Standard } from "@/src/components/Standard";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroBanner />
        <Standard />
        <Services />
        <BuilderSample />
        <Process />
      </main>
      <Footer />
    </>
  );
}
