import React from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Layout(props) {
  let loggedin = props.loggedin;
  let setLoggedIn = props.setLoggedIn;
  return (
    <Flex flexDir="column" minW="100%" m={0}>
      <Navbar loggedin={loggedin} setLoggedIn={setLoggedIn} />
      <Box
        className="clearfix"
        css={{ "&::after": { content: `""`, display: "table", clear: "both" } }}
      >
        <Outlet />
      </Box>
      <Heading className="clearfix" as="footer" bottom={0}>
        Footer
      </Heading>
    </Flex>
  );
}
export default Layout;
