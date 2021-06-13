import { makeAutoObservable } from "mobx";
import { v4 as uuidv4 } from "uuid";

import { Deck, DeckSummary } from "./Deck";
import { FighterDefinition } from "types/fighter";

export class Fighter {
    id: string;
    name: string;
    definition: FighterDefinition;
    deckSummary: DeckSummary;
    hp: number;
    ap: number;
    defence = 0;
    deck: Deck;

    constructor(definition: FighterDefinition) {
        this.id = uuidv4();
        this.name = definition.name;
        this.definition = definition;
        this.deckSummary = definition.deckSummary;
        this.hp = definition.baseHp;
        this.ap = definition.baseAp;
        this.deck = Deck.createFromSummary(definition.deckSummary);

        makeAutoObservable(this);
    }
}
