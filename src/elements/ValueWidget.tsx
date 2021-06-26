import { FC, ElementType, useEffect } from "react";
import { observer, useLocalObservable } from "mobx-react-lite";
import { styled, Box, BoxProps } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import { usePrevious } from "utils";

import "./ValueWidget.css";
import { GREEN_POSITIVE, RED_HEALTH } from "theme/colors";
import { runInAction } from "mobx";

type WrapperProps = { color: string };
const Wrapper = styled(Box)({
    display: "flex",
    height: 30,
    fontSize: 22,
    fontWeight: "bold",
    alignItems: "center",
    color: ({ color }: WrapperProps) => `${color}`,
    position: "relative",
    overflow: "visible",
});

const ANIMATION_SECONDS = 4;

const Diff = styled(Box)({
    position: "absolute",
    left: 30,
    animation: `slideup ${ANIMATION_SECONDS}s`,
    fontSize: 18,
});

export type ValueWidgetProps = BoxProps & {
    value: number;
    Icon: ElementType;
    color: string;
};

export const ValueWidget: FC<ValueWidgetProps> = observer(({ value, Icon, color, ...props }) => {
    const diffArray = useLocalObservable(() => [] as { id: string; diff: number }[]);

    const previous = usePrevious(value);

    useEffect(() => {
        if (value !== previous) {
            runInAction(() =>
                diffArray.push({
                    id: uuidv4(),
                    diff: value - previous,
                })
            );
            setTimeout(() => runInAction(() => diffArray.shift()), ANIMATION_SECONDS * 1000 - 500);
        }
    }, [diffArray, previous, value]);

    return (
        <Wrapper color={color} {...props}>
            {diffArray.map(({ id, diff }) => {
                const isPositive = diff > 0;
                const content = `${isPositive ? "+" : ""}${diff}`;
                const color = isPositive ? GREEN_POSITIVE : RED_HEALTH;
                return (
                    <Diff key={id} style={{ color }}>
                        {content}
                    </Diff>
                );
            })}
            <Icon style={{ marginRight: 5 }} />
            {value}
        </Wrapper>
    );
});
