import { Card } from "state/Card";
import { Deck } from "state/Deck";
import { Game } from "state/Game";

export type GenericEvent<EventType extends string, PayloadType> = {
    readonly type: EventType;
    readonly payload: PayloadType;
};

export type CardEvent = GenericEvent<
    | "CARD_DRAW_AFTER"
    | "CARD_PLAY_BEFORE"
    | "CARD_PLAY_AFTER"
    | "CARD_DISCARD_BEFORE"
    | "CARD_DISCARD_AFTER",
    Card
>;

export type DeckEvent = GenericEvent<"CARD_DRAW_BEFORE", Deck>;

export type GameEvent = CardEvent | DeckEvent;

export type GameEventType = CardEvent["type"] | DeckEvent["type"];

export type GameEventHandler<EventType extends GameEvent = GameEvent> = (
    payload: EventType["payload"],
    game: Game
) => void;
