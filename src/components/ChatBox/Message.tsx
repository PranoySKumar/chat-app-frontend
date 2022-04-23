import { Container, Typography } from "@mui/material";
import type { MessageTuple } from "../../stores/slices/messagesSlice";
import { MESSAGES } from "./MESSAGES";

type Props = {
  message: MessageTuple;
};

const Message = (props: { time: string; message: string; alias: string; alignSelf: string }) => (
  <div
    style={{
      borderRadius: "15px",
      margin: "5px 10px 5px 10px",
      minWidth: "10rem",
      maxWidth: "60%",
      width: "fit-content",
      backgroundColor: "whitesmoke",
      padding: "10px",
      display: "flex",
      flexDirection: "column",
      alignSelf: props.alignSelf,
    }}
  >
    {props.alias && (
      <Typography width="100%" sx={{ mb: "2px", mt: 0 }} color="#9400d3" fontWeight="bold">
        {props.alias}
      </Typography>
    )}

    <Typography
      lineHeight="1"
      color={"#58007e"}
      sx={{ wordWrap: "break-word" }}
      fontSize={"0.9rem"}
    >
      {props.message}
    </Typography>
    <Typography fontSize={"0.8rem"} color={"#9400d3"} textAlign={"right"}>
      {props.time}
    </Typography>
  </div>
);

//MainExport
export default function MessageDisplay(props: Props) {
  const [message, type, alias, time] = props.message;

  const isSender = alias === localStorage.getItem("USER_ALIAS");
  console.log("alias", alias);
  console.log("localStorageAlias", localStorage.getItem("USER_ALIAS"));
  switch (type) {
    case MESSAGES.notification:
      return (
        <Container
          sx={{
            bgcolor: "#b200fd",
            color: "white",
            borderRadius: "30px",
            textAlign: "center",
            width: "fit-content",
            my: "5px",
          }}
          maxWidth="xs"
        >
          <span style={{ fontSize: "0.8rem", fontWeight: "bold" }}>{message}</span>
        </Container>
      );
    case MESSAGES.message:
      switch (isSender) {
        case true:
          return (
            <Message message={message} alias={""} alignSelf={"flex-end"} time={time as string} />
          );

        case false:
          return (
            <Message
              message={message}
              alias={alias!}
              alignSelf="flex-start"
              time={time as string}
            />
          );
      }
      break;
    default:
      return null;
  }
}
