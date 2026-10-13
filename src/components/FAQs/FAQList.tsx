"use client";

import { useState } from "react";
import { PrimaryCTA } from "@/src/components/UXUI/PrimaryCTA";
import { FAQItem } from "./FAQItem";

type FAQEntry = {
  id: string;
  question: string;
  answer: string;
};

type FAQListProps = {
  items: FAQEntry[];
  cta: string;
  ctaHref: string;
};

export function FAQList({ items, cta, ctaHref }: FAQListProps) {
  const [openId, setOpenId] = useState(items[0]?.id ?? "");

  return (
    <>
      <div className="mx-auto mt-10 flex flex-col gap-3">
        {items.map((item) => (
          <FAQItem
            key={item.id}
            id={item.id}
            question={item.question}
            answer={item.answer}
            open={openId === item.id}
            onToggle={() =>
              setOpenId((current) => (current === item.id ? "" : item.id))
            }
          />
        ))}
      </div>

      <div className="mt-8">
        <PrimaryCTA href={ctaHref}>{cta}</PrimaryCTA>
      </div>
    </>
  );
}
