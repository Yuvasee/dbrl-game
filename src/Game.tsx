import { observer } from "mobx-react-lite";
import { ComponentType } from "react";
import { Container, styled } from "@material-ui/core";

import { LoginModal } from "components/LoginModal";
import { MainScene } from "components/MainScene";

import { State } from "./state";
import { Scene } from "types/game";
import { DeckScene } from "components/DeckScene";
import { BattleScene } from "components/BattleScene";

const Wrapper = styled(Container)({
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
});

export const Game = observer(() => {
    const sceneMap: Record<Scene, ComponentType> = {
        Main: MainScene,
        Deck: DeckScene,
        Battle: BattleScene,
        Results: () => null,
    };
    const Scene = sceneMap[State.activeScene];

    return (
        <Wrapper disableGutters>
            {<Scene />}
            {!State.user && <LoginModal />}
        </Wrapper>
    );
});

export default Game;
