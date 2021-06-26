import { cardEffects } from "data/effects";
import { GameEventHandler } from "types";
import { EventBus } from "./EventBus";

export class EffectController {
    private unsubscribers: (() => void)[] = [];

    constructor(eventBus: EventBus) {
        Object.values(cardEffects).forEach((effect) =>
            effect.hooks.forEach((hook) =>
                this.unsubscribers.push(eventBus.on(hook.listen, hook.handle as GameEventHandler))
            )
        );
    }

    unsubscribe = () => {
        this.unsubscribers.forEach((unsubscribe) => unsubscribe());
    };
}
