import { CardDefinitionId } from "data/cards";
import { knuthShuffle } from "knuth-shuffle";
import { makeAutoObservable } from "mobx";
import { Card } from "./Card";

/** Card ids and amount of such type */
export type DeckSummary = Partial<Record<CardDefinitionId, number>>;

const DRAW_HAND_AMOUNT = 6;

export class Deck {
    cards: Partial<Record<string, Card>>;
    deckIds: string[];
    handIds: string[] = [];
    discardedIds: string[] = [];
    expendedIds: string[] = [];

    constructor(cards: Record<string, Card>, cardIds: string[]) {
        this.cards = cards;
        this.deckIds = knuthShuffle(cardIds);

        makeAutoObservable(this, {}, { autoBind: true });
    }

    getCardById = (id: string) => this.cards[id];

    discardHand = () => {
        this.discardedIds = this.discardedIds.concat(this.handIds);
        this.handIds = [];
    };

    drawHand = () => {
        this.discardHand();
        for (let i = 0; i < DRAW_HAND_AMOUNT; i++) {
            this.drawCard();
        }
    };

    drawCard = () => {
        if (!this.deckIds.length) {
            this.refreshDeck();
        }
        this.handIds.push(this.deckIds.pop()!);
    };

    refreshDeck = () => {
        this.deckIds = knuthShuffle(this.discardedIds);
        this.discardedIds = [];
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
