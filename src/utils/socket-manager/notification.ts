import { MESSAGES } from "../../components/ChatBox/MESSAGES";
import { AppDispatch } from "../../stores/reduxStore";
import { chatActions, participant } from "../../stores/slices/chatSlice";
import { messageActions } from "../../stores/slices/messagesSlice";
import { socket } from "../socket-io";

export function initialseSocketNotificationManager(dispatch: AppDispatch) {
  socket.on("user_joined", (alias, user_id) => {
    if (user_id === localStorage.getItem("USER_ID")) {
      return;
    }
    const participant: participant = { user_id, alias };
    dispatch(chatActions.updateParticipants(participant));
    //update the notification.
    dispatch(messageActions.addToMesssages([`User "${alias}" Joined.`, MESSAGES.notification]));
  });
  socket.on("user_left", (user_id, alias) => {
    dispatch(chatActions.deleteAlias(user_id));
    dispatch(messageActions.addToMesssages([`User "${alias}" left.`, MESSAGES.notification]));
  });
}
export const cleanNotificationManagerListeners = () => {
  socket.removeAllListeners("user_joined");
  socket.removeAllListeners("user_left");
};
