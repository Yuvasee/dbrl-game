import { knuthShuffle } from "knuth-shuffle";
import { makeAutoObservable } from "mobx";

import { State } from "state";
import { CardDefinitionId, DeckSummary } from "types";
import { Card } from "./Card";
import type { Fighter } from "./Fighter";

const DRAW_HAND_AMOUNT = 6;

export class Deck {
    cards: Partial<Record<string, Card>>;
    deckIds: string[];
    handIds: string[] = [];
    discardedIds: string[] = [];
    expendedIds: string[] = [];
    fighter: Fighter;

    constructor(fighter: Fighter, cards: Record<string, Card>, cardIds: string[]) {
        this.fighter = fighter;
        this.cards = cards;
        Object.values(cards).forEach((card) => card.setDeck(this));
        this.deckIds = knuthShuffle(cardIds);

        makeAutoObservable(this, {}, { autoBind: true });
    }

    get deckLength() {
        return this.deckIds.length;
    }

    get handLength() {
        return this.handIds.length;
    }

    get discardedLength() {
        return this.discardedIds.length;
    }

    get expendedLength() {
        return this.expendedIds.length;
    }

    getCardById = (id: string) => this.cards[id];

    playCard = (cardId: string) => {
        const card = this.getCardById(cardId);
        if (!card || !this.handIds.includes(cardId) || !this.fighter.spendAp(card.actionCost))
            return;

        this.fighter.addBlock(card.calcBlock);

        const battle = State.battle!;
        const opponent = battle.getOpponentOf(this.fighter);
        opponent.takeDamage(card.calcDamage);

        this.discardCard(cardId);
    };

    discardCard = (cardId: string) => {
        const index = this.handIds.indexOf(cardId);
        if (index !== -1) {
            this.discardedIds = this.discardedIds.concat(this.handIds.splice(index, 1));
        }
    };

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
        const cardId = this.deckIds.pop()!;
        this.handIds.push(cardId);

        const card = this.getCardById(cardId)!;
        window.Game.eventBus.emit({ type: "CARD_DRAW", payload: card });
    };

    refreshDeck = () => {
        this.deckIds = knuthShuffle(this.discardedIds);
        this.discardedIds = [];
    };

    static createFromSummary = (fighter: Fighter, deckSummary: DeckSummary) => {
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

        return new Deck(fighter, cards, cardIds);
    };
}
