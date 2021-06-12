import { CardDefinitionId } from "data/cards";
import { knuthShuffle } from "knuth-shuffle";
import { makeAutoObservable } from "mobx";

/** Card ids and amount of such type */
export type DeckSummary = Partial<Record<CardDefinitionId, number>>;

export class Deck {
    cardIds: CardDefinitionId[] = [];

    constructor(deckSummary: DeckSummary) {
        this.createFromSummary(deckSummary);

        makeAutoObservable(this);
    }

    suffle = () => {
        this.cardIds = knuthShuffle(this.cardIds);
    };

    private createFromSummary = (deckSummary: DeckSummary) =>
        Object.entries(deckSummary).reduce(
            (result, [cardId, amount]) =>
                result.concat(
                    Array.from({ length: amount }).map(
                        () => cardId
                    ) as CardDefinitionId[]
                ),
            [] as CardDefinitionId[]
        );
}
