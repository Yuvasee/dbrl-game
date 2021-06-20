import { CardEffectName, CardEffectHook, EventBusSubscriber } from "types";
import { Card } from "./Card";
import { Game } from "./Game";

export class EffectController {
    private effects: Record<CardEffectName, CardEffectHook[]> = {
        replenish: [
            {
                listen: "CARD_DRAW",
                handle: (card: Card, game: Game) => {
                    if (!card.definition.effects?.replenish) return;
                    game.battle?.getActivePlayer().deck.drawCard();
                },
            },
        ],
        heal: [],
    };

    private unsubscribers: (() => void)[] = [];

    constructor(onEvent: EventBusSubscriber) {
        Object.values(this.effects).forEach((effect) =>
            effect.forEach((hook) => this.unsubscribers.push(onEvent(hook.listen, hook.handle)))
        );
    }

    unsubscribe = () => {
        this.unsubscribers.forEach((unsubscribe) => unsubscribe());
    };
}
