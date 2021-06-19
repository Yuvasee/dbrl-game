import { Subject } from "rxjs";
import { filter } from "rxjs/operators";
import { Game } from "./Game";

export type GameEventType = "CARD_DRAW" | "CARD_PLAY" | "CARD_DISCARD";
export type GameEventPayload = any;

export type GameEvent = {
    type: GameEventType;
    payload: GameEventPayload;
};

export type GameEventHandler = (payload: GameEventPayload, game: Game) => void;

export class EventBus {
    game: Game;
    subject: Subject<GameEvent>;

    constructor(game: Game) {
        this.game = game;
        this.subject = new Subject<GameEvent>();
    }

    emit = (event: GameEvent) => {
        this.subject.next(event);
    };

    on = (eventType: GameEventType, handler: GameEventHandler) => {
        const subscription = this.subject
            .pipe(filter((event) => event.type === eventType))
            .subscribe({ next: (event) => handler(event.payload, this.game) });

        return subscription.unsubscribe;
    };
}
