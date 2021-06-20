import { GameEventType, GameEventHandler } from "./event";

export type CardEffectHook = {
    listen: GameEventType;
    handle: GameEventHandler;
};
