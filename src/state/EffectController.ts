import { effects } from "data/effects";
import { EventBusSubscriber } from "types";

export class EffectController {
    private unsubscribers: (() => void)[] = [];

    constructor(onEvent: EventBusSubscriber) {
        Object.values(effects).forEach((effect) =>
            effect.hooks.forEach((hook) =>
                this.unsubscribers.push(onEvent(hook.listen, hook.handle))
            )
        );
    }

    unsubscribe = () => {
        this.unsubscribers.forEach((unsubscribe) => unsubscribe());
    };
}
