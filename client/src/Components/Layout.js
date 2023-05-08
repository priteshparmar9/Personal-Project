import React from "react";
import { Grid, GridItem, Center, Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

function Layout() {
  return (
    <Flex flexDir="column" minW="100%" minH="100%" m={0}>
      <Navbar />
      <Box
        mt="50px"
        minH="100%"
        pb="50px"
        bgColor="rgb(240, 240, 240)"
        flexGrow={1}
      >
        <Outlet />
      </Box>
      <Box w="100%" pos="fixed" bottom={0}>
        <Footer />
      </Box>
    </Flex>
  );
}
export default Layout;
