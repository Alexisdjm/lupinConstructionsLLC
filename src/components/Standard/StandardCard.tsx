type StandardCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

export function StandardCard({ title, description, icon }: StandardCardProps) {
  return (
    <article className="group flex items-start gap-3.5 items-center rounded-2xl bg-white px-4 py-4 shadow-[0_8px_24px_rgba(16,24,40,0.05)] ring-1 ring-black/5 transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(16,24,40,0.1)]">
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#dff8f4] text-[#12a394] transition-colors duration-300 group-hover:bg-[#c8f3ec]">
        {icon}
      </span>
      <div className="min-w-0 pt-0.5">
        <h3 className="text-[15px] leading-snug font-semibold text-[#1c2430]">
          {title}
        </h3>
        <p className="mt-1 text-sm leading-snug text-[#6d7580]">{description}</p>
      </div>
    </article>
  );
}
