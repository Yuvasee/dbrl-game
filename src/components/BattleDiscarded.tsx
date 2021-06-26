import { styled, Card, Box } from "@material-ui/core";
import { observer } from "mobx-react-lite";

import { State } from "state";
import { CARD_HEIGHT, CARD_WIDTH } from "./CardPaper";

const Wrapper = styled(Card)({
    height: CARD_HEIGHT * 0.6,
    width: `min(${CARD_WIDTH * 0.6}px, 15%)`,
    position: "absolute",
    bottom: CARD_WIDTH * 0.15,
    right: `calc((25% - ${CARD_WIDTH * 0.7}px) / 2)`,
    border: "6px solid #9ea2b8",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.6,
});

const Inner = styled(Box)({
    textAlign: "center",
    fontSize: 80,
    color: "#9ea2b8",
    marginBottom: "15%",
});

export const BattleDiscarded = observer(() => {
    const { discardedLength } = State.battle!.player.deck;

    return (
        <Wrapper elevation={3}>
            <Inner>{discardedLength}</Inner>
        </Wrapper>
    );
});
