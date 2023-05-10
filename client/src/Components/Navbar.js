import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "./logo.png";
import { FiSearch } from "react-icons/fi";
// import logo from "../static/images/logo.png";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  return (
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
        w="85%"
        justifyContent="space-between"
        pos="relative"
        transition="all 1s"
        zIndex="2"
        p="5px"
      >
        <Link to="/">
          <Box p="5px" pl="10px" pr="10px" mr="10px" borderRadius="2xl">
            <Text
              fontFamily="'Josefin Sans', sans-serif"
              fontSize="2xl"
              bgGradient="linear(to-l, rgb(249, 217, 73), rgb(244, 80, 80))"
              bgClip="text"
              fontWeight="extrabold"
            >
              EAuction
            </Text>
          </Box>
        </Link>
        <InputGroup maxW="50vmin">
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
      </Flex>
    </Flex>
  );
};

export default Navbar;
