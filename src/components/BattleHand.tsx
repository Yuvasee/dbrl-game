import { styled, Box, Card } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useCallback } from "react";
import { useEffect } from "react";
import { useRef, useState } from "react";

import { State } from "state";
import { CardPaper, CARD_HEIGHT, CARD_WIDTH } from "./CardPaper";
import "./BattleHand.css";

const CARDS_FAN_DEGREE = 20;

const Wrapper = styled(Card)<never, { cardsAmount: number }>({
    height: CARD_HEIGHT,
    width: "80%",
    maxWidth: ({ cardsAmount }) => `min(${cardsAmount * CARD_WIDTH * 0.6}px, 50%)`,
    bottom: 20,
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

    const doMeasure = useCallback(() => setWidth(wrapperRef.current?.clientWidth || 0), []);

    useEffect(() => {
        doMeasure();
        return window.addEventListener("resize", () => doMeasure());
    });

    const cards = State.battle!.player.deck.handIds;

    const degToRad = (deg: number) => (Math.PI / 180) * deg;

    return (
        <Wrapper elevation={0} ref={wrapperRef} cardsAmount={cards.length}>
            <PositionContainer>
                {cards.map((cardId, i) => {
                    const left = i * ((width - CARD_WIDTH) / (cards.length - 1));

                    const rotateDegZ =
                        (CARDS_FAN_DEGREE / (cards.length - 1)) * i - CARDS_FAN_DEGREE / 2;

                    const verticalFix =
                        (Math.cos(degToRad(rotateDegZ)) -
                            Math.cos(degToRad(CARDS_FAN_DEGREE / 2))) *
                        -(CARD_WIDTH * 7);

                    return (
                        <CardContainer
                            key={cardId}
                            style={{
                                left,
                                transform: `rotateZ(${rotateDegZ}deg)`,
                                top: verticalFix,
                            }}
                            className="hand-card-container"
                        >
                            <CardPaper cardId={cardId} />
                        </CardContainer>
                    );
                })}
            </PositionContainer>
        </Wrapper>
    );
});
