import { CardDefinitionId } from "data/cards";
import { knuthShuffle } from "knuth-shuffle";
import { makeAutoObservable } from "mobx";
import { Card } from "./Card";

/** Card ids and amount of such type */
export type DeckSummary = Partial<Record<CardDefinitionId, number>>;

export class Deck {
    cards: Record<string, Card>;

    cardIds: string[];

    constructor(cards: Record<string, Card>, cardIds: string[]) {
        this.cards = cards;
        this.cardIds = cardIds;

        makeAutoObservable(this);
    }

    suffle = () => {
        this.cardIds = knuthShuffle(this.cardIds);
    };

    static createFromSummary = (deckSummary: DeckSummary) => {
        const cardsArray = Object.entries(deckSummary).reduce(
            (result, [cardDefId, amount]) =>
                result.concat(
                    Array.from({ length: amount }).map(
                        () => new Card(cardDefId as CardDefinitionId)
                    ) as Card[]
                ),
            [] as Card[]
        );

        const cards = cardsArray.reduce((result, card) => {
            result[card.id] = card;
            return result;
        }, {} as Record<string, Card>);

        const cardIds = cardsArray.map((card) => card.id);

        return new Deck(cards, cardIds);
    };
}
