import { FC, useCallback } from "react";
import { Button, Modal, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";

import { Winner } from "types";
import { ModalPaper } from "elements/ModalPaper";
import { State } from "state";

export type BattleEndedProps = {
    winner: Winner;
};

export const BattleEnded: FC<BattleEndedProps> = observer(({ winner }) => {
    const goToMainMenu = useCallback(() => State.setScene("Main"), []);

    return (
        <Modal open={true}>
            <ModalPaper elevation={5} style={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="h2" style={{ marginBottom: 20 }}>
                    {winner === "Player" ? "You won! :-)" : "You lose :-("}
                </Typography>
                <Button variant="outlined" onClick={goToMainMenu}>
                    {winner === "Player" ? "Hooray" : "Okay"}
                </Button>
            </ModalPaper>
        </Modal>
    );
});
