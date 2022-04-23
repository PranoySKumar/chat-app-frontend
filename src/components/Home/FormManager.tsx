import { Box, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosAPI } from "../../utils/axios-util";
import AliasForm from "./AliasForm";
import FinalForm from "./FinalForm";

type Response = {
  user_id: string;
  room_id: string;
};

export default function FormManager(props: ReactProps): JSX.Element {
  const [next, setNext] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const joinRoom = (id: string) => {
    setIsLoading(true);
    axiosAPI
      .get<Response>(`auth/join-room/${id}/?alias=${localStorage.getItem("USER_ALIAS")}`)
      .then((response) => {
        window.localStorage.setItem("USER_ID", response.data.user_id);
        window.localStorage.setItem("ROOM_ID", response.data.room_id);
        //navigate to chat box
        navigate("/chatbox", { state: { user_id: localStorage.getItem("USER_ALIAS") } });
      })
      .catch((error) => {
        console.log(error);
        console.log("Something went wrong while joining the room");
      });
  };

  const onNext = (alias: string | undefined) => {
    if (alias?.trim()) {
      setNext(true);
      localStorage.setItem("USER_ALIAS", alias);
    } else {
      alert("please enter a valid alias name");
    }
  };

  const createRoom = () => {
    setIsLoading(true);
    axiosAPI
      .get<Response>(`auth/create-room/?alias=${localStorage.getItem("USER_ALIAS")}`)
      .then((response) => {
        window.localStorage.setItem("USER_ID", response.data.user_id);
        window.localStorage.setItem("ROOM_ID", response.data.room_id);
        navigate("/chatbox", { state: { user_id: localStorage.getItem("USER_ALIAS") } });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      {!next && !isLoading && <AliasForm onNext={onNext} />}
      {next && !isLoading && <FinalForm joinRoom={joinRoom} createRoom={createRoom} />}
      {isLoading && <CircularProgress sx={{ color: "white" }} />}
    </Box>
  );
}
