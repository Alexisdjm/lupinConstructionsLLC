type Choice = {
  id: string;
  label: string;
  description?: string;
  selected: boolean;
  onSelect: () => void;
};

type OptionCardProps = {
  title: string;
  choices: Choice[];
  note?: string;
  placement: "above" | "below";
  align: "start" | "center" | "end";
};

const ALIGN = {
  start: "left-0",
  center: "left-1/2 -translate-x-1/2",
  end: "right-0",
} as const;

export function OptionCard({ title, choices, note, placement, align }: OptionCardProps) {
  const position =
    placement === "above"
      ? `bottom-7 ${ALIGN[align]}`
      : `top-7 ${ALIGN[align]}`;

  return (
    <div
      role="dialog"
      aria-label={title}
      className={`absolute z-30 w-64 ${position}`}
    >
      <div className="rounded-[12px] border border-white/10 bg-[#0b1c28]/95 p-3 shadow-[0_18px_40px_rgba(0,0,0,0.4)] backdrop-blur-md">
        <p className="px-1 text-[10px] font-semibold tracking-[0.18em] text-[#2ad9c3] uppercase">
          {title}
        </p>
        <div className="mt-2 grid gap-1.5">
          {choices.map((choice) => (
            <button
              key={choice.id}
              type="button"
              aria-pressed={choice.selected}
              onClick={choice.onSelect}
              className={`flex items-start gap-3 rounded-[12px] border px-3 py-2.5 text-left transition-colors ${
                choice.selected
                  ? "border-[#2ad9c3]/80 bg-[#123848]"
                  : "border-white/10 bg-white/[0.04] hover:border-white/25"
              }`}
            >
              <span
                className={`mt-0.5 grid size-4 shrink-0 place-items-center rounded-full border ${
                  choice.selected ? "border-[#2ad9c3]" : "border-white/40"
                }`}
                aria-hidden="true"
              >
                {choice.selected ? (
                  <span className="size-2 rounded-full bg-[#2ad9c3]" />
                ) : null}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-white">
                  {choice.label}
                </span>
                {choice.description ? (
                  <span className="mt-0.5 block text-xs leading-4 text-white/60">
                    {choice.description}
                  </span>
                ) : null}
              </span>
            </button>
          ))}
        </div>
        {note ? (
          <p className="mt-2 px-1 text-[11px] text-white/45">{note}</p>
        ) : null}
      </div>
    </div>
  );
}
