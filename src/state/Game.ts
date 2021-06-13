import { fighters } from "data/fighters";
import { makeAutoObservable } from "mobx";

import { Scene } from "../types/game";
import { Battle } from "./Battle";
import { Fighter } from "./Fighter";
import { User } from "./User";

export class Game {
    activeScene: Scene = "Main";
    user?: User;
    fighter?: Fighter;
    battle?: Battle;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setScene = (scene: Scene) => {
        this.activeScene = scene;
    };

    setUser = (user: User) => {
        this.user = user;
    };

    setFighter = (fighter: Fighter) => {
        this.fighter = fighter;
    };

    setBattle = (battle: Battle) => {
        this.battle = battle;
    };

    startNewGame = () => {
        this.setFighter(new Fighter(fighters.paw));
        this.setScene("Deck");
    };

    startBattle = () => {
        if (!this.fighter)
            throw new Error("Can't start battle before player figher is set");

        this.setBattle(new Battle(this.fighter, new Fighter(fighters.claw)));
        this.setScene("Battle");
    };
}
