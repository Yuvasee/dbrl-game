import { CardDefinition, CardDefinitionId } from "types/card";

export const cardDefinitions: Record<CardDefinitionId, CardDefinition> = {
    heavy_strike: {
        id: "heavy_strike",
        name: "Heavy strike",
        text: "Hit it hard.",
        imageUrl:
            "https://i.picsum.photos/id/2/140/80.jpg?hmac=hCrKItSMsCKIPfnHtX-zcoRHUKfL3s4vep7HxFnhimM",
        rarity: "Common",
        actionCost: 1,
        damage: {
            min: 3,
            max: 5,
        },
        block: 0,
    },
    cautious_hit: {
        id: "cautious_hit",
        name: "Cautious hit",
        text: "Take care, defend yourself.",
        imageUrl:
            "https://i.picsum.photos/id/900/140/80.jpg?hmac=AZw_yR2Nxz2UL2b-YPa1sgIyarjixWTjnWOGtKyh3Lg",
        rarity: "Common",
        actionCost: 1,
        damage: 2,
        block: 2,
    },
    block: {
        id: "block",
        name: "Block",
        text: "Fortify!",
        imageUrl:
            "https://i.picsum.photos/id/901/140/80.jpg?hmac=ghxuh7RbEHxXC_OGl51RztkFi_QKLtlsjTVYEHL3TwQ",
        rarity: "Common",
        actionCost: 1,
        damage: 0,
        block: {
            min: 3,
            max: 5,
        },
    },
    minorHeal: {
        id: "minorHeal",
        name: "Minor Heal",
        text: "Soothing balm on your wounds",
        imageUrl:
            "https://i.picsum.photos/id/237/140/80.jpg?hmac=DlHE3tDGXrt9CwHSSf9XkYkqq4N5P5FBK8UnYIhzSgc",
        rarity: "Common",
        actionCost: 1,
        damage: 0,
        block: 0,
        effects: {
            replenish: true,
            heal: 5,
        },
    },
};
