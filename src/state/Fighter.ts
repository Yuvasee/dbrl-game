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
    block = 0;
    deck: Deck;
    isDead = false;

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

    resetAp = () => {
        this.ap = this.definition.baseAp;
    };

    takeDamage = (damage: number) => {
        let damageLeft = this.absorbDamageWithDefence(damage);
        if (!damageLeft) return;

        if (this.hp > damageLeft) {
            this.hp -= damageLeft;
            return;
        }

        this.die();
    };

    addBlock = (block: number) => {
        this.block += block;
    };

    absorbDamageWithDefence = (damage: number): number => {
        if (!this.block) return damage;

        if (this.block >= damage) {
            this.block -= damage;
            return 0;
        }

        const damageLeft = damage - this.block;
        this.block = 0;
        return damageLeft;
    };

    die = () => {
        this.hp = 0;
        this.isDead = true;
    };
}
