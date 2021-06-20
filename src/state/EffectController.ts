import { CardEffectName, CardEffectHook, EventBusSubscriber } from "types";
import { Card } from "./Card";
import { Game } from "./Game";

export class EffectController {
    private effects: Record<CardEffectName, CardEffectHook[]> = {
        replenish: [
            {
                listen: "CARD_DRAW_AFTER",
                handle: (card: Card, _game: Game) => {
                    if (!card.definition.effects?.replenish) return;
                    card.deck?.drawCard();
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
