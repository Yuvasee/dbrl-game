import { Card } from "state/Card";
import { Game } from "state/Game";
import { CardEffectName, CardEffect } from "types";

export const effects: Record<CardEffectName, CardEffect> = {
    replenish: {
        name: "replenish",
        hooks: [
            {
                listen: "CARD_DRAW_AFTER",
                handle: (card: Card, _game: Game) => {
                    if (!card.definition.effects?.replenish) return;
                    card.deck?.drawCard();
                },
            },
        ],
    },
    heal: {
        name: "heal",
        hooks: [],
    },
};
