import FavoriteIcon from "@material-ui/icons/Favorite";
import SecurityIcon from "@material-ui/icons/Security";

import { styled, Card, Box } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { State } from "state";
import { Fighter } from "state/Fighter";
import { ValueWidget } from "elements/ValueWidget";

const FIGHTER_WIDTH = 260;
const FIGHTER_HEIGHT = 260;

type WrapperProps = { left: string; top: string };
const Wrapper = styled(Card)({
    width: FIGHTER_WIDTH,
    height: FIGHTER_HEIGHT,
    position: "absolute",
    top: ({ top }: WrapperProps) => top,
    left: ({ left }: WrapperProps) => left,
    border: "3px solid gray",
    borderRadius: "44%",
    display: "flex",
});

const Inner = styled(Box)({
    flexGrow: 1,
    textAlign: "center",
    fontSize: 18,
    alignItems: "center",
    justifyContent: "center",
});

const Name = styled(Box)({
    fontSize: 26,
    fontWeight: "bold",
});

const MainStats = styled(Box)({
    display: "flex",
    justifyContent: "center",
});

export type BattleFighterProps = {
    fighter: Fighter;
    position: "Player" | "NPC";
};

export const BattleFighter: FC<BattleFighterProps> = observer(
    ({ fighter: { hp, block, name }, position }) => {
        const clickHandler = () => {
            State.battle!.endTurn();
        };

        const left =
            position === "Player" ? "5%" : `calc(95% - ${FIGHTER_WIDTH}px)`;

        return (
            <Wrapper
                elevation={5}
                onClick={clickHandler}
                left={left}
                top={"100px"}
            >
                <Inner>
                    <Name>{name}</Name>

                    <MainStats>
                        <ValueWidget
                            value={hp}
                            Icon={FavoriteIcon}
                            color="red"
                            style={{ marginRight: 20 }}
                        />
                        <ValueWidget
                            value={block}
                            Icon={SecurityIcon}
                            color="#2038bd"
                        />
                    </MainStats>
                </Inner>
            </Wrapper>
        );
    }
);
