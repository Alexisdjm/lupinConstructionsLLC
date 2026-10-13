import { COPINGS, INTERIORS } from "./config";
import { ChoiceCard, MaterialPicker } from "./controls";
import type { WizardCopy } from "./PoolBuilder";
import type { PoolConfig } from "./types";

type InteriorStepProps = {
  config: PoolConfig;
  copy: WizardCopy["interior"];
  onChange: (patch: Partial<PoolConfig>) => void;
};

export function InteriorStep({ config, copy, onChange }: InteriorStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] font-medium tracking-[0.16em] text-white/40 uppercase">{copy.finish}</p>
        <div className="mt-3 grid gap-2">
          {INTERIORS.map((interior) => (
            <ChoiceCard
              key={interior.id}
              selected={config.interior === interior.id}
              title={copy.interiors[interior.id].label}
              detail={copy.interiors[interior.id].detail}
              onSelect={() => onChange({ interior: interior.id })}
            />
          ))}
        </div>
      </div>
      <MaterialPicker
        label={copy.coping}
        options={COPINGS.map((coping) => ({ ...coping, ...copy.copings[coping.id] }))}
        selected={config.coping}
        onSelect={(coping) => onChange({ coping })}
      />
    </div>
  );
}
