import { makeAutoObservable } from "mobx";
import { v4 as uuidv4 } from "uuid";

import { CardDefinition, CardDefinitionId, VariableValue } from "types";
import { cardDefinitions } from "data/cards";
import { calcVariableValue } from "utils";
import { Deck } from "./Deck";

export class Card {
    id: string;
    definition: CardDefinition;
    actionCost: number;
    damage: VariableValue;
    block: VariableValue;
    deck?: Deck;

    constructor(definitionId: CardDefinitionId) {
        this.definition = Card.getDefinitionById(definitionId);
        this.id = this.definition.name + uuidv4();
        this.actionCost = this.definition.actionCost;
        this.damage = this.definition.damage;
        this.block = this.definition.block;

        makeAutoObservable(this, {}, { autoBind: true });
    }

    get calcDamage(): number {
        return calcVariableValue(this.damage);
    }

    get calcBlock(): number {
        return calcVariableValue(this.block);
    }

    get damageText() {
        const { damage } = this.definition;

        if (!damage) return "";

        return typeof damage === "number" ? damage + "" : `${damage.min}-${damage.max}`;
    }

    get blockText() {
        const { block } = this.definition;

        if (!block) return "";

        return typeof block === "number" ? block + "" : `${block.min}-${block.max}`;
    }

    setDeck = (deck: Deck) => {
        this.deck = deck;
    };

    static getDefinitionById = (id: CardDefinitionId): CardDefinition => cardDefinitions[id];
}
