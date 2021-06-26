import { Subject } from "rxjs";
import { filter } from "rxjs/operators";

import { GameEventType, GameEventHandler, GameEvent } from "types";
import { logEvent } from "utils";
import { Game } from "./Game";

export class EventBus {
    game: Game;
    private subject: Subject<GameEvent>;

    constructor(game: Game) {
        this.game = game;
        this.subject = new Subject<GameEvent>();
    }

    emit = (event: GameEvent) => {
        logEvent(event);
        this.subject.next(event);
    };

    on = (eventType: GameEventType, handler: GameEventHandler) => {
        const subscription = this.subject
            .pipe(filter((event) => event.type === eventType))
            .subscribe({ next: (event) => handler(event.payload, this.game) });

        return subscription.unsubscribe;
    };
}
