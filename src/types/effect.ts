import { GameEventType, GameEventHandler } from "./event";

export type CardEffectName = "replenish" | "heal";

export type CardEffect = {
    name: CardEffectName;
    hooks: CardEffectHook[];
};

export type CardEffectHook = {
    listen: GameEventType;
    handle: GameEventHandler;
};
