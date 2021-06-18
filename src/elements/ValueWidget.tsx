import { FC, ElementType, useEffect } from "react";
import { observer, useLocalObservable } from "mobx-react-lite";
import { styled, Box, BoxProps } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import { usePrevious } from "utils";

import "./ValueWidget.css";

type WrapperProps = { color: string };
const Wrapper = styled(Box)({
    display: "flex",
    height: 30,
    fontSize: 22,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    color: ({ color }: WrapperProps) => `${color}`,
    marginRight: 20,
    position: "relative",
    overflow: "visible",
});

const DiffBox = styled(Box)({
    top: -30,
    overflow: "visible",
});

const Diff = styled(Box)({
    position: "absolute",
    top: -30,
    animation: "slideup 4s",
});

export type ValueWidgetProps = BoxProps & {
    value: number;
    Icon: ElementType;
    color: string;
};

export const ValueWidget: FC<ValueWidgetProps> = observer(
    ({ value, Icon, color, ...props }) => {
        const diffArray = useLocalObservable(
            () => [] as { id: string; diff: number }[]
        );

        const previous = usePrevious(value);

        useEffect(() => {
            if (value !== previous) {
                diffArray.push({
                    id: uuidv4(),
                    diff: value - previous,
                });
                setTimeout(() => diffArray.shift(), 4000);
            }
        }, [diffArray, previous, value]);

        return (
            <Wrapper color={color} {...props}>
                <DiffBox>
                    {diffArray.map(({ id, diff }) => (
                        <Diff key={id}>{`${diff > 0 ? "+" : ""}${diff}`}</Diff>
                    ))}
                </DiffBox>
                <Icon style={{ marginRight: 5 }} />
                {value}
            </Wrapper>
        );
    }
);
