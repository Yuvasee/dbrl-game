import { styled, Card, Button } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { State } from "state";

import { CARD_HEIGHT } from "./CardPaper";

const END_TURN_WIDTH = 160;
const END_TURN_HEIGHT = 30;

const Wrapper = styled(Card)({
    width: END_TURN_WIDTH,
    height: END_TURN_HEIGHT,
    position: "absolute",
    bottom: CARD_HEIGHT + 20,
    right: `calc((25% - ${END_TURN_WIDTH}px) / 2)`,
    border: "3px solid #94a0e0",
});

const EndTurnButton = styled(Button)({
    fontSize: 17,
    color: "#2038bd",
    width: "100%",
    height: "100%",
});

export const BattleEndTurn = observer(() => {
    const clickHandler = () => {
        State.battle!.endTurn();
    };

    return (
        <Wrapper elevation={2}>
            <EndTurnButton onClick={clickHandler}>== End Turn ==</EndTurnButton>
        </Wrapper>
    );
});
