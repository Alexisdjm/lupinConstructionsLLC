"use client";

import { useState } from "react";
import { PrimaryCTA } from "@/src/components/UXUI/PrimaryCTA";
import { FAQItem } from "./FAQItem";

const QUESTIONS = [
  {
    id: "cost",
    question: "How much does it cost to build a custom pool?",
    answer:
      "Every pool project is unique. Pricing depends on factors such as pool size, selected materials, site conditions, engineering, permits, and additional features. Our team reviews your project requirements before preparing a personalized quote.",
  },
  {
    id: "customize",
    question: "Can I customize my pool using your online builder?",
    answer:
      "Yes. The builder lets you explore shape, interior finish, coping, deck, water features, and lighting, then send that design to our team.",
  },
  {
    id: "price",
    question: "Does the Pool Builder provide an instant price?",
    answer:
      "No. The builder is a visual preview. Materials, dimensions, and pricing are confirmed after our team reviews your design and your site.",
  },
  {
    id: "permits",
    question: "Do you handle permits and construction requirements?",
    answer:
      "Yes. Our licensed team manages engineering, permits, inspections, and construction from the approved plans through your pool orientation.",
  },
  {
    id: "timeline",
    question: "How long does it take to build a pool?",
    answer:
      "Most projects take about 10–14 weeks once permits are approved. The schedule depends on the design, site conditions, and inspection timing.",
  },
  {
    id: "after-submit",
    question: "What happens after I submit my pool design?",
    answer:
      "Our team reviews your submission and sends a tailored proposal by email, usually within 24 hours, followed by a complimentary site visit.",
  },
] as const;

export function FAQs() {
  const [openId, setOpenId] = useState<string>(QUESTIONS[0].id);

  return (
    <section id="faqs" className="scroll-mt-24 bg-white py-16 lg:py-20">
      <div className="page-shell">
        <div className="mx-auto">
          <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] text-[#149e90] uppercase">
            <span className="size-1.5 rounded-full bg-[#2ad9c3]" aria-hidden="true" />
            Frequently Asked Questions
          </p>
          <h2 className="mt-3 text-3xl leading-tight font-medium text-[#1c2430] sm:text-4xl">
            Everything You Need to Know Before Getting Started.
          </h2>
          <p className="mt-4 text-base leading-6 text-[#5f6974]">
            Planning a custom pool comes with important questions. We&apos;re here
            to help you understand the process.
          </p>
        </div>

        <div className="mx-auto mt-10 flex flex-col gap-3">
          {QUESTIONS.map((item) => (
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
          <PrimaryCTA href="/#quote">Still Have Questions? Contact Our Team</PrimaryCTA>
        </div>
      </div>
    </section>
  );
}
