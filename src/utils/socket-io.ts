import { NavigateFunction } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { AppDispatch } from "../stores/reduxStore";
import { chatActions } from "../stores/slices/chatSlice";
import { errorActions } from "../stores/slices/errorSlice";
import { messageActions } from "../stores/slices/messagesSlice";
import { uiActions } from "../stores/slices/uiSlice";

interface ServerToClientEvents {
  user_joined: (alias: string, user_id: string) => void;
  publish_message: (messsage: string, senderAlias: string) => void;
  user_left: (user_id: string, alias: string) => void;
  ERROR: (message: string) => void;
}
interface ClientToServerEvents {
  emit_to_room: (message: string) => void;
  join_room: () => void;
}

export let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

export function createSocketConnection(dispatch: AppDispatch, navigate: /*  */ NavigateFunction) {
  socket = io("http://localhost:4000", {
    auth: {
      user_id: localStorage.getItem("USER_ID") || "",
      room_id: localStorage.getItem("ROOM_ID"),
    },
  });
  socket.on("connect", () => {});
  socket.on("connect_error", () => {
    localStorage.clear();
    dispatch(chatActions.reset());
    dispatch(uiActions.reset());
    dispatch(messageActions.reset());
    dispatch(errorActions.updateErrorStatus(true));
    navigate("/");
  });
}
