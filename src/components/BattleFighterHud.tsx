import { FC, useEffect, useRef } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SecurityIcon from "@material-ui/icons/Security";
import { styled, Box, RootRef } from "@material-ui/core";
import { observer } from "mobx-react-lite";

import { ValueWidget } from "elements/ValueWidget";
import { BLUE_BLOCK, RED_HEALTH, WHITE } from "theme/colors";
import { useState } from "react";
import { usePrevious } from "utils";

const Wrapper = styled(Box)({
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    top: -40,
    width: "100%",
    border: `1px solid #999`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 14,
});

const HpScale = styled(Box)({
    flexGrow: 1,
    border: `1px solid ${RED_HEALTH}`,
});

const CurrentHp = styled(Box)({
    backgroundColor: RED_HEALTH,
});

export type BattleFighterHudProps = {
    baseHp: number;
    hp: number;
    block: number;
};

export const BattleFighterHud: FC<BattleFighterHudProps> = observer(({ baseHp, hp, block }) => {
    const currentHpRef = useRef<HTMLDivElement>(null);

    const currentHpPercent = Math.round((hp / baseHp) * 100);
    const prevHpPercent = usePrevious(currentHpPercent);

    const [isHpNarrow, setIsHpNarrow] = useState(false);

    useEffect(() => {
        const resizeHandler = () => setIsHpNarrow((currentHpRef.current?.clientWidth ?? 0) <= 50);
        if (prevHpPercent !== currentHpPercent) resizeHandler();
    }, [currentHpPercent, prevHpPercent]);

    return (
        <Wrapper>
            <HpScale>
                <RootRef rootRef={currentHpRef}>
                    <CurrentHp
                        style={{
                            width: `${currentHpPercent}%`,
                            textAlign: isHpNarrow ? "center" : "right",
                        }}
                    >
                        <ValueWidget
                            value={hp}
                            Icon={FavoriteIcon}
                            minimal={isHpNarrow}
                            style={{
                                backgroundColor: RED_HEALTH,
                                color: WHITE,
                            }}
                        />
                    </CurrentHp>
                </RootRef>
            </HpScale>

            {!!block && (
                <ValueWidget
                    value={block}
                    Icon={SecurityIcon}
                    style={{
                        color: BLUE_BLOCK,
                    }}
                />
            )}
        </Wrapper>
    );
});
