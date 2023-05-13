import { Center, Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import "../Styles/Error.css";
import { Link } from "react-router-dom";

const Error = () => {
  useEffect(() => {
    document.title = "404 Page Not Found";
  }, []);
  return (
    <Center minH="100%" minW="100%">
      
    </Center>
  );
};

export default Error;
