import { Card } from "state/Card";
import { Game } from "state/Game";
import { GameEffectName, GameEffect, CardEvent } from "types";

export const cardEffects: Record<GameEffectName, GameEffect<CardEvent>> = {
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
