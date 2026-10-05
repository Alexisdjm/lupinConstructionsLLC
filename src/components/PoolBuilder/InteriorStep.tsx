import { COPINGS, INTERIORS } from "./config";
import { ChoiceCard, MaterialPicker } from "./controls";
import type { PoolConfig } from "./types";

type InteriorStepProps = {
  config: PoolConfig;
  onChange: (patch: Partial<PoolConfig>) => void;
};

export function InteriorStep({ config, onChange }: InteriorStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] font-medium tracking-[0.16em] text-white/40 uppercase">Interior finish</p>
        <div className="mt-3 grid gap-2">
          {INTERIORS.map((interior) => (
            <ChoiceCard
              key={interior.id}
              selected={config.interior === interior.id}
              title={interior.label}
              detail={interior.detail}
              onSelect={() => onChange({ interior: interior.id })}
            />
          ))}
        </div>
      </div>
      <MaterialPicker
        label="Coping"
        options={COPINGS}
        selected={config.coping}
        onSelect={(coping) => onChange({ coping })}
      />
    </div>
  );
}
