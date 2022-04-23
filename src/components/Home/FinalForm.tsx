import { Button, Container, SxProps, TextField, Theme, Typography } from "@mui/material";
import { useRef } from "react";
import FormButton from "../UI/FormButtom";

type Props = { joinRoom: (id: string) => void; createRoom: () => void };

export default function EntryForm(props: Props) {
  const IDInputRef = useRef<HTMLInputElement>(null);

  const onJoinRoomHandler = () => {
    if (IDInputRef.current!.value.trim().length > 0) {
      props.joinRoom(IDInputRef.current!.value);
    } else {
      alert("please enter a valid id");
    }
  };

  const onCreateRoomHandler = () => {
    props.createRoom();
  };
  return (
    <Container maxWidth="sm" sx={classes.container}>
      <TextField
        inputRef={IDInputRef}
        InputLabelProps={{ sx: { color: "#f5dfff", "&.Mui-focused": { color: "white" } } }}
        inputProps={{ sx: { color: "white" } }}
        label="Room ID"
        size="small"
        sx={classes.textFeild}
      />
      <FormButton sx={{ my: "10px" }} size="large" variant="outlined" onClickButton={onJoinRoomHandler}>
        Join
      </FormButton>
      <Typography marginTop="5px" align="center" color="white" variant="h6">
        OR
      </Typography>
      <FormButton
        variant="contained"
        size="large"
        sx={{ bgcolor: "white", color: "darkviolet", "&:hover": { bgcolor: "#e7e7e7" } }}
        onClickButton={onCreateRoomHandler}
      >
        Create New Room
      </FormButton>
    </Container>
  );
}

type Classes = {
  container: SxProps<Theme>;
  textFeild: SxProps<Theme>;
};
const classes: Classes = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  textFeild: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgba(255, 255, 255, 0.39)",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
  },
};
