import { makeAutoObservable } from "mobx";
import { v4 as uuidv4 } from "uuid";

import { CardDefinitionId, cards } from "data/cards";
import { CardDefinition } from "types/card";

export class Card {
    id: string;

    definition: CardDefinition;

    constructor(definitionId: CardDefinitionId) {
        this.id = uuidv4();
        this.definition = Card.getDefinitionById(definitionId);

        makeAutoObservable(this);
    }

    static getDefinitionById = (id: CardDefinitionId): CardDefinition =>
        cards[id];

    get damageText() {
        const { damage } = this.definition;

        if (!damage) return "";

        return typeof damage === "number"
            ? damage + ""
            : `${damage.min}-${damage.max}`;
    }

    get blockText() {
        const { block } = this.definition;

        if (!block) return "";

        return typeof block === "number"
            ? block + ""
            : `${block.min}-${block.max}`;
    }
}
