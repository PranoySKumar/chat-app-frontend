import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type participant = { user_id: string; alias: string };
const initialState = {
  participants: [] as participant[],
  loading: true,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {
    updateIsloading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    initialiseAliases(state, action: PayloadAction<participant[]>) {
      state.participants = action.payload;
    },
    updateParticipants(state, action: PayloadAction<participant>) {
      for (let i = 0; i < state.participants.length; i++) {
        const user = state.participants[i];
        if (user.user_id === action.payload.user_id) {
          return;
        }
      }
      state.participants.push(action.payload);
    },
    deleteAlias(state, action: PayloadAction<string>) {
      const user_id = action.payload;
      state.participants = state.participants.filter((participant) => participant.user_id !== user_id);
    },

    reset(state) {
      state.participants = [];
      state.loading = true;
    },
  },
});
export const chatActions = chatSlice.actions;
