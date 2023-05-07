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
import BuyerLogin from "../Components/BuyerLogin";
import SellerLogin from "../Components/SellerLogin";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    let token = window.localStorage.getItem("token");
    if (token) {
      let url = process.env.REACT_APP_BACKEND_BASE_URL + "users/validateToken";
      axios.post(url, { token: token }).then((res) => {
        if (res.status == 200) {
          navigate("/");
        }
      });
    }
  });
  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="black.100"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal" />
        <Heading color="teal.400">Login</Heading>
        <Tabs variant="soft-rounded" colorScheme="green" isFitted w="90%" p="4">
          <TabList>
            <Tab>Buyer</Tab>
            <Tab>Seller</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <BuyerLogin />
            </TabPanel>
            <TabPanel>
              <SellerLogin />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </Flex>
  );
}
export default Login;
