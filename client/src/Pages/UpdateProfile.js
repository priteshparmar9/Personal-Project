import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
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
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const UpdateProfile = () => {
  const [showPassword, setShowPass] = useState(false);
  const [otp, setOtp] = useState("");
  const [user, setUser] = useState({
    username: "",
    password: "",
    re_password: "",
    email: "",
    pic: Object,
  });
  const [pro_pic, setPic] = useState();
  const [otpSent, setOTP] = useState(false);
  const [submitted, setSubmit] = useState(false);
  const navigate = useNavigate();
  return (
    <Center h="90vh">
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
                  {/* onClick={handleShowClick} */}
                  <Button h="1.75rem" size="sm">
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
              //   onClick={submit}
            >
              {submitted ? <Spinner /> : "Login"}
            </Button>
          </Stack>
        </form>
      </Box>
    </Center>
  );
};

export default UpdateProfile;
