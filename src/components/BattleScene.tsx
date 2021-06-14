import { styled, Box } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { BattleActions } from "./BattleActions";

import { BattleDeck } from "./BattleDeck";
import { BattleDiscarded } from "./BattleDiscarded";
import { BattleEndTurn } from "./BattleEndTurn";
import { BattleHand } from "./BattleHand";
import { UserPanel } from "./UserPanel";

const Wrapper = styled(Box)({
    flexGrow: 1,
    position: "relative",
});

export const BattleScene = observer(() => {
    return (
        <Wrapper>
            <UserPanel />
            <BattleDeck />
            <BattleHand />
            <BattleDiscarded />
            <BattleActions />
            <BattleEndTurn />
        </Wrapper>
    );
});
