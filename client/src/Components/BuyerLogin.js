import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
  Stack,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function BuyerLogin() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPass] = useState(false);
  const [submitted, setSubmit] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();
  function submit(e) {
    e.preventDefault();
    setShowPass(false);
    setSubmit(true);

    if (user.username && user.password) {
      const url = process.env.REACT_APP_BACKEND_BASE_URL + "users/login/";
      try {
        axios.post(url, user).then((res) => {
          // console.log(res);
          if (res.data.code === 200) {
            console.log(res.data.token);
            window.localStorage.setItem("token", res.data.token);
            navigate("/");
          } else if (res.data.code === 201) {
            toast({
              title:
                "Invalid Credentials! Please login again with correct credentials",
              status: "error",
              isClosable: true,
              position: "top-right",
            });
          } else {
            toast({
              title: "Internal Server Error! Please try again later",
              status: "warning",
              isClosable: true,
              position: "top-right",
            });
          }
        });
      } catch (error) {
        toast({
          title: "Internal Server Error! Please try again later",
          status: "warning",
          isClosable: true,
          position: "top-right",
        });
      }
    } else {
      toast({
        title: "Please enter all fields inorder to login!",
        status: "warning",
        isClosable: true,
        position: "top-right",
      });
    }
    setSubmit(false);
  }
  function handleShowClick() {
    if (showPassword) setShowPass(false);
    else setShowPass(true);
  }
  return (
    <Center>
      <Box minW={{ base: "90%", md: "468px" }}>
        <form>
          <Stack
            spacing={4}
            p="1rem"
            backgroundColor="white"
            boxShadow="md"
            borderRadius={"md"}
          >
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<EmailIcon color="gray.500" />}
                />
                <Input
                  type="text"
                  placeholder="Username / Email address"
                  disabled={submitted}
                  value={user.username}
                  onChange={(e) => {
                    setUser({ ...user, username: e.target.value });
                  }}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  children={<LockIcon color="gray.500" />}
                />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  disabled={submitted}
                  value={user.password}
                  onChange={(e) => {
                    setUser({ ...user, password: e.target.value });
                  }}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <VStack m={"0.5em"}>
                <FormHelperText textAlign="left">
                  <Link to="../signup">Create new Account</Link>
                </FormHelperText>
                <FormHelperText textAlign="right">
                  <Link>forgot password?</Link>
                </FormHelperText>
              </VStack>
            </FormControl>
            <Button
              borderRadius={"5px"}
              type="submit"
              variant="solid"
              colorScheme="teal"
              width="full"
              onClick={submit}
            >
              {submitted ? <Spinner /> : "Login"}
            </Button>
          </Stack>
        </form>
      </Box>
    </Center>
  );
}

export default BuyerLogin;
