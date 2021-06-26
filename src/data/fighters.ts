import { FighterDefinition, FighterDefinitionId } from "types/fighter";

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
            minorHeal: 2,
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
            minorHeal: 2,
        },
        imageUrl: "",
    },
};
