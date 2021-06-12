import { styled, Box } from "@material-ui/core";
import { observer } from "mobx-react-lite";

import { UserPanel } from "./UserPanel";
import { useEffect } from "react";
import { State } from "state";
import { Battle } from "state/Battle";
import { CardPaper } from "./CardPaper";

const Wrapper = styled(Box)({
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
                    <h1>Deck</h1>
                    {deck.cardIds.map((cardId) => (
                        <CardPaper key={cardId} cardId={cardId} />
                    ))}
                </>
            )}
        </Wrapper>
    );
});
