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
        player.battle = this;

        this.npc = npc;
        npc.battle = this;

        this.player.deck.drawHand();

        makeAutoObservable(this);
    }

    getOpponentOf = (fighter: Fighter) => (fighter === this.player ? this.npc : this.player);

    endTurn = () => {
        this.phase = "NPC";
        this.npc.deck.drawHand();
        this.npc.resetAp();
        this.npc.makeTurn();

        this.player.deck.drawHand();
        this.player.resetAp();
        this.round++;
        this.phase = "Player";
    };
}
