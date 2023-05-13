import React from "react";
import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Layout(props) {
  let loggedin = props.loggedin;
  let setLoggedIn = props.setLoggedIn;
  return (
    <Flex flexDir="column" minW="100%" m={0}>
      <Navbar loggedin={loggedin} setLoggedIn={setLoggedIn} />
      <Outlet />
    </Flex>
  );
}
export default Layout;
