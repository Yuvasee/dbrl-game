import { styled, Box } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { State } from "state";
import { BattleActions } from "./BattleActions";

import { BattleDeck } from "./BattleDeck";
import { BattleDiscarded } from "./BattleDiscarded";
import { BattleEndTurn } from "./BattleEndTurn";
import { BattleFighter } from "./BattleFighter";
import { BattleHand } from "./BattleHand";
import { UserPanel } from "./UserPanel";
import { BattleEnded } from "./BattleEnded";

import Claw from "assets/claw.jpg";
import Paw from "assets/paw.jpg";

const Wrapper = styled(Box)({
    flexGrow: 1,
    position: "relative",
});

export const BattleScene = observer(() => {
    const { player, npc, winner } = State.battle!;

    return (
        <Wrapper>
            <UserPanel />

            <BattleDeck />
            <BattleHand />
            <BattleDiscarded />
            <BattleActions />
            <BattleEndTurn />

            <BattleFighter fighter={player} position="Player" picture={Paw} />
            <BattleFighter fighter={npc} position="NPC" picture={Claw} />

            {winner && <BattleEnded winner={winner} />}
        </Wrapper>
    );
});
