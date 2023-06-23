import { Box, Center } from "@chakra-ui/react";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./Styles/App.css";
import Forgot from "./Pages/Reset_Password";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPage from "./Pages/Forgot_Password";
import AddItem from "./Pages/AddItem";
import SellerPage from "./Pages/SellerPage";
import ProductPage from "./Pages/ProductPage";
import Error from "./Pages/Error";
import ProductList from "./Pages/ProductList";
import Layout from "./Components/Layout";
import SearchList from "./Pages/SearchList";
import CurrentWinning from "./Pages/CurrentWinning";
import Expired from "./Pages/Expired";
import RemainingCheckouts from "./Pages/RemainingCheckouts";
import Payment from "./Pages/Payment";
import UpdateProfile from "./Pages/UpdateProfile";

function App() {
  const [loggedin, setLoggedIn] = useState({
    loggedin: false,
    role: "none",
  });
  useState(() => {
    if (window.localStorage.getItem("token") !== null) {
      setLoggedIn({ ...loggedin, loggedin: true });
    }
  }, [loggedin]);
  return (
    <Box className="App" bgColor="InfoBackground">
      <div style={{ position: "relative" }}>
        <Center>
          <BrowserRouter>
            <Routes>
              <Route
                path="/login"
                element={<Login setLoggedIn={setLoggedIn} />}
              />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot_password" element={<ForgotPage />} />
              <Route path="/change_password/:id" element={<Forgot />} />
              <Route
                path="/"
                element={
                  <Layout loggedin={loggedin} setLoggedIn={setLoggedIn} />
                }
              >
                <Route path="/" exact element={<ProductList />} />
                <Route path="product/:id" element={<ProductPage />} />
                <Route path="addItem" element={<AddItem />} />
                <Route path="seller/:name" element={<SellerPage />} />
                <Route path="login" element={<Login />} />
                <Route path="currentWinnings" element={<CurrentWinning />} />
                <Route
                  path="remainingCheckouts"
                  element={<RemainingCheckouts />}
                />
                <Route path="expired" element={<Expired />} />
                <Route path="search/:query" element={<SearchList />} />
                <Route path="payment/:id" element={<Payment />} />
                <Route path="update" element={<UpdateProfile />} />
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
