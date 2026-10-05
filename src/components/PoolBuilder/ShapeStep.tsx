import { SIZE_PRESETS, SHAPES, dimensionsValid } from "./config";
import { ChoiceCard, NumberField } from "./controls";
import type { PoolConfig } from "./types";

function ShapeIcon({ id }: { id: PoolConfig["shape"] }) {
  const common = "h-8 w-10";
  if (id === "rectangular") {
    return (
      <svg viewBox="0 0 40 32" className={common} aria-hidden="true">
        <rect x="4" y="6" width="32" height="20" rx="3" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }
  if (id === "l-shape") {
    return (
      <svg viewBox="0 0 40 32" className={common} aria-hidden="true">
        <path d="M5 6h16v8h14v12H5V6z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }
  if (id === "lap") {
    return (
      <svg viewBox="0 0 40 32" className={common} aria-hidden="true">
        <rect x="3" y="12" width="34" height="8" rx="3" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 40 32" className={common} aria-hidden="true">
      <path
        d="M10 16c2-7 10-9 16-6 5 2 8 7 6 12-2 6-9 8-16 6-6-1-9-6-6-12z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

type ShapeStepProps = {
  config: PoolConfig;
  error: string;
  onChange: (patch: Partial<PoolConfig>) => void;
};

export function ShapeStep({ config, error, onChange }: ShapeStepProps) {
  const activePreset = SIZE_PRESETS.find(
    (preset) =>
      preset.length === config.length && preset.width === config.width && preset.depth === config.depth,
  )?.id;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] font-medium tracking-[0.16em] text-white/40 uppercase">Pool size</p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {SIZE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              aria-pressed={activePreset === preset.id}
              onClick={() =>
                onChange({ length: preset.length, width: preset.width, depth: preset.depth })
              }
              className={`rounded-2xl border px-2 py-3 text-center transition-colors ${
                activePreset === preset.id
                  ? "border-[#2ad9c3] bg-[#2ad9c3]/10"
                  : "border-white/10 bg-white/[0.03] hover:border-white/25"
              }`}
            >
              <span className="block text-sm font-medium text-white">{preset.label}</span>
              <span className="mt-1 block text-[11px] text-white/50">
                {preset.length}×{preset.width}
              </span>
            </button>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <NumberField
            label="Length"
            min={10}
            max={80}
            value={config.length}
            onChange={(length) => onChange({ length })}
          />
          <NumberField
            label="Width"
            min={6}
            max={40}
            value={config.width}
            onChange={(width) => onChange({ width })}
          />
          <NumberField
            label="Depth"
            min={3}
            max={12}
            value={config.depth}
            onChange={(depth) => onChange({ depth })}
          />
        </div>
        <p className={`mt-2 text-xs ${error || !dimensionsValid(config) ? "text-rose-300" : "text-white/40"}`}>
          {error || "Feet. Length 10–80, width 6–40, depth 3–12."}
        </p>
      </div>

      <div>
        <p className="text-[11px] font-medium tracking-[0.16em] text-white/40 uppercase">Pool shape</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {SHAPES.map((shape) => (
            <ChoiceCard
              key={shape.id}
              selected={config.shape === shape.id}
              title={shape.label}
              detail={shape.detail}
              icon={<ShapeIcon id={shape.id} />}
              onSelect={() => onChange({ shape: shape.id })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
