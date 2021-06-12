import { makeAutoObservable } from "mobx";
import uuid from "uuid";

import { CardDefinitionId, cards } from "data/cards";
import { CardDefinition } from "types/card";

export class Card {
    id: string;

    definition: CardDefinition;

    constructor(definitionId: CardDefinitionId) {
        this.id = uuid.v4();
        this.definition = Card.getDefinitionById(definitionId);
        makeAutoObservable(this);
    }

    static getDefinitionById = (id: CardDefinitionId): CardDefinition =>
        cards[id];
}
