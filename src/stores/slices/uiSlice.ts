import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  drawerOpen: boolean;
};
const initialState: InitialState = {
  drawerOpen: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    toggleDrawer(state, action: PayloadAction<boolean>) {
      state.drawerOpen = action.payload;
    },
    reset(state) {
      state.drawerOpen = false;
    },
  },
});

export const uiActions = uiSlice.actions;
