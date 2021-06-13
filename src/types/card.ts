import { CardDefinitionId } from "data/cards";
import { VariableValue } from "./generic";

export type CardEffect = {};

export type CardRarity = "Basic" | "Common" | "Uncommon" | "Rare" | "Unique";

export type CardDefinition = {
    id: CardDefinitionId;
    name: string;
    text: string;
    imageUrl: string;
    rarity: CardRarity;
    actionCost: number;
    damage: VariableValue;
    block: VariableValue;
    effects: CardEffect[];
};
