import { Paper, styled } from "@material-ui/core";

export const ModalPaper = styled(Paper)({
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
