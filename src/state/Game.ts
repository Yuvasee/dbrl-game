import { makeAutoObservable } from "mobx";

import { Scene } from "../types/game";
import { Battle } from "./Battle";
import { User } from "./User";

export class Game {
    user?: User;

    scene: Scene = "Main";

    battle?: Battle;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setScene = (scene: Scene) => {
        this.scene = scene;
    };

    setUser = (user: User) => {
        this.user = user;
    };

    setBattle = (battle: Battle) => {
        this.battle = battle;
    };
}
