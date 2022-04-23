import HomePage from "./pages/HomePage/HomePage";
import { configureAxios } from "./utils/axios-util";
import { Route, Routes } from "react-router-dom";
import ChatPage from "./pages/ChatPage/ChatPage";
import { CssBaseline } from "@mui/material";
//initialising utils
configureAxios();

function App() {
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chatbox" element={<ChatPage />} />
      </Routes>
    </>
  );
}

export default App;
