import { DECKS, LIGHTING } from "./config";
import { ChoiceCard, MaterialPicker, ToggleRow } from "./controls";
import type { WizardCopy } from "./PoolBuilder";
import type { PoolConfig } from "./types";

type FeaturesStepProps = {
  config: PoolConfig;
  copy: WizardCopy["features"];
  onChange: (patch: Partial<PoolConfig>) => void;
};

export function FeaturesStep({ config, copy, onChange }: FeaturesStepProps) {
  return (
    <div className="space-y-6">
      <MaterialPicker
        label={copy.deck}
        options={DECKS.map((deck) => ({ ...deck, ...copy.decks[deck.id] }))}
        selected={config.deck}
        onSelect={(deck) => onChange({ deck })}
      />

      <div>
        <p className="text-[11px] font-medium tracking-[0.16em] text-white/40 uppercase">{copy.lighting}</p>
        <div className="mt-3 grid gap-2">
          {LIGHTING.map((lighting) => (
            <ChoiceCard
              key={lighting.id}
              selected={config.lighting === lighting.id}
              title={copy.lightings[lighting.id].label}
              detail={copy.lightings[lighting.id].detail}
              onSelect={() => onChange({ lighting: lighting.id })}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="text-[11px] font-medium tracking-[0.16em] text-white/40 uppercase">{copy.extras}</p>
        <div className="mt-3 grid gap-2">
          <ToggleRow
            checked={config.spa}
            title={copy.spa.label}
            detail={copy.spa.detail}
            onToggle={() => onChange({ spa: !config.spa })}
          />
          <ToggleRow
            checked={config.fountain}
            title={copy.fountain.label}
            detail={copy.fountain.detail}
            onToggle={() => onChange({ fountain: !config.fountain })}
          />
          <ToggleRow
            checked={config.heater}
            title={copy.heater.label}
            detail={copy.heater.detail}
            onToggle={() => onChange({ heater: !config.heater })}
          />
          <ToggleRow
            checked={config.bubbles}
            title={copy.bubbles.label}
            detail={copy.bubbles.detail}
            onToggle={() => onChange({ bubbles: !config.bubbles })}
          />
        </div>
      </div>
    </div>
  );
}
