import { Game } from "state/Game";

export type GameEventType = "CARD_DRAW" | "CARD_PLAY" | "CARD_DISCARD";
export type GameEventPayload = any;

export type GameEvent = {
    type: GameEventType;
    payload: GameEventPayload;
};

export type GameEventHandler = (payload: GameEventPayload, game: Game) => void;

export type EventBusSubscriber = (
    eventType: GameEventType,
    handler: GameEventHandler
) => () => void;
