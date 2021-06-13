import { styled, Box, Card } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useCallback } from "react";
import { useEffect } from "react";
import { useRef, useState } from "react";

import { State } from "state";
import { CardPaper, CARD_HEIGHT, CARD_WIDTH } from "./CardPaper";
import "./BattleHand.css";

const Wrapper = styled(Card)<never, { cardsAmount: number }>({
    height: CARD_HEIGHT,
    width: "80%",
    maxWidth: ({ cardsAmount }) => cardsAmount * CARD_WIDTH * 0.6,
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    position: "absolute",
    overflow: "visible",
});

const PositionContainer = styled(Box)({
    position: "relative",
});

const CardContainer = styled(Box)({
    position: "absolute",
});

export const BattleHand = observer(() => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    const doMeasure = useCallback(
        () => setWidth(wrapperRef.current?.clientWidth || 0),
        []
    );

    useEffect(() => {
        doMeasure();
        return window.addEventListener("resize", () => doMeasure());
    });

    const cards = State.battle!.player.deck.handIds;

    return (
        <Wrapper elevation={0} ref={wrapperRef} cardsAmount={cards.length}>
            <PositionContainer>
                {cards.map((cardId, i) => (
                    <CardContainer
                        key={cardId}
                        style={{
                            left:
                                i * ((width - CARD_WIDTH) / (cards.length - 1)),
                        }}
                        className="hand-card-container"
                    >
                        <CardPaper cardId={cardId} />
                    </CardContainer>
                ))}
            </PositionContainer>
        </Wrapper>
    );
});
