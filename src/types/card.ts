import { CardDefinitionId } from "data/cards";

export type CardDamage =
    | number
    | {
          min: number;
          max: number;
      };

export type CardEffect = {};

export type CardRarity = "Basic" | "Common" | "Uncommon" | "Rare" | "Unique";

export type CardDefinition = {
    id: CardDefinitionId;
    name: string;
    text: string;
    imageUrl: string;
    rarity: CardRarity;
    actionCost: number;
    damage: CardDamage;
    effects: CardEffect[];
};
