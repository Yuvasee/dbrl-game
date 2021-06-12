import { styled, Box, Button } from "@material-ui/core";
import { observer } from "mobx-react-lite";

import { UserPanel } from "./UserPanel";
import { useEffect } from "react";
import { State } from "state";
import { Battle } from "state/Battle";
import { CardPaper } from "./CardPaper";

const Wrapper = styled(Box)({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0 3rem",
});

const CardsContainer = styled(Box)({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
});

const Buttons = styled(Box)({
    margin: "4rem",
});

const BackButton = styled(Button)({
    marginRight: "1rem",
});

export const DeckScene = observer(() => {
    useEffect(() => {
        State.setBattle(Battle.startNew());
    }, []);

    const deck = State.battle?.deck;

    return (
        <Wrapper>
            <UserPanel />

            {deck && (
                <>
                    <h1>Your deck</h1>
                    <CardsContainer>
                        {deck.cardIds.map((cardId) => (
                            <CardPaper key={cardId} cardId={cardId} />
                        ))}
                    </CardsContainer>
                </>
            )}

            <Buttons>
                <BackButton
                    variant="contained"
                    color="secondary"
                    onClick={() => State.setScene("Main")}
                >
                    Back
                </BackButton>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => State.setScene("Battle")}
                >
                    To Battle!
                </Button>
            </Buttons>
        </Wrapper>
    );
});
