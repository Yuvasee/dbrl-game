import { styled, Box, Button } from "@material-ui/core";
import { observer } from "mobx-react-lite";

import { UserPanel } from "./UserPanel";
import { State } from "state";
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
    const deck = State.fighter?.deck;

    return (
        <Wrapper>
            <UserPanel />

            {deck && (
                <>
                    <h1>Your deck</h1>
                    <CardsContainer>
                        {deck.deckIds.map((cardId) => (
                            <CardPaper
                                key={cardId}
                                cardId={cardId}
                                style={{ margin: 5 }}
                            />
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
                    onClick={() => State.startBattle()}
                >
                    To Battle!
                </Button>
            </Buttons>
        </Wrapper>
    );
});
