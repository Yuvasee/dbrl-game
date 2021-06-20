import { Subject } from "rxjs";
import { filter } from "rxjs/operators";

import { EventBusSubscriber, GameEventType, GameEventHandler, EventType } from "types";
import { logEvent } from "utils";
import { Game } from "./Game";

export class EventBus {
    game: Game;
    private subject: Subject<EventType>;

    constructor(game: Game) {
        this.game = game;
        this.subject = new Subject<EventType>();
    }

    emit = (event: EventType) => {
        logEvent(event);
        this.subject.next(event);
    };

    on: EventBusSubscriber = (eventType: GameEventType, handler: GameEventHandler) => {
        const subscription = this.subject
            .pipe(filter((event) => event.type === eventType))
            .subscribe({ next: (event) => handler(event.payload, this.game) });

        return subscription.unsubscribe;
    };
}
