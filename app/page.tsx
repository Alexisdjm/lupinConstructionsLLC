import { Header } from "@/src/components/Header";
import { HeroBanner } from "@/src/components/Hero";
import { Process } from "@/src/components/Process";
import { Standard } from "@/src/components/Standard";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroBanner />
        <Standard />
        <Process />
      </main>
    </>
  );
}
