import { Box, Center } from "@chakra-ui/react";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./Components/NavigationBar";
import Forgot from "./Pages/Reset_Password";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPage from "./Pages/Forgot_Password";
import AddItem from "./Pages/AddItem";
import SellerPage from "./Pages/SellerPage";
import ProductPage from "./Pages/ProductPage";
import Error from "./Pages/Error";
import Footer from "./Components/Footer";

function App() {
  return (
    <Box className="App" bgColor="InfoBackground">
      <div style={{ position: "relative" }}>
        <Center>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot_password" element={<ForgotPage />} />
              <Route path="/change_password/:id" element={<Forgot />} />
              <Route path="/" element={<Sidebar />}>
                <Route path="product/:id" element={<ProductPage />} />
                <Route path="addItem" element={<AddItem />} />
                <Route path="seller/:name" element={<SellerPage />} />
                <Route path="login" element={<Login />} />
                <Route path="*" element={<Error />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Center>
      </div>
    </Box>
  );
}

export default App;
