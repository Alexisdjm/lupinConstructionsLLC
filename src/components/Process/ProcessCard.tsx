type ProcessCardProps = {
  step: string;
  title: string;
  description: string;
  duration: string;
  icon: React.ReactNode;
};

export function ProcessCard({
  step,
  title,
  description,
  duration,
  icon,
}: ProcessCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-[#102c38] p-5 transition duration-300 ease-out hover:-translate-y-1 hover:border-white/20">
      <div className="flex items-start justify-between">
        <span className="text-sm font-medium text-[#8ea3ae]">{step}</span>
        <span className="grid size-9 place-items-center rounded-lg border border-white/10 text-[#9fb4bf]">
          {icon}
        </span>
      </div>
      <h3 className="mt-6 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#9aadb6]">{description}</p>
      <p className="mt-6 flex items-center gap-2 text-sm text-[#8ea3ae]">
        <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
          <circle
            cx="12"
            cy="12"
            r="8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <path
            d="M12 8v4.5l3 1.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {duration}
      </p>
    </article>
  );
}
