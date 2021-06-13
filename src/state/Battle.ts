import { makeAutoObservable } from "mobx";

import { Fighter } from "./Fighter";

export type BattleRoundPhase = "Player" | "NPC";

export class Battle {
    round: number = 1;
    phase: BattleRoundPhase = "Player";
    player: Fighter;
    npc: Fighter;

    constructor(player: Fighter, npc: Fighter) {
        this.player = player;
        this.npc = npc;
        this.player.deck.drawHand();

        makeAutoObservable(this);
    }
}
