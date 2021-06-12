import { styled, Box } from "@material-ui/core";
import { observer } from "mobx-react-lite";

import { UserPanel } from "./UserPanel";
import { Deck } from "state/Deck";
import { useEffect } from "react";
import State from "state";
import { Battle } from "state/Battle";
import { CardPaper } from "./CardPaper";

const Wrapper = styled(Box)({
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

export const DeckScene = observer(() => {
    // Move this to Battle.new() and Game.new()
    useEffect(() => {
        const deck = new Deck({
            heavy_strike: 5,
            cautious_hit: 5,
            block: 5,
        });
        const battle = new Battle(deck);
        State.setBattle(battle);
    });

    const deck = State.battle?.deck;

    return (
        <Wrapper>
            <UserPanel />
            {deck && (
                <>
                    <h1>Deck</h1>
                    {deck.cardIds.map((cardId) => (
                        <CardPaper key={cardId} id={cardId} />
                    ))}
                </>
            )}
        </Wrapper>
    );
});
