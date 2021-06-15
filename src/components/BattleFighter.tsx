import FavoriteIcon from "@material-ui/icons/Favorite";
import SecurityIcon from "@material-ui/icons/Security";

import { styled, Card, Box } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { State } from "state";
import { Fighter } from "state/Fighter";

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

const Health = styled(Box)({
    display: "flex",
    height: 30,
    fontSize: 22,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    color: "red",
    marginRight: 20,
});

const Defence = styled(Box)({
    display: "flex",
    height: 30,
    fontSize: 22,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    color: "#2038bd",
});

export type BattleFighterProps = {
    fighter: Fighter;
    position: "Player" | "NPC";
};

export const BattleFighter: FC<BattleFighterProps> = observer(
    ({ fighter: { hp, defence, name }, position }) => {
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
                        <Health>
                            <FavoriteIcon style={{ marginRight: 5 }} />
                            {hp}
                        </Health>

                        <Defence>
                            <SecurityIcon style={{ marginRight: 5 }} />
                            {defence}
                        </Defence>
                    </MainStats>
                </Inner>
            </Wrapper>
        );
    }
);
