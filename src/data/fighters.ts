import { FighterDefinition } from "types/fighter";

export type FighterDefinitionId = "paw" | "claw";

export const fighters: Record<FighterDefinitionId, FighterDefinition> = {
    paw: {
        id: "paw",
        name: "Paw",
        baseHp: 30,
        baseAp: 3,
        deckSummary: {
            heavy_strike: 5,
            cautious_hit: 5,
            block: 5,
        },
        imageUrl: "",
    },
    claw: {
        id: "claw",
        name: "Claw",
        baseHp: 30,
        baseAp: 3,
        deckSummary: {
            heavy_strike: 5,
            cautious_hit: 5,
            block: 5,
        },
        imageUrl: "",
    },
};
