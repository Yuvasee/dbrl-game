import { makeAutoObservable } from "mobx";
import { v4 as uuidv4 } from "uuid";

import { Deck } from "./Deck";
import { FighterDefinition, DeckSummary } from "types";
import { State } from "state";
import { Battle } from "./Battle";

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
    battle?: Battle;

    constructor(definition: FighterDefinition) {
        this.id = uuidv4();
        this.name = definition.name;
        this.definition = definition;
        this.deckSummary = definition.deckSummary;
        this.hp = definition.baseHp;
        this.ap = definition.baseAp;
        this.deck = Deck.createFromSummary(this, definition.deckSummary);

        makeAutoObservable(this, {}, { autoBind: true });
    }

    setBattle = (battle: Battle) => {
        this.battle = battle;
    };

    resetAp = () => {
        this.ap = this.definition.baseAp;
    };

    heal = (amount: number) => {
        if (this.isDead) return;
        this.hp += amount;
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

    spendAp = (amount: number) => {
        if (this.ap >= amount) {
            this.ap -= amount;
            return true;
        }
        return false;
    };

    die = () => {
        this.hp = 0;
        this.isDead = true;
    };

    makeTurn = () => {
        if (State.battle?.phase !== "NPC") return;

        const { handIds } = this.deck;
        while (this.ap && handIds.length) {
            this.deck.playCard(handIds[0]);
        }
    };
}
