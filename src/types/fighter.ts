import { DeckSummary } from "state/Deck";

export type FighterDefinition = {
    id: string;
    name: string;
    baseHp: number;
    baseAp: number;
    deckSummary: DeckSummary;
    imageUrl: string;
};
