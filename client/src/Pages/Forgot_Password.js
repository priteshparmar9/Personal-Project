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
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

function ForgotPage() {
  const toast = useToast();
  const [user, setUser] = useState("");
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
            Forgot Password
          </Heading>
          <FormControl>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                children={<LockIcon color="gray.500" />}
              />
              <Input
                type="text"
                placeholder="Password"
                value={user}
                onChange={(e) => {
                  setUser(e.target.value);
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
            disabled
          >
            <Spinner />
          </Button>
        </Stack>
      </Flex>
    </Center>
  );
}
export default ForgotPage;
