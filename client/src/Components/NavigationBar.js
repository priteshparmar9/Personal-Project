import React, { useState } from "react";
import {
  Flex,
  Text,
  IconButton,
  Divider,
  Avatar,
  Heading,
  Grid,
  GridItem,
  Center,
} from "@chakra-ui/react";
import {
  FiMenu,
  FiHome,
  FiCalendar,
  FiUser,
  FiDollarSign,
  FiBriefcase,
  FiSettings,
} from "react-icons/fi";
import { IoPawOutline } from "react-icons/io5";
import NavItem from "./SideBar";
import { Outlet } from "react-router-dom";

function Sidebar() {
  const [navSize, changeNavSize] = useState("large");
  return (
    <Grid templateColumns="repeat(12, 1fr)">
      <GridItem colSpan={3}>
        <Flex
          pos="fixed"
          left="0"
          h="100vh"
          // mr="25px"
          marginTop="0vh"
          bgColor={"white"}
          boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
          // borderRadius={"1em"}
          w={navSize === "small" ? "75px" : "200px"}
          // w="200px"
          flexDir="column"
          justifyContent="space-between"
          top={"0rem"}
        >
          <Flex
            p="5%"
            flexDir="column"
            w="100%"
            m="5px"
            alignItems={navSize === "small" ? "center" : "flex-start"}
            as="nav"
          >
            <IconButton
              background="none"
              color={"black"}
              mt={5}
              _hover={{ background: "none" }}
              icon={<FiMenu />}
              onClick={() => {
                if (navSize === "small") changeNavSize("large");
                else changeNavSize("small");
              }}
            />
            <NavItem
              color={"black"}
              navSize={navSize}
              icon={FiHome}
              title="Dashboard"
              description="This is the description for the dashboard."
            />
            <NavItem
              color={"black"}
              navSize={navSize}
              icon={FiCalendar}
              title="Calendar"
              active
            />
            <NavItem
              color={"black"}
              navSize={navSize}
              icon={FiUser}
              title="Clients"
            />
            <NavItem navSize={navSize} icon={IoPawOutline} title="Animals" />
            <NavItem navSize={navSize} icon={FiDollarSign} title="Stocks" />
            <NavItem navSize={navSize} icon={FiBriefcase} title="Reports" />
            <NavItem navSize={navSize} icon={FiSettings} title="Settings" />

            <Flex
              p="5%"
              flexDir="column"
              w="100%"
              alignItems={navSize === "small" ? "center" : "flex-start"}
              mb={4}
            >
              <Divider display={navSize === "small" ? "none" : "flex"} />
              <Flex mt={6} align="center">
                <Avatar size="sm" src="avatar-1.jpg" />
                <Flex
                  flexDir="column"
                  ml={4}
                  display={navSize === "small" ? "none" : "flex"}
                >
                  <Heading as="h3" size="sm">
                    Sylwia Weller
                  </Heading>
                  <Text color="gray">Admin</Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </GridItem>
      <GridItem colSpan={7} position="relative" minH="100vh">
        <div>
          <Center>
            <Outlet />
          </Center>
          {/* <Footer /> */}
        </div>
      </GridItem>
    </Grid>
  );
}
export default Sidebar;
