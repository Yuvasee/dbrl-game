import { FC } from "react";
import { styled, Box } from "@material-ui/core";
import { observer } from "mobx-react-lite";

import { CardDefinitionId } from "data/cards";

export type CardPaperProps = {
    id: CardDefinitionId;
};

const Wrapper = styled(Box)({});

export const CardPaper: FC<CardPaperProps> = observer(({ id }) => {
    return <Wrapper></Wrapper>;
});
