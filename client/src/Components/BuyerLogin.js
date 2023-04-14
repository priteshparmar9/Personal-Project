import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { FaFacebook } from "react-icons/fa";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  HStack,
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
import { useAuth0 } from "@auth0/auth0-react";

function BuyerLogin() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPass] = useState(false);
  const [submitted, setSubmit] = useState(false);
  const [profile, setProfile] = useState([]);

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
  const { loginWithRedirect } = useAuth0();
  function LoginUsingGoogle(credentialsResponse) {
    console.log(credentialsResponse);
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${credentialsResponse.clientId}`,
        {
          headers: {
            Authorization: `Bearer ${credentialsResponse.clientId}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => console.log(err));
  }
  const glogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${codeResponse.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    },
    onError: (error) => console.log("Login Failed:", error),
  });
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
                  <Link to="../forgot_password">forgot password?</Link>
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
            <HStack>
              {/* <GoogleLogin
                onSuccess={LoginUsingGoogle}
                onError={() => {
                  console.log("Login Failed");
                }}
              /> */}
              <Button w="50%" leftIcon={<FcGoogle />} onClick={glogin}>
                Continue with Google
              </Button>
              <Button w="50%" colorScheme="facebook" leftIcon={<FaFacebook />}>
                Continue with Facebook
              </Button>
            </HStack>
          </Stack>
        </form>
      </Box>
    </Center>
  );
}

export default BuyerLogin;
