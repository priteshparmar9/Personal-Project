import { Box, Button, Center, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import "../Styles/Error.css";
import { Link } from "react-router-dom";

const Error = () => {
  useEffect(() => {
    document.title = "404 Page Not Found";
    document.body.style.backgroundColor = "white";
  }, []);
  return (
    <Flex
      align="center"
      justify="center"
      direction="column"
      minHeight="100vh"
      bg="gray.100"
    >
      <Box mb={10}>
        <iframe
          src="https://i.giphy.com/media/8L0Pky6C83SzkzU55a/giphy.webp"
          width="480"
          height="480"
          frameBorder="0"
          class="giphy-embed"
          title="error"
        />
      </Box>
      <Heading as="h1" size="2xl" mb={4}>
        Oops! Page Not Found
      </Heading>
      <Text fontSize="xl" textAlign="center" mb={8}>
        We couldn't find the page you're looking for. Maybe it was moved or
        doesn't exist.
      </Text>
      <Button as={Link} to="/" colorScheme="teal" size="lg">
        Go back to Homepage
      </Button>
    </Flex>
  );
};

export default Error;
