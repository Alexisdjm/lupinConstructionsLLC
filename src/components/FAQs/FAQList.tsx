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
  return (
    <>
      <div className="mx-auto mt-10 flex flex-col gap-3">
        {items.map((item, index) => (
          <FAQItem
            key={item.id}
            id={item.id}
            question={item.question}
            answer={item.answer}
            open={index === 0}
          />
        ))}
      </div>

      <div className="mt-8">
        <PrimaryCTA hoverColor="#C4FCFA" href={ctaHref}>
          {cta}
        </PrimaryCTA>
      </div>
    </>
  );
}
