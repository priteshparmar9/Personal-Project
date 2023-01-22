import {
  Avatar,
  Flex,
  Heading,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BuyerSignup from "../Components/BuyerSignup";
import SellerSignup from "../Components/SellerSignup";

function Signup() {
  const [height, setHeight] = useState("100vh");
  return (
    <Flex
      flexDirection="column"
      minH="100vh"
      backgroundColor="black.100"
      justifyContent="center"
      alignItems="center"
      overflowY={"hidden"}
    >
      {/* <ToastContainer /> */}
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
        // position="fixed"
      >
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <ToastContainer />
        <Avatar bg="teal" />
        <Heading color="teal.400">Signup</Heading>
        <Tabs
          variant="soft-rounded"
          colorScheme="green"
          isFitted
          p="4"
          minW="35vw"
        >
          <TabList>
            <Tab>Buyer</Tab>
            <Tab>Seller</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <BuyerSignup />
            </TabPanel>
            <TabPanel>
              <SellerSignup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </Flex>
  );
}
export default Signup;