import { observer } from "mobx-react-lite";
import { styled, Box, Button, PropTypes } from "@material-ui/core";

import { State } from "state";
import { Scene } from "types/game";

type MainMenuOption = {
    text: String;
    color: PropTypes.Color;
    scene: Scene;
};

const Wrapper = styled(Box)({});

export const MainMenu = observer(() => {
    const options: MainMenuOption[] = [
        {
            text: "Play",
            color: "primary",
            scene: "Deck",
        },
    ];

    return (
        <Wrapper>
            {options.map((option) => (
                <Button
                    key={option.text as any}
                    variant="contained"
                    color={option.color}
                    onClick={() => State.setScene(option.scene)}
                    value={option.scene}
                >
                    {option.text}
                </Button>
            ))}
        </Wrapper>
    );
});
