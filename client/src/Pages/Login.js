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

function Login() {
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
