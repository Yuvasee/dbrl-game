import { useCallback } from "react";
import { Button, Modal } from "@material-ui/core";

import { makeFakeUser } from "fakes";
import { State } from "state";
import { ModalPaper } from "elements/ModalPaper";

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
