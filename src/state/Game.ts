import { fighters } from "data/fighters";
import { makeAutoObservable } from "mobx";

import { Scene } from "types";
import { Battle } from "./Battle";
import { EffectController } from "./EffectController";
import { EventBus } from "./EventBus";
import { Fighter } from "./Fighter";
import { User } from "./User";

export class Game {
    activeScene: Scene = "Main";
    user?: User;
    player?: Fighter;
    battle?: Battle;
    eventBus: EventBus;
    effectController: EffectController;

    constructor() {
        this.eventBus = new EventBus(this);
        this.effectController = new EffectController(this.eventBus);
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setScene = (scene: Scene) => {
        this.activeScene = scene;
    };

    setUser = (user: User) => {
        this.user = user;
    };

    setPlayer = (fighter: Fighter) => {
        this.player = fighter;
    };

    setBattle = (battle: Battle) => {
        this.battle = battle;
    };

    startNewGame = () => {
        this.setPlayer(new Fighter(fighters.paw));
        this.setScene("Deck");
    };

    startBattle = () => {
        if (!this.player) throw new Error("Can't start battle before player figher is set");

        this.setBattle(new Battle(this.player, new Fighter(fighters.claw)));
        this.setScene("Battle");
    };
}
