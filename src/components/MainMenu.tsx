import { observer } from "mobx-react-lite";
import { styled, Box, Button, PropTypes } from "@material-ui/core";

import { State } from "state";

type MainMenuOption = {
    text: String;
    color: PropTypes.Color;
    onClick: () => void;
};

const Wrapper = styled(Box)({});

export const MainMenu = observer(() => {
    const options: MainMenuOption[] = [
        {
            text: "New Game",
            color: "primary",
            onClick: () => State.startNewGame(),
        },
    ];

    return (
        <Wrapper>
            {options.map((option) => (
                <Button
                    key={option.text as any}
                    variant="contained"
                    color={option.color}
                    onClick={option.onClick}
                >
                    {option.text}
                </Button>
            ))}
        </Wrapper>
    );
});
