import { Box, Center } from "@chakra-ui/react";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./Components/NavigationBar";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

function App() {
  return (
    <Box className="App">
      <div>
        <Center>
          <BrowserRouter>
            <Routes>
              <Route path="/" index element={<Sidebar />}></Route>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
            {/* <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
            <Routes>
              <Sidebar />
              <Route index element={<></>} />
              <Route path="/" element={<>Hello </>} />
            </Routes> */}

            {/* <Route path="*" element={ } /> */}
          </BrowserRouter>
        </Center>
      </div>
    </Box>
  );
}

export default App;
