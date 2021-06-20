import { VariableValue } from "./generic";

export type CardDefinitionId = "heavy_strike" | "cautious_hit" | "block" | "minorHeal";

export type CardRarity = "Basic" | "Common" | "Uncommon" | "Rare" | "Unique";

export type CardDefinitionEffects = Partial<{
    replenish: boolean;
    heal: number;
}>;

export type CardEffectName = keyof CardDefinitionEffects;

export type CardDefinition = {
    id: CardDefinitionId;
    name: string;
    text: string;
    imageUrl: string;
    rarity: CardRarity;
    actionCost: number;
    damage: VariableValue;
    block: VariableValue;
    effects?: CardDefinitionEffects;
};
