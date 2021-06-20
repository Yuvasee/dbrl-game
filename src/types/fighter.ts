import { DeckSummary } from "./deck";

export type FighterDefinitionId = "paw" | "claw";

export type FighterDefinition = {
    id: FighterDefinitionId;
    name: string;
    baseHp: number;
    baseAp: number;
    deckSummary: DeckSummary;
    imageUrl: string;
};
