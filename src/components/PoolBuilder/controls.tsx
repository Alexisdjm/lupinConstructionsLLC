import type { ReactNode } from "react";

export function ChoiceCard({
  selected,
  title,
  detail,
  onSelect,
  icon,
}: {
  selected: boolean;
  title: string;
  detail: string;
  onSelect: () => void;
  icon?: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={`flex items-start gap-3 rounded-2xl border px-3.5 py-3 text-left transition-colors ${
        selected
          ? "border-[#2ad9c3] bg-[#2ad9c3]/10"
          : "border-white/10 bg-white/[0.03] hover:border-white/25"
      }`}
    >
      {icon ? <span className="mt-0.5 shrink-0 text-[#2ad9c3]">{icon}</span> : null}
      <span className="min-w-0">
        <span className="block text-sm font-medium text-white">{title}</span>
        <span className="mt-0.5 block text-xs leading-relaxed text-white/55">{detail}</span>
      </span>
    </button>
  );
}

export function MaterialPicker<T extends string>({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: { id: T; label: string; detail: string; swatch: string }[];
  selected: T;
  onSelect: (id: T) => void;
}) {
  return (
    <div>
      <p className="text-[11px] font-medium tracking-[0.16em] text-white/40 uppercase">{label}</p>
      <div className="mt-3 grid gap-2">
        {options.map((option) => (
          <ChoiceCard
            key={option.id}
            selected={selected === option.id}
            title={option.label}
            detail={option.detail}
            icon={
              <span
                className="mt-1 block size-4 rounded-full border border-white/20"
                style={{ backgroundColor: option.swatch }}
              />
            }
            onSelect={() => onSelect(option.id)}
          />
        ))}
      </div>
    </div>
  );
}

export function ToggleRow({
  checked,
  title,
  detail,
  onToggle,
}: {
  checked: boolean;
  title: string;
  detail: string;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-3.5 py-3">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-white">{title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-white/55">{detail}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={title}
        onClick={onToggle}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
          checked ? "bg-[#2ad9c3]" : "bg-white/15"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 size-6 rounded-full bg-white transition-transform duration-200 ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

export function NumberField({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-medium tracking-[0.14em] text-white/45 uppercase">
        {label}
      </span>
      <input
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={Number.isFinite(value) ? value : ""}
        onChange={(event) => onChange(event.target.value === "" ? Number.NaN : Number(event.target.value))}
        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none transition-colors focus:border-[#2ad9c3]"
      />
    </label>
  );
}

export function TextField({
  id,
  label,
  value,
  error,
  type = "text",
  autoComplete,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block" htmlFor={id}>
      <span className="mb-1.5 block text-[11px] font-medium tracking-[0.14em] text-white/45 uppercase">
        {label}
      </span>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        value={value}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={`w-full rounded-xl border bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none transition-colors focus:border-[#2ad9c3] ${
          error ? "border-rose-400/70" : "border-white/10"
        }`}
      />
      {error ? (
        <span id={`${id}-error`} className="mt-1 block text-xs text-rose-300">
          {error}
        </span>
      ) : null}
    </label>
  );
}
