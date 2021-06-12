import { styled, Box } from "@material-ui/core";
import { observer } from "mobx-react-lite";

import { MainMenu } from "./MainMenu";
import { UserPanel } from "./UserPanel";

const Wrapper = styled(Box)({
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

export const MainScene = observer(() => {
    return (
        <Wrapper>
            <UserPanel />
            <MainMenu />
        </Wrapper>
    );
});
