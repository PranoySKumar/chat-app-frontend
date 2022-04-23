import { Container, Paper, SxProps } from "@mui/material";
import { Theme } from "@mui/system";
import { useEffect } from "react";
import FormManager from "../../components/Home/FormManager";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { errorActions } from "../../stores/slices/errorSlice";
import { socket } from "../../utils/socket-io";

const classes: { container: SxProps<Theme>; paper: SxProps<Theme> } = {
  container: {
    display: "flex",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
    zIndex: -1,
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    minWidth: "100vw",
  },
  paper: { padding: "20px", minWidth: "20rem", backgroundColor: "#9400d2" },
};
export default function HomePage(): JSX.Element {
  const errorStatus = useAppSelector((state) => state.error.error);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (socket && socket.connected) {
      socket.disconnect();
    }
    if (errorStatus) {
      alert("something went wrong on the serverside");
      dispatch(errorActions.updateErrorStatus(false));
    }
  }, [dispatch]);
  return (
    <Container sx={classes.container}>
      <Paper elevation={3} sx={classes.paper}>
        <FormManager />
      </Paper>
    </Container>
  );
}
