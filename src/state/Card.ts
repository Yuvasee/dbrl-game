import { makeAutoObservable } from "mobx";
import { v4 as uuidv4 } from "uuid";

import { CardDefinitionId, cards } from "data/cards";
import { CardDefinition } from "types/card";
import { VariableValue } from "types/generic";
import { calcVariableValue } from "utils";

export class Card {
    id: string;
    definition: CardDefinition;
    actionCost: number;
    damage: VariableValue;
    block: VariableValue;

    constructor(definitionId: CardDefinitionId) {
        this.id = uuidv4();
        this.definition = Card.getDefinitionById(definitionId);
        this.actionCost = this.definition.actionCost;
        this.damage = this.definition.damage;
        this.block = this.definition.block;

        makeAutoObservable(this);
    }

    static getDefinitionById = (id: CardDefinitionId): CardDefinition =>
        cards[id];

    get calcDamage(): number {
        return calcVariableValue(this.damage);
    }

    get calcBlock(): number {
        return calcVariableValue(this.block);
    }

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
