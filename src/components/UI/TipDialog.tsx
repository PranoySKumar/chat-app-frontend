import { ContentCopy } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function TipDialog() {
  const [open, setOpen] = useState<boolean>(true);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Tip"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          To invite more participants CLICK on{" "}
          <span style={{ color: "darkviolet", textAlign: "center" }}>
            Chat Room <ContentCopy />{" "}
          </span>{" "}
          to copy the Room ID and share it with your friends.
        </DialogContentText>
        <DialogContentText>
          Use shortcut <span style={{ color: "darkviolet", textAlign: "center" }}>Ctrl + Enter</span> to send the
          message if you are on PC.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

export {};
