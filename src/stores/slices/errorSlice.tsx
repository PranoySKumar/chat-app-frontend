import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  error: boolean;
};
const initialState: InitialState = {
  error: false,
};

export const errorSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    updateErrorStatus(state, action: PayloadAction<boolean>) {
      state.error = action.payload;
    },
  },
});

export const errorActions = errorSlice.actions;
