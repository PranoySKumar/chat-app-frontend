import { Box, Container, SxProps, Theme } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MessageBox } from "../../components/ChatBox/MessageBox";
import { MESSAGES } from "../../components/ChatBox/MESSAGES";
import ParticipantsList from "../../components/ChatBox/ParticipantsList";
import InputBox from "../../components/UI/InputBox";
import NavBar from "../../components/UI/NavBar";
import SideDrawer from "../../components/UI/SideDrawer";
import TipDialog from "../../components/UI/TipDialog";
import { useAppDispatch } from "../../hooks/storeHooks";
import { AppDispatch } from "../../stores/reduxStore";
import { chatActions, participant } from "../../stores/slices/chatSlice";
import { messageActions } from "../../stores/slices/messagesSlice";
import { axiosAPI } from "../../utils/axios-util";
import { createSocketConnection, socket } from "../../utils/socket-io";
import {
  cleanChatManagerListeners,
  intialiseChatManager as initialiseSocketChatManager,
} from "../../utils/socket-manager/chat";
import {
  cleanNotificationManagerListeners,
  initialseSocketNotificationManager,
} from "../../utils/socket-manager/notification";

export default function ChatPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  //onemit message
  const onEmitMessageHandler = (message: string) => {
    socket.emit("emit_to_room", message);
  };

  //setup
  useEffect(() => {
    if (!localStorage.getItem("USER_ALIAS")) {
      navigate("/");
    }
    //creates socket connection
    createSocketConnection(dispatch, navigate);
    socket.emit("join_room");
    dispatch(messageActions.addToMesssages(["You Joined The Room", MESSAGES.notification]));
    initialseSocketNotificationManager(dispatch);
    initialiseSocketChatManager(dispatch);
    fetchListOfParicipants(dispatch);
    return () => {
      dispatch(chatActions.reset());
      cleanChatManagerListeners();
      cleanNotificationManagerListeners();
    };
  }, [dispatch, navigate]);
  return (
    <Container sx={classes.Container}>
      <SideDrawer sx={classes.sideDrawer}>
        <ParticipantsList />
      </SideDrawer>
      <Box sx={classes.BoxContainer}>
        <NavBar />
        <MessageBox />
        <InputBox sx={classes.inputBox} onDone={onEmitMessageHandler} />
      </Box>
      <TipDialog />
    </Container>
  );
}

type Response = {
  participants: participant[];
};

const fetchListOfParicipants = async (dispatch: AppDispatch) => {
  axiosAPI
    .get<Response>("/data/fetch-users/" + localStorage.getItem("ROOM_ID"))
    .then((response) => {
      console.log(response.data);
      dispatch(chatActions.initialiseAliases(response.data.participants));
      dispatch(chatActions.updateIsloading(false));
    })
    .catch((error) => {
      console.log(error);
    });
};

type CssClasses = {
  Container: SxProps<Theme>;
  BoxContainer: SxProps<Theme>;
  sideDrawer: SxProps<Theme>;
  inputBox: SxProps<Theme>;
};
const classes: CssClasses = {
  Container: {
    display: "flex",
    justifyContent: "center",
    width: "100vw",
    "&.MuiContainer-root": { padding: 0 },
  },
  BoxContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marign: "auto",
    width: "100%",
    height: "100vh",
    overflow: "scroll",
    overflowX: "hidden",
    maxHeight: "100vh",
    bgcolor: "darkviolet",
    maxWidth: "md",
  },
  sideDrawer: {
    width: "30%",
    boxShadow: "-2px 0px 3px 1px rgba(0, 0, 0, 0.2)",
    zIndex: "2",
    "& .MuiPaper-root": {
      position: "static",
      width: "100%",
    },
  },
  inputBox: {
    position: "absolute",
    bottom: "5px",
    width: { lg: "50rem", md: "55rem", sm: "97vw", xs: "97vw" },
    maxWidth: "md",
  },
};
