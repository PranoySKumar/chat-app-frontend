import { MESSAGES } from "../../components/ChatBox/MESSAGES";
import { AppDispatch } from "../../stores/reduxStore";
import { messageActions } from "../../stores/slices/messagesSlice";
import { socket } from "../socket-io";
import { format } from "date-fns";

export function intialiseChatManager(dispatch: AppDispatch) {
  socket.on("publish_message", (message, senderAlias) => {
    dispatch(messageActions.addToMesssages([message, MESSAGES.message, senderAlias, format(new Date(), "hh:mm aaa ")]));
  });
}
export const cleanChatManagerListeners = () => {
  socket.removeListener("publish_message");
};
