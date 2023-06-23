import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
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
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BuyerLogin(props) {
  const setLoggedIn = props.setLoggedIn;
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPass] = useState(false);
  const [submitted, setSubmit] = useState(false);

  const navigate = useNavigate();
  function submit(e) {
    e.preventDefault();
    setShowPass(false);
    setSubmit(true);

    if (user.username && user.password) {
      const url = process.env.REACT_APP_BACKEND_BASE_URL + "users/login/";
      try {
        axios.post(url, user).then((res) => {
          console.log(res);
          if (res.data.code === 200) {
            // console.log(res.data.token);
            window.localStorage.setItem("token", res.data.token);
            setLoggedIn({
              loggedin: true,
              role: "buyer",
            });
            navigate("/");
          } else if (res.data.code === 201) {
            toast.error(
              "Invalid Credentials! Please login again with correct credentials",
              {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
              }
            );
          } else {
            toast.error("Internal Server Error! Please try again later", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: false,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        });
      } catch (error) {
        toast.error("Internal Server Error! Please try again later", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      toast.error("Please enter all fields inorder to login!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setSubmit(false);
  }
  function handleShowClick() {
    if (showPassword) setShowPass(false);
    else setShowPass(true);
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
          setSubmit(true);
          // console.log(res.data);
          const url =
            process.env.REACT_APP_BACKEND_BASE_URL + "users/google_login/";
          axios.post(url, res.data).then((res) => {
            if (res.data.code === 200) {
              // console.log(res);
              window.localStorage.setItem("token", res.data.token);
              setLoggedIn({
                loggedin: true,
                role: "buyer",
              });
              window.location.reload();
            } else {
              toast.error(
                "No account found with given Google account! Please signin first!",
                {
                  position: "bottom-right",
                  autoClose: 5000,
                  hideProgressBar: true,
                  closeOnClick: false,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                }
              );
            }
          });
          setSubmit(false);
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
