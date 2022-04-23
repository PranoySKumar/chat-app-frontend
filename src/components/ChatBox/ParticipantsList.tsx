import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../hooks/storeHooks";

export default function ParticipantsList() {
  const { participants, loading: isLoading } = useAppSelector((state) => state.chat);
  return (
    <>
      {isLoading && <CircularProgress sx={{ color: "darkviolet", textAlign: "center" }} />}
      {!isLoading && participants && (
        <List>
          <ListSubheader sx={{ color: "#b200fd" }}>Participants</ListSubheader>
          <Divider sx={{ borderColor: "rgba(223, 150, 255, 0.568)" }} />
          {participants.map((participant, index) => {
            return (
              <ListItem key={participant.alias + index}>
                <ListItemAvatar>
                  <Avatar {...stringAvatar(participant.alias)} />
                </ListItemAvatar>
                <ListItemText sx={{ color: "#7600a8" }} primary={participant.alias} />
              </ListItem>
            );
          })}
        </List>
      )}
    </>
  );
}

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substring(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  const splitedName = name.toUpperCase().split(" ");
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${splitedName[0][0]}${splitedName[1] ? splitedName[1][0] : ""}`,
  };
}
