import { CSSProperties, FC } from "react";
import { observer } from "mobx-react-lite";
import { styled, Card, CardMedia, Box } from "@material-ui/core";

import { State } from "state";

export const CARD_WIDTH = 140;
export const CARD_HEIGHT = 200;

export type CardPaperProps = {
    cardId: string;
    style?: CSSProperties;
};

const Wrapper = styled(Card)({
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
});

const CardHeader = styled(Box)({
    display: "flex",
    alignItems: "center",
});

const ActionCost = styled(Box)({
    padding: "2px 0",
    color: "#fff",
    backgroundColor: "#375ff0",
    fontSize: 12,
    textAlign: "center",
    fontWeight: "bold",
    width: 40,
    height: 16,
});

const Damage = styled(Box)({
    padding: "2px 0",
    color: "#fff",
    backgroundColor: "#a60a0a",
    fontSize: 12,
    whiteSpace: "nowrap",
    flexGrow: 2,
    textAlign: "center",
    fontWeight: "bold",
    height: 16,
});

const Block = styled(Box)({
    padding: "2px 0",
    color: "#fff",
    backgroundColor: "#0c5e0c",
    fontSize: 12,
    whiteSpace: "nowrap",
    flexGrow: 2,
    textAlign: "center",
    fontWeight: "bold",
    height: 16,
});

const Name = styled(Box)({
    fontWeight: "bold",
    margin: 7,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: 14,
    color: "#333",
});

const Picture = styled(CardMedia)({
    height: "80px",
});

const Rarity = styled(Box)({
    padding: "3px 7px",
    fontSize: 11,
    color: "#fff",
    background: "linear-gradient(-30deg, #eee 0%, #333 100%)",
});

const Text = styled(Box)({
    padding: "3px 7px",
    color: "#333",
    fontSize: 13,
});

export const CardPaper: FC<CardPaperProps> = observer(({ cardId, style }) => {
    const card = State.fighter?.deck.getCardById(cardId);

    if (!card) throw new Error(`Card with id ${cardId} not found`);

    return (
        <Wrapper elevation={5} style={style}>
            <CardHeader>
                <ActionCost>{card.definition.actionCost}</ActionCost>
                {card.damageText && <Damage>{card.damageText}</Damage>}
                {card.blockText && <Block>{card.blockText}</Block>}
            </CardHeader>
            <Name>{card.definition.name}</Name>
            <Picture image={card.definition.imageUrl} />
            <Rarity>{card.definition.rarity}</Rarity>
            <Text>{card.definition.text}</Text>
        </Wrapper>
    );
});
