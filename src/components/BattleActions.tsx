import { styled, Card, Box } from "@material-ui/core";
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
    left: `calc((25% - ${ACTIONS_WIDTH}px) / 2)`,
    border: "3px solid #94a0e0",
    overflow: "visible",
});

const Inner = styled(Box)({
    textAlign: "center",
    fontSize: 20,
    color: "#2038bd",
    display: "flex",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
});

const Ap = styled(Box)({
    fontWeight: "bold",
    fontSize: 60,
    margin: "0 0 15px 20px",
});

export const BattleActions = observer(() => {
    const { ap } = State.battle!.player;

    return (
        <Wrapper elevation={2}>
            <Inner>
                Actions <Ap>{ap}</Ap>
            </Inner>
        </Wrapper>
    );
});
