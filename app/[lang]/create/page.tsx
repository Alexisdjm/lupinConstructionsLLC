import type { Metadata } from "next";
import { PoolBuilder } from "@/src/components/PoolBuilder";
import { getDictionary } from "@/src/i18n/getDictionary";
import { pageMetadata } from "@/src/i18n/site";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, messages } = await getDictionary();
  return pageMetadata(
    locale,
    "/create",
    messages.create.title,
    messages.create.description,
  );
}

export default async function CreatePage() {
  const { locale, messages } = await getDictionary();
  return (
    <PoolBuilder
      locale={locale}
      copy={messages.wizard}
      region={messages.header.region}
    />
  );
}
