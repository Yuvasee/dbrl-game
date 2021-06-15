import rand from "math-random";

import { VariableValue } from "types/generic";

export const getRandomMinMax = (min: number, max: number) =>
    Math.floor(rand() * (max - min + 1) + min);

export const calcVariableValue = (value: VariableValue) =>
    typeof value === "number" ? value : getRandomMinMax(value.min, value.max);
