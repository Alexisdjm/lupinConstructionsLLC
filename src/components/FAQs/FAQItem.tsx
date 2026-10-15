type FAQItemProps = {
  id: string;
  question: string;
  answer: string;
  open?: boolean;
};

export function FAQItem({ id, question, answer, open = false }: FAQItemProps) {
  return (
    <details
      id={id}
      name="faqs"
      open={open}
      className="faq-details rounded-xl border border-[#e7edf2] bg-white shadow-[0_8px_24px_rgba(16,24,40,0.04)]"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2ad9c3] [&::-webkit-details-marker]:hidden">
        <h3 className="text-base font-semibold text-[#1c2430]">{question}</h3>
        <svg
          viewBox="0 0 24 24"
          className="faq-chevron size-5 shrink-0 text-[#2ad9c3]"
          aria-hidden="true"
        >
          <path
            d="M6 9l6 6 6-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </summary>
      <p className="px-5 pb-5 text-sm leading-6 text-[#5f6974]">{answer}</p>
    </details>
  );
}
