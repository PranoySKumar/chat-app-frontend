import { Menu } from "@mui/icons-material";
import { ContentCopy } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/storeHooks";
import { chatActions } from "../../stores/slices/chatSlice";
import { messageActions } from "../../stores/slices/messagesSlice";
import { uiActions } from "../../stores/slices/uiSlice";
import { ToastContainer, toast } from "react-toastify";
import { socket } from "../../utils/socket-io";
import "react-toastify/dist/ReactToastify.css";

const icon_color = "#9400d3";
export default function NavBar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onClickHandler = () => {
    dispatch(uiActions.toggleDrawer(true));
  };
  const onLogOutHandler = () => {
    localStorage.clear();
    dispatch(chatActions.reset());
    dispatch(uiActions.reset());
    dispatch(messageActions.reset());
    socket.disconnect();
    navigate("/");
  };
  const copyToClipBoard = async () => {
    const room_id = localStorage.getItem("ROOM_ID");
    await navigator.clipboard.writeText(room_id!);
    toast.success("🦄 copied!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <>
      <ToastContainer />
      <AppBar
        sx={{
          position: "fixed",
          width: { lg: "51.4rem", md: "55.2rem", sx: "5rem" },
          "&.MuiPaper-root": { backgroundColor: "white" },
          zIndex: 1,
        }}
        position={"static"}
      >
        <Toolbar sx={{ color: "#9400d3", justifyContent: "space-between" }}>
          <IconButton onClick={onClickHandler} sx={{ color: icon_color, display: { lg: "none" } }}>
            <Menu />
          </IconButton>
          <Button onClick={copyToClipBoard} variant="text" sx={{ color: "#9400d3" }}>
            <Typography>Meet Up</Typography>
            <ContentCopy />
          </Button>

          <IconButton onClick={onLogOutHandler}>
            <LogoutIcon sx={{ color: icon_color }} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}
