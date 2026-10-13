import type { Metadata } from "next";
import { PoolBuilder } from "@/src/components/PoolBuilder";
import { getDictionary } from "@/src/i18n/getDictionary";

export async function generateMetadata(): Promise<Metadata> {
  const { messages } = await getDictionary();
  return {
    title: messages.create.title,
    description: messages.create.description,
  };
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
