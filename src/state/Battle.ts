import { makeAutoObservable } from "mobx";

import { Deck } from "./Deck";

export class Battle {
    deck: Deck;

    constructor(deck: Deck) {
        this.deck = deck;

        makeAutoObservable(this);
    }

    static startNew = () => {
        const deck = Deck.createFromSummary({
            heavy_strike: 5,
            cautious_hit: 5,
            block: 5,
        });
        return new Battle(deck);
    };
}
