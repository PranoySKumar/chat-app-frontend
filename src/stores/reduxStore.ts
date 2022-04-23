import { configureStore } from "@reduxjs/toolkit";
import { messagesSlice } from "./slices/messagesSlice";
import { uiSlice } from "./slices/uiSlice";
import { chatSlice } from "./slices/chatSlice";
import { errorSlice } from "./slices/errorSlice";
export const store = configureStore({
  reducer: {
    messages: messagesSlice.reducer,
    ui: uiSlice.reducer,
    chat: chatSlice.reducer,
    error: errorSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
