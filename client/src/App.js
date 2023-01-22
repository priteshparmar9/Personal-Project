import { Box, Center } from "@chakra-ui/react";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./Components/NavigationBar";
import Forgot from "./Pages/Reset_Password";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPage from "./Pages/Forgot_Password";

function App() {
  return (
    <Box className="App" bgColor="InfoBackground">
      <div>
        <Center>
          <BrowserRouter>
            <Routes>
              <Route path="/" index element={<Sidebar />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot_password" element={<ForgotPage />} />
              <Route path="/change_password/:id" element={<Forgot />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </BrowserRouter>
        </Center>
      </div>
    </Box>
  );
}

export default App;
