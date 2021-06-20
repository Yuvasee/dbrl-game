import { Card } from "state/Card";
import { Deck } from "state/Deck";
import { Game } from "state/Game";

export type EventType = {
    type: string;
    payload: any;
};

export type CardEvent = {
    type:
        | "CARD_DRAW_AFTER"
        | "CARD_PLAY_BEFORE"
        | "CARD_PLAY_AFTER"
        | "CARD_DISCARD_BEFORE"
        | "CARD_DISCARD_AFTER";
    payload: Card;
};

export type DeckEvent = {
    type: "CARD_DRAW_BEFORE";
    payload: Deck;
};

export type GameEventType = CardEvent["type"] | DeckEvent["type"];

export type GameEventHandler<T extends EventType = EventType> = (
    payload: T["payload"],
    game: Game
) => void;

export type EventBusSubscriber = (
    eventType: GameEventType,
    handler: GameEventHandler
) => () => void;
