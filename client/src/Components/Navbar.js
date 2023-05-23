import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { ChevronDownIcon } from "@chakra-ui/icons";
import logo from "../static/images/logo.png";

const Navbar = (props) => {
  let loggedin = props.loggedin;
  let setLoggedIn = props.setLoggedIn;
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  return (
    <Box mb="7">
      <Flex
        mr="4px"
        flexDir="row"
        minW="100%"
        justifyContent="center"
        bgColor="rgb(60, 72, 107)"
        top="0"
        pos="fixed"
        zIndex={2}
      >
        <Flex
          flexDir="row"
          mt="2px"
          mb="2px"
          w="85%"
          justifyContent="space-between"
          pos="relative"
          transition="all 1s"
          zIndex="2"
          p="5px"
        >
          <Link to="/">
            <Image src={logo} h="5vmin" />
          </Link>
          <InputGroup ml="130px" maxW="50vmin">
            <Input
              placeholder="Search anything..."
              bgColor="white"
              variant="flushed"
              borderRadius="lg"
              pl="5px"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />

            <InputRightAddon
              cursor="pointer"
              onClick={() => {
                if (query) {
                  navigate(`/search/${query}`);
                }
              }}
            >
              <FiSearch />
            </InputRightAddon>
          </InputGroup>
          {!loggedin.loggedin ? (
            <HStack>
              <Link to="/login">
                <Button
                  bgColor="transparent"
                  color="rgb(240, 240, 240)"
                  _hover={{ color: "black", bgColor: "rgb(240, 240, 240)" }}
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  bgColor="transparent"
                  color="rgb(240, 240, 240)"
                  _hover={{ color: "black", bgColor: "rgb(240, 240, 240)" }}
                >
                  Signup
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  bgColor="transparent"
                  color="rgb(240, 240, 240)"
                  _hover={{ color: "black", bgColor: "rgb(240, 240, 240)" }}
                >
                  Login
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  bgColor="transparent"
                  color="rgb(240, 240, 240)"
                  _hover={{ color: "black", bgColor: "rgb(240, 240, 240)" }}
                >
                  Login
                </Button>
              </Link>
            </HStack>
          ) : (
            <HStack>
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  My Account
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      navigate("/currentWinnings");
                    }}
                  >
                    Current Winnings
                  </MenuItem>
                  <MenuItem>Remaining Payments</MenuItem>
                  <MenuItem>History</MenuItem>
                  <MenuItem>My Orders</MenuItem>
                  <MenuItem>Update Profile</MenuItem>
                </MenuList>
              </Menu>

              <Link to="/expired">
                <Button
                  bgColor="transparent"
                  color="rgb(240, 240, 240)"
                  _hover={{ color: "black", bgColor: "rgb(240, 240, 240)" }}
                >
                  Ended
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  bgColor="transparent"
                  color="rgb(240, 240, 240)"
                  _hover={{ color: "black", bgColor: "rgb(240, 240, 240)" }}
                  onClick={() => {
                    window.localStorage.clear();
                    setLoggedIn({ ...loggedin, loggedin: false });
                  }}
                >
                  Logout
                </Button>
              </Link>
            </HStack>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
