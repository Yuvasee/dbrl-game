import { image } from "faker";

import { CardDefinition } from "types/card";

export type CardDefinitionId = "heavy_strike" | "cautious_hit" | "block";

export const cards: Record<CardDefinitionId, CardDefinition> = {
    heavy_strike: {
        id: "heavy_strike",
        name: "Heavy strike",
        text: "Hit it hard.",
        imageUrl: image.abstract(60, 40),
        rarity: "Common",
        actionCost: 1,
        damage: {
            min: 3,
            max: 5,
        },
        effects: [],
    },
    cautious_hit: {
        id: "cautious_hit",
        name: "Cautious hit",
        text: "Take care, defend yourself.",
        imageUrl: image.abstract(60, 40),
        rarity: "Common",
        actionCost: 1,
        damage: 2,
        effects: [
            // Block
        ],
    },
    block: {
        id: "block",
        name: "Block",
        text: "Fortify!",
        imageUrl: image.abstract(60, 40),
        rarity: "Common",
        actionCost: 1,
        damage: 0,
        effects: [
            // Block +
        ],
    },
};
