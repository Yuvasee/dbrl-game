import { observer } from "mobx-react-lite";
import FaceIcon from "@material-ui/icons/Face";

import State from "state";
import { Box, styled } from "@material-ui/core";

const Wrapper = styled(Box)({
    position: "absolute",
    top: "1rem",
    right: "1rem",
    display: "flex",
    alignItems: "center",
});
const Icon = styled(FaceIcon)({
    marginRight: "0.5rem",
});

export const UserPanel = observer(() => {
    const { user } = State;

    return (
        <Wrapper>
            {user && (
                <>
                    <Icon /> {user.name}
                </>
            )}
        </Wrapper>
    );
});
