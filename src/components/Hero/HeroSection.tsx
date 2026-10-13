import { getDictionary } from "@/src/i18n/getDictionary";
import { HeroBanner } from "./HeroBanner";
import { HeroContent } from "./HeroContent";

export async function HeroSection() {
  const { locale, messages } = await getDictionary();
  const alts = messages.hero.alts;

  return (
    <HeroBanner label={messages.hero.label} alts={[alts[0], alts[1], alts[2]]}>
      <HeroContent locale={locale} copy={messages.hero} />
    </HeroBanner>
  );
}
