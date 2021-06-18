import FavoriteIcon from "@material-ui/icons/Favorite";
import SecurityIcon from "@material-ui/icons/Security";

import { styled, Card, Box } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { State } from "state";
import { Fighter } from "state/Fighter";
import { ValueWidget } from "elements/ValueWidget";
import { BLUE_BLOCK, RED_HEALTH } from "theme/colors";

const FIGHTER_WIDTH = 260;
const FIGHTER_HEIGHT = 260;

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

const MainStats = styled(Box)({
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    top: -40,
    display: "flex",
    justifyContent: "center",
});

export type BattleFighterProps = {
    fighter: Fighter;
    position: "Player" | "NPC";
    picture: string;
};

export const BattleFighter: FC<BattleFighterProps> = observer(
    ({ fighter: { hp, block, name }, position, picture }) => {
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

                    <MainStats>
                        <ValueWidget
                            value={hp}
                            Icon={FavoriteIcon}
                            color={RED_HEALTH}
                            style={{ marginRight: 20 }}
                        />
                        <ValueWidget value={block} Icon={SecurityIcon} color={BLUE_BLOCK} />
                    </MainStats>
                </Inner>
            </Wrapper>
        );
    }
);
