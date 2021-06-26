import { styled, Card, Box } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { FC } from "react";

import { State } from "state";
import { Fighter } from "state/Fighter";
import { BLUE_BLOCK, RED_HEALTH } from "theme/colors";
import { BattleFighterHud } from "./BattleFighterHud";

export const FIGHTER_WIDTH = 260;
export const FIGHTER_HEIGHT = 260;

type WrapperProps = { left: string; top: string };
const Wrapper = styled(Card)({
    width: FIGHTER_WIDTH,
    height: FIGHTER_HEIGHT,
    position: "absolute",
    top: ({ top }: WrapperProps) => top,
    left: ({ left }: WrapperProps) => left,
    borderRadius: "50%",
    display: "flex",
    overflow: "visible",
});

const Inner = styled(Box)({
    flexGrow: 1,
    textAlign: "center",
    fontSize: 18,
    position: "relative",
});

const Name = styled(Box)({
    fontSize: 26,
    fontWeight: "bold",
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    bottom: -40,
});

export type BattleFighterProps = {
    fighter: Fighter;
    position: "Player" | "NPC";
    picture: string;
};

export const BattleFighter: FC<BattleFighterProps> = observer(
    ({ fighter: { baseHp, hp, block, name }, position, picture }) => {
        const clickHandler = () => {
            State.battle!.endTurn();
        };

        const isPlayer = position === "Player";
        const left = isPlayer ? "5%" : `calc(95% - ${FIGHTER_WIDTH}px)`;

        return (
            <Wrapper
                elevation={5}
                onClick={clickHandler}
                left={left}
                top={"120px"}
                style={{
                    background: `url(${picture})`,
                    backgroundSize: "cover",
                    boxShadow: `inset 0 0 25px 6px #fff, 0 0 8px 0 ${
                        isPlayer ? BLUE_BLOCK : RED_HEALTH
                    }`,
                }}
            >
                <Inner>
                    <Name>{name}</Name>
                    <BattleFighterHud baseHp={baseHp} hp={hp} block={block} />
                </Inner>
            </Wrapper>
        );
    }
);
