import { styled, Card, Button } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { State } from "state";

import { CARD_HEIGHT } from "./CardPaper";

const ACTIONS_WIDTH = 160;
const ACTIONS_HEIGHT = 30;

const Wrapper = styled(Card)({
    width: ACTIONS_WIDTH,
    height: ACTIONS_HEIGHT,
    position: "absolute",
    bottom: CARD_HEIGHT + 20,
    right: `calc((25% - ${ACTIONS_WIDTH}px) / 2)`,
    border: "3px solid #94a0e0",
    overflow: "visible",
    cursor: "pointer",
});

const Inner = styled(Button)({
    textAlign: "center",
    fontSize: 18,
    color: "#2038bd",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    label: {
        justifyContent: "center",
    },
});

export const BattleEndTurn = observer(() => {
    const clickHandler = () => {
        State.battle!.endTurn();
    };

    return (
        <Wrapper elevation={2} onClick={clickHandler}>
            <Inner>-= End Turn =-</Inner>
        </Wrapper>
    );
});
