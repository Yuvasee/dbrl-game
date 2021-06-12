import { useCallback } from "react";
import { Button, Modal, Paper } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

import { makeFakeUser } from "fakes";
import { State } from "state";

const ModalPaper = styled(Paper)({
    maxWidth: "60%",
    minHeight: "200px",
    margin: "auto",
    position: "relative",
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

export const LoginModal = () => {
    const login = useCallback(() => State.setUser(makeFakeUser()), []);

    return (
        <Modal open={true}>
            <ModalPaper elevation={5}>
                <Button variant="outlined" onClick={login}>
                    Login as fake user
                </Button>
            </ModalPaper>
        </Modal>
    );
};
