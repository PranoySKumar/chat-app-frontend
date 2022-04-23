import { Box, Container, Fab, SxProps, Theme } from "@mui/material";
import React, { useRef } from "react";
import { SendRounded as SendIcon } from "@mui/icons-material";

type Props = {
  sx?: SxProps<Theme>;
  onDone?: (text: string) => void;
};

export default function InputBox(props: Props) {
  const inputRef = useRef<HTMLDivElement>(null);

  const textInputHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && e.ctrlKey) {
      onDoneHandler();
    }
  };
  const onDoneHandler = () => {
    const text = inputRef.current?.textContent;
    if (text && text.trim().length! > 1) {
      inputRef.current?.blur();
      inputRef.current!.textContent = "";
      inputRef.current!.focus();
      props.onDone && props.onDone(text);
    }
  };

  return (
    <Box
      component={"div"}
      sx={{
        display: "flex",

        width: "md",
        height: "fit-content",
        ...props.sx,
      }}
    >
      <Container
        sx={{
          borderRadius: "10px",
          margin: "2px",
          mx: "5px",
          "&.MuiContainer-root": { padding: "5px" },
          backgroundColor: "whitesmoke",
        }}
      >
        <Box
          onKeyDown={textInputHandler}
          ref={inputRef}
          sx={{
            backgroundColor: "whitesmoke",
            height: "100%",
            margin: "0",
            width: "100%",
            outline: "none",
            wordWrap: "break-word",
          }}
          contentEditable
          suppressContentEditableWarning
          component="div"
        ></Box>
      </Container>
      <Fab
        sx={{
          mx: "",
          fontSize: "2rem",
          display: "flex",
          bgcolor: "white",
        }}
        aria-label="send"
        onClick={onDoneHandler}
      >
        <SendIcon fontSize="inherit" color="secondary" />
      </Fab>
    </Box>
  );
}
