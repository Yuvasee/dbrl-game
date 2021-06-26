import { FC, ElementType, useEffect } from "react";
import { observer, useLocalObservable } from "mobx-react-lite";
import { styled, Box, BoxProps } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import { usePrevious } from "utils";

import "./ValueWidget.css";
import { GREEN_POSITIVE, RED_HEALTH } from "theme/colors";
import { runInAction } from "mobx";

const Wrapper = styled(Box)<never, { minimal: boolean }>({
    flexGrow: ({ minimal }) => (minimal ? 1 : 0),
    display: "inline-flex",
    height: 20,
    padding: ({ minimal }) => (minimal ? 0 : "0 10px"),
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: ({ minimal }) => (minimal ? "center" : "flex-end"),
    position: "relative",
    overflow: "visible",
});

const ANIMATION_SECONDS = 4;

const Diff = styled(Box)<never, { minimal: boolean }>({
    position: "absolute",
    left: ({ minimal }) => (minimal ? 0 : 24),
    animation: `slideup ${ANIMATION_SECONDS}s`,
    fontSize: 18,
});

export type ValueWidgetProps = BoxProps & {
    value: number;
    Icon: ElementType;
    minimal?: boolean;
};

export const ValueWidget: FC<ValueWidgetProps> = observer(
    ({ value, Icon, minimal = false, ...props }) => {
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
                setTimeout(
                    () => runInAction(() => diffArray.shift()),
                    ANIMATION_SECONDS * 1000 - 500
                );
            }
        }, [diffArray, previous, value]);

        return (
            <Wrapper {...props} minimal={minimal}>
                {diffArray.map(({ id, diff }) => {
                    const isPositive = diff > 0;
                    const content = `${isPositive ? "+" : ""}${diff}`;
                    const color = isPositive ? GREEN_POSITIVE : RED_HEALTH;
                    return (
                        <Diff key={id} style={{ color }} minimal={minimal}>
                            {content}
                        </Diff>
                    );
                })}
                {!minimal && <Icon style={{ marginRight: 5 }} fontSize="inherit" />}
                <span style={{ paddingBottom: 1 }}>{value}</span>
            </Wrapper>
        );
    }
);
