import { getDictionary } from "@/src/i18n/getDictionary";
import { BuilderSample } from "./BuilderSample";

export async function BuilderSampleSection() {
  const { locale, messages } = await getDictionary();
  return <BuilderSample locale={locale} copy={messages.builder} />;
}
