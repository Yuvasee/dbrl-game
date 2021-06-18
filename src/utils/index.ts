import rand from "math-random";
import { useRef, useEffect } from "react";

import { VariableValue } from "types/generic";

export const getRandomMinMax = (min: number, max: number) =>
    Math.floor(rand() * (max - min + 1) + min);

export const calcVariableValue = (value: VariableValue) =>
    typeof value === "number" ? value : getRandomMinMax(value.min, value.max);

export const usePrevious = <T>(value: T): T => {
    const ref = useRef<T>(value);
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
};
