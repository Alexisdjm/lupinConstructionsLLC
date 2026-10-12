type FAQItemProps = {
  id: string;
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
};

export function FAQItem({ id, question, answer, open, onToggle }: FAQItemProps) {
  const panelId = `${id}-panel`;

  return (
    <article className="rounded-xl border border-[#e7edf2] bg-white shadow-[0_8px_24px_rgba(16,24,40,0.04)]">
      <h3>
        <button
          id={id}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2ad9c3]"
        >
          <span className="text-base font-semibold text-[#1c2430]">{question}</span>
          <svg
            viewBox="0 0 24 24"
            className={`size-5 shrink-0 text-[#2ad9c3] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
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
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={id}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-sm leading-6 text-[#5f6974]">{answer}</p>
        </div>
      </div>
    </article>
  );
}
