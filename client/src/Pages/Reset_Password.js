import {
  Avatar,
  Button,
  Center,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

function Forgot() {
  const { id } = useParams();
  const [showPassword, setShowPass] = useState(false);
  const [validate, setValidate] = useState(false);
  const [passwords, setPasswords] = useState({
    password: "",
    co_password: "",
  });
  const navigate = useNavigate();
  const toast = useToast();
  function handleShowClick() {
    if (showPassword) setShowPass(false);
    else setShowPass(true);
  }
  useEffect(() => {
    console.log(id);
    const url =
      process.env.REACT_APP_BACKEND_BASE_URL + "users/validate_change_password";

    async function validate() {
      const res = await axios.post(url, { id: id });
      console.log(res);
      if (res.data.code === 201) {
        navigate("/");
      } else if (res.data.code === 500) {
        toast({
          title: "Sorry for inconvenience but error occured at our end!",
          status: "error",
          isClosable: true,
          position: "top-right",
        });
      } else {
        setValidate(true);
      }
    }
    validate();
  });
  function show_content() {
    return (
      <Center>
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
            w="25vw"
            justifyContent="center"
            alignItems="center"
          >
            <Avatar bg="teal" />
            <Heading color="teal.400" pb="5">
              Reset Password
            </Heading>
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
                  value={passwords.password}
                  onChange={(e) => {
                    setPasswords({
                      ...passwords,
                      password: e.target.value,
                    });
                  }}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl pb="3">
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  children={<LockIcon color="gray.500" />}
                />
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={passwords.co_password}
                  onChange={(e) => {
                    setPasswords({
                      ...passwords,
                      co_password: e.target.value,
                    });
                  }}
                />
              </InputGroup>
            </FormControl>
            <Button
              borderRadius={"5px"}
              type="submit"
              variant="solid"
              colorScheme="teal"
              width="full"
              // disabled
            >
              <Spinner />
            </Button>
          </Stack>
        </Flex>
      </Center>
    );
  }
  return <>{validate ? show_content() : <></>}</>;
}
export default Forgot;
