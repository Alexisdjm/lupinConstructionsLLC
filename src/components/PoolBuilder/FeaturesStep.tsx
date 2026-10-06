import { DECKS, LIGHTING } from "./config";
import { ChoiceCard, MaterialPicker, ToggleRow } from "./controls";
import type { PoolConfig } from "./types";

type FeaturesStepProps = {
  config: PoolConfig;
  onChange: (patch: Partial<PoolConfig>) => void;
};

export function FeaturesStep({ config, onChange }: FeaturesStepProps) {
  return (
    <div className="space-y-6">
      <MaterialPicker
        label="Deck"
        options={DECKS}
        selected={config.deck}
        onSelect={(deck) => onChange({ deck })}
      />

      <div>
        <p className="text-[11px] font-medium tracking-[0.16em] text-white/40 uppercase">Lighting</p>
        <div className="mt-3 grid gap-2">
          {LIGHTING.map((lighting) => (
            <ChoiceCard
              key={lighting.id}
              selected={config.lighting === lighting.id}
              title={lighting.label}
              detail={lighting.detail}
              onSelect={() => onChange({ lighting: lighting.id })}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="text-[11px] font-medium tracking-[0.16em] text-white/40 uppercase">Extras</p>
        <div className="mt-3 grid gap-2">
          <ToggleRow
            checked={config.spa}
            title="Attached spa"
            detail="A square spa set against the main pool."
            onToggle={() => onChange({ spa: !config.spa })}
          />
          <ToggleRow
            checked={config.fountain}
            title="Fountain"
            detail="A small fountain on the deck beside the pool."
            onToggle={() => onChange({ fountain: !config.fountain })}
          />
          <ToggleRow
            checked={config.heater}
            title="Heater"
            detail="Gas heat so the water stays swim-ready."
            onToggle={() => onChange({ heater: !config.heater })}
          />
          <ToggleRow
            checked={config.bubbles}
            title="Bubble jets"
            detail="A sheet of bubbles across the pool floor."
            onToggle={() => onChange({ bubbles: !config.bubbles })}
          />
        </div>
      </div>
    </div>
  );
}
