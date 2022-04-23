import { Drawer, SxProps, Theme } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { uiActions } from "../../stores/slices/uiSlice";

interface Props extends ReactProps {
  sx?: SxProps<Theme>;
}

export default function SideDrawer(props: Props) {
  const dispatch = useAppDispatch();
  const openDrawer = useAppSelector((state) => state.ui.drawerOpen);

  const toogleOnDraw = (state: boolean) => () => {
    dispatch(uiActions.toggleDrawer(state));
  };

  return (
    <>
      <Drawer
        variant="temporary"
        open={openDrawer}
        anchor="left"
        sx={{ ...props.sx, width: { xs: "70%", sm: "60%", md: "60%" } }}
        onClose={toogleOnDraw(false)}
      >
        {props.children}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          width: "20%",
          display: { lg: "block", md: "none", xs: "none" },
          ...props.sx,
        }}
        anchor="left"
      >
        {props.children}
      </Drawer>
    </>
  );
}
