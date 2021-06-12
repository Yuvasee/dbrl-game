import { observer } from "mobx-react-lite";
import { ComponentType } from "react";
import { Container, styled } from "@material-ui/core";

import { LoginModal } from "components/LoginModal";
import { MainScene } from "components/MainScene";

import { State } from "./state";
import { Scene } from "types/game";
import { DeckScene } from "components/DeckScene";

const Wrapper = styled(Container)({
    flexGrow: 1,
});

export const Game = observer(() => {
    const sceneMap: Record<Scene, ComponentType> = {
        Main: MainScene,
        Deck: DeckScene,
        Battle: () => null,
        Results: () => null,
    };
    const Scene = sceneMap[State.scene];

    return (
        <Wrapper disableGutters>
            {<Scene />}
            {!State.user && <LoginModal />}
        </Wrapper>
    );
});

export default Game;
