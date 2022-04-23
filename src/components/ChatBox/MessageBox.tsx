import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { useAppSelector } from "../../hooks/storeHooks";
import MessageDisplay from "./Message";

export function MessageBox() {
  const messages = useAppSelector((state) => state.messages.messages);
  const scrollToBoxRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    scrollToBoxRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    handleScroll();
  });
  return (
    <>
      <Box
        sx={{
          display: "flex",
          bgcolor: "darkviolet",
          width: "100%",
          height: "100vh",

          flexDirection: "column",
        }}
      >
        <Box sx={{ bgcolor: "darkviolet", height: "5rem", minHeight: "4rem", width: "100%" }} />
        {messages.map((message, i) => (
          <MessageDisplay key={i} message={message} />
        ))}
        <Box ref={scrollToBoxRef} sx={{ bgcolor: "darkviolet", height: "8rem", minHeight: "8rem", width: "100%" }} />
      </Box>
    </>
  );
}
