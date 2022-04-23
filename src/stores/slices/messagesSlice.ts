import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MESSAGES } from "../../components/ChatBox/MESSAGES";

interface MessagesState {
  messages: MessageTuple[];
}
export type MessageTuple = [string, MESSAGES] | [string, MESSAGES, string, string];

const initialState: MessagesState = {
  messages: [],
};

export const messagesSlice = createSlice({
  name: "messages",
  initialState: initialState,
  reducers: {
    addToMesssages(state, action: PayloadAction<MessageTuple>) {
      if (state.messages.length > 250) {
        state.messages.shift();
      }
      state.messages.push(action.payload);
    },
    reset(state) {
      state.messages = [];
    },
  },
});
export const messageActions = messagesSlice.actions;
