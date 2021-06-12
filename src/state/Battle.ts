import { makeAutoObservable } from "mobx";
import { Deck } from "./Deck";

export class Battle {
    deck: Deck;

    constructor(deck: Deck) {
        this.deck = deck;

        makeAutoObservable(this);
    }
}
