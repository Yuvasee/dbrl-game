import { GameEventType, GameEventHandler, GameEvent } from "./event";

export type GameEffectName = "replenish" | "heal";

export type GameEffect<T extends GameEvent = GameEvent> = {
    name: GameEffectName;
    hooks: GameEffectHook<T>[];
};

export type GameEffectHook<T extends GameEvent = GameEvent> = {
    listen: GameEventType;
    handle: GameEventHandler<T>;
};
