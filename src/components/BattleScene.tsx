import { styled, Box } from "@material-ui/core";
import { observer } from "mobx-react-lite";

import { BattleHand } from "./BattleHand";
import { UserPanel } from "./UserPanel";

const Wrapper = styled(Box)({
    flexGrow: 1,
    position: "relative",
});

export const BattleScene = observer(() => {
    return (
        <Wrapper>
            <UserPanel />
            <BattleHand />
        </Wrapper>
    );
});
