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
  Drawer,
  DrawerBody,
  Stack,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import logo from "../static/images/logo.png";

const Navbar = (props) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  let loggedin = props.loggedin;
  let setLoggedIn = props.setLoggedIn;
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  return (
    <Box mb="7" bgColor="red">
      {!isMobile ? (
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
            ) : loggedin.role == "buyer" ? (
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
                    <MenuItem
                      onClick={() => {
                        navigate("/remainingCheckouts");
                      }}
                    >
                      Remaining Checkouts
                    </MenuItem>
                    <MenuItem>History</MenuItem>
                    <MenuItem>My Orders</MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate("/update");
                      }}
                    >
                      Update Profile
                    </MenuItem>
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
                      setLoggedIn({ loggedin: false, role: "none" });
                    }}
                  >
                    Logout
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
                        navigate("/additem");
                      }}
                    >
                      Add Item
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate("/currentWinnings");
                      }}
                    >
                      Current Winnings
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate("/remainingCheckouts");
                      }}
                    >
                      Remaining Checkouts
                    </MenuItem>
                    <MenuItem>History</MenuItem>
                    <MenuItem>My Orders</MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate("/update");
                      }}
                    >
                      Update Profile
                    </MenuItem>
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
                      setLoggedIn({ loggedin: false, role: "none" });
                    }}
                  >
                    Logout
                  </Button>
                </Link>
              </HStack>
            )}
          </Flex>
        </Flex>
      ) : (
        <Flex
          mr="4px"
          flexDir="row"
          minW="100%"
          justifyContent="center"
          bgColor="rgb(60, 72, 107)"
          top="0"
          pos="fixed"
          zIndex={1}
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
              <Image src={logo} h="10vmin" />
            </Link>
            <HamburgerIcon
              ref={btnRef}
              color="white"
              onClick={onOpen}
              mt="10px"
            />

            <Drawer
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
              finalFocusRef={btnRef}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>E-Auction</DrawerHeader>

                <DrawerBody mt="20px">
                  <Flex flexDir="column">
                    <InputGroup minW="50vmin">
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
                            onClose();
                            navigate(`/search/${query}`);
                          }
                        }}
                      >
                        <FiSearch />
                      </InputRightAddon>
                    </InputGroup>
                    {!loggedin.loggedin ? (
                      <Flex mt="20px" flexDir="column" display="flex">
                        <Link to="/login">
                          <Button
                            bgColor="transparent"
                            _hover={{
                              color: "black",
                              bgColor: "rgb(240, 240, 240)",
                            }}
                            onClick={() => {
                              onClose();
                            }}
                          >
                            Login
                          </Button>
                        </Link>
                        <Link to="/signup">
                          <Button
                            bgColor="transparent"
                            _hover={{
                              color: "black",
                              bgColor: "rgb(240, 240, 240)",
                            }}
                            onClick={() => {
                              onClose();
                            }}
                          >
                            Signup
                          </Button>
                        </Link>
                        <Link to="/login">
                          <Button
                            bgColor="transparent"
                            _hover={{
                              color: "black",
                              bgColor: "rgb(240, 240, 240)",
                            }}
                            onClick={() => {
                              onClose();
                            }}
                          >
                            Login
                          </Button>
                        </Link>
                        <Link to="/login">
                          <Button
                            bgColor="transparent"
                            _hover={{
                              color: "black",
                              bgColor: "rgb(240, 240, 240)",
                            }}
                            onClick={() => {
                              onClose();
                            }}
                          >
                            Login
                          </Button>
                        </Link>
                      </Flex>
                    ) : (
                      <Flex flexDir="column" mt="20px">
                        <Link to="/currentWinnings">
                          <Button
                            bgColor="transparent"
                            _hover={{
                              color: "black",
                              bgColor: "rgb(240, 240, 240)",
                            }}
                            onClick={() => {
                              onClose();
                            }}
                          >
                            Current Winnings
                          </Button>
                        </Link>
                        <Link to="/remainingCheckouts">
                          <Button
                            bgColor="transparent"
                            _hover={{
                              color: "black",
                              bgColor: "rgb(240, 240, 240)",
                            }}
                            onClick={() => {
                              onClose();
                            }}
                          >
                            Remaining Checkouts
                          </Button>
                        </Link>
                        <Link to="/currentWinnings">
                          <Button
                            bgColor="transparent"
                            _hover={{
                              color: "black",
                              bgColor: "rgb(240, 240, 240)",
                            }}
                            onClick={() => {
                              onClose();
                            }}
                          >
                            History
                          </Button>
                        </Link>
                        <Link to="/currentWinnings">
                          <Button
                            bgColor="transparent"
                            _hover={{
                              color: "black",
                              bgColor: "rgb(240, 240, 240)",
                            }}
                            onClick={() => {
                              onClose();
                            }}
                          >
                            My Orders
                          </Button>
                        </Link>
                        <Link to="/currentWinnings">
                          <Button
                            bgColor="transparent"
                            _hover={{
                              color: "black",
                              bgColor: "rgb(240, 240, 240)",
                            }}
                            onClick={() => {
                              onClose();
                            }}
                          >
                            Update Profile
                          </Button>
                        </Link>

                        <Link to="/expired">
                          <Button
                            bgColor="transparent"
                            _hover={{
                              color: "black",
                              bgColor: "rgb(240, 240, 240)",
                            }}
                            onClick={() => {
                              onClose();
                            }}
                          >
                            Ended
                          </Button>
                        </Link>
                        <Link to="/login">
                          <Button
                            bgColor="transparent"
                            _hover={{
                              color: "black",
                              bgColor: "rgb(240, 240, 240)",
                            }}
                            onClick={() => {
                              onClose();
                              window.localStorage.clear();
                              setLoggedIn({ ...loggedin, loggedin: false });
                            }}
                          >
                            Logout
                          </Button>
                        </Link>
                      </Flex>
                    )}
                  </Flex>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Flex>
        </Flex>
      )}
    </Box>
  );
};

export default Navbar;
