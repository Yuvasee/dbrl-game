import { FC } from "react";
import { styled, Box } from "@material-ui/core";
import { observer } from "mobx-react-lite";

export type CardPaperProps = {
    cardId: string;
};

const Wrapper = styled(Box)({});

export const CardPaper: FC<CardPaperProps> = observer(({ cardId }) => {
    return <Wrapper></Wrapper>;
});
