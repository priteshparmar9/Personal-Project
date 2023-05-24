import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  Heading,
  Image,
  Spinner,
  Stack,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RemainingCheckouts = () => {
  const navigate = useNavigate();
  const [product, setProducts] = useState([]);
  const [loading, setLoad] = useState(true);
  const load = () => {
    const url =
      process.env.REACT_APP_BACKEND_BASE_URL + "products/remainingCheckouts";
    axios
      .post(url, {
        headers: {
          "content-type": "multipart/form-data",
          authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // console.log(res);
        setProducts(res.data.wonProducts);
        setLoad(false);
      });
  };
  useEffect(() => {
    load();
  }, []);
  return (
    <Box m="25px" h="100%">
      <Center minH="80vh">
        {loading && (
          <Spinner
            thickness="5px"
            speed="0.5s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        )}
        {product.length !== 0 ? (
          <Stack>
            <Heading>Remaining Checkouts</Heading>
            <Box w="75%">
              {product.map((pr) => {
                return (
                  <Card
                    direction={{ base: "column", sm: "row" }}
                    overflow="hidden"
                    variant="outline"
                    minW="80vh"
                  >
                    <Image
                      objectFit="cover"
                      maxW={{ base: "100%", sm: "200px" }}
                      src={pr.pic}
                      alt="Caffe Latte"
                    />

                    <Stack>
                      <CardBody>
                        <Heading size="md">{pr.title}</Heading>

                        <Stat m="10px">
                          <StatLabel>Your Bid : </StatLabel>
                          <StatNumber>{pr.currentPrice}</StatNumber>
                          <StatHelpText>
                            <StatArrow type="increase" />
                            {((pr.currentPrice - pr.basePrice) / pr.basePrice) *
                              100}
                            %
                          </StatHelpText>
                        </Stat>
                      </CardBody>

                      <CardFooter>
                        <Button
                          variant="solid"
                          colorScheme="blue"
                          onClick={() => {
                            navigate(`/payment/${pr.id}`);
                          }}
                        >
                          Proceed to Checkout
                        </Button>
                      </CardFooter>
                    </Stack>
                  </Card>
                );
              })}
            </Box>
          </Stack>
        ) : (
          <Text color="blackAlpha.800" fontSize="2xl">
            Sorry You have not won any bids currently!
          </Text>
        )}
      </Center>
    </Box>
  );
};

export default RemainingCheckouts;
