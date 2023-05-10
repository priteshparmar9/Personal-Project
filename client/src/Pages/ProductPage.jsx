import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Stack,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { io } from "socket.io-client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductAttachmentColumn from "../Components/ProductAttachmentColumn";
import Error from "./Error";

const socket = io(process.env.REACT_APP_SOCKET_URL);

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    _id: "",
    seller: "",
    endTime: "",
    title: "",
    basePrice: 0,
    currentPrice: 0,
    minimumPremium: 0,
    description: "",
    catagory: "",
    attachments: Array,
    __v: 0,
  });
  const [seller, setSeller] = useState({});
  const toast = useToast();
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [catagory, setCatagory] = useState([]);
  const [valid, setValid] = useState(true);
  const [value, setVal] = useState(0);
  const [status, setStatus] = useState("");
  useEffect(() => {
    const fun = async () => {
      try {
        const URL =
          process.env.REACT_APP_BACKEND_BASE_URL + "products/getproduct/" + id;
        axios.get(URL).then((res) => {
          setProduct(res.data.product);

          setCatagory(res.data.product.catagory.split(","));
          console.log(catagory);
          setVal(
            res.data.product.currentPrice
              ? res.data.product.currentPrice *
                  (1 + res.data.product.minimumPremium / 100)
              : res.data.product.basePrice
          );
          var date = new Date(res.data.product.endTime);
          if (new Date().getTime() > date.getTime()) {
            setStatus("Expired");
          } else {
            setStatus("Active");
          }
          // }, 100);
          const SellerUrl =
            process.env.REACT_APP_BACKEND_BASE_URL +
            "sellers/getseller/" +
            res.data.product.seller;
          axios
            .get(SellerUrl)
            .then((res) => setSeller(res.data.seller), setLoading(false));
        });
      } catch (err) {
        toast({
          title: `${err.message}`,
          status: "error",
        });
        setLoading(false);
        setError(true);
      }
    };
    fun();
  }, []);

  useEffect(() => {
    socket.emit("join", id);
    socket.on("bid_acceped", (res) => {
      // setVariable(res.price);
      setProduct({ ...product, currentPrice: res.price });
      setVal(product.currentPrice * (1 + product.minimumPremium / 100));
      console.log(res);
    });
  }, [socket]);

  return (
    <Flex h="100vh" bgColor="rgb(240,240,240)">
      {error && <Error />}
      {isLoading && (
        <Center w="100%" bgColor="rgb(240,240,240)">
          <Spinner
            thickness="5px"
            speed="0.5s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      )}
      {!error && !isLoading && (
        <Center bgColor="rgb(240,240,240)" minW="100%">
          <Box w="90vw" h="100vh" m="5">
            <HStack spacing="24px" m="5">
              {
                <HStack spacing={4}>
                  {catagory.length &&
                    catagory.map((cat, id) => (
                      <Tag
                        size="md"
                        key={id}
                        variant="solid"
                        colorScheme="teal"
                      >
                        {cat}
                      </Tag>
                    ))}
                </HStack>
              }
            </HStack>
            <Grid templateColumns="repeat(2, 1fr)" columnGap={5} ml="5">
              <GridItem colSpan={1}>
                <ProductAttachmentColumn attachments={product.attachments} />
              </GridItem>
              <GridItem
                m="5px"
                display="flex"
                flexDir="column"
                justifyContent="space-between"
              >
                <Heading as="h3" size="xl" noOfLines={1}>
                  {product.title}
                </Heading>
                {status === "Active" && (
                  <Tag size="md" variant="solid" bg="rgb(60,72,107)" w="5em">
                    {status}
                  </Tag>
                )}
                {status === "Expired" && (
                  <Tag size="md" variant="solid" bg="rgb(70,70,70)" w="5em">
                    {status}
                  </Tag>
                )}
                <TableContainer>
                  <Table variant="simple">
                    <Tbody>
                      <Tr>
                        <Td>
                          <Text fontSize="xl">Place Bid:</Text>
                        </Td>
                        <Td isNumeric>
                          <Text fontSize="xl">
                            Rs.
                            {product.currentPrice
                              ? ` ${
                                  product.currentPrice *
                                  (1 + product.minimumPremium / 100)
                                }`
                              : ` ${product.basePrice}`}
                          </Text>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>
                          <Text fontSize="xl">Base Price:</Text>
                        </Td>
                        <Td isNumeric fontSize="xl">
                          Rs. {product.basePrice}
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>
                          <Text fontSize="xl">Minimum Premium:</Text>
                        </Td>
                        <Td isNumeric fontSize="xl">
                          {product.minimumPremium} %
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>

                <HStack>
                  <InputGroup w="50%">
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      fontSize="1.2em"
                      children="Rs. "
                    />
                    <Input
                      placeholder="Enter amount for custom bid"
                      type="number"
                      isInvalid={!valid}
                      value={value}
                      onChange={(e) => {
                        if (
                          e.target.value <
                          (product.currentPrice
                            ? product.currentPrice *
                              (1 + product.minimumPremium / 100)
                            : product.basePrice)
                        ) {
                          setValid(false);
                        } else {
                          setValid(true);
                        }
                        setVal(e.target.value);
                      }}
                    />
                  </InputGroup>
                  <Button
                    _hover={{ backgroundColor: "rgb(40,90,80)" }}
                    w="50%"
                    bg="rgb(60,72,107)"
                    color="rgb(240,240,240)"
                    isDisabled={!valid}
                    onClick={() => {
                      socket.emit("bid_request", {
                        product: product._id,
                        token: window.localStorage.getItem("token").toString(),
                        price: value,
                        _id: product._id,
                      });
                    }}
                  >
                    Place Bid
                  </Button>
                </HStack>
              </GridItem>
            </Grid>
            <Divider mt={5} />
            <Heading m="15px">Placed Bids</Heading>
            <TableContainer w="100%" maxH="50vmin" overflowY="auto" minW="100%">
              <Table variant="simple" size="md" w="100%">
                <Tr bg="green.200">
                  <Td>Pritesh Parmar</Td>
                  <Td>{Date()}</Td>
                  <Td isNumeric>Rs. 18999</Td>
                </Tr>
                <Tr>
                  <Td>Pritesh Parmar</Td>
                  <Td>{Date()}</Td>
                  <Td isNumeric>Rs. 18999</Td>
                </Tr>
                <Tr>
                  <Td>Pritesh Parmar</Td>
                  <Td>{Date()}</Td>
                  <Td isNumeric>Rs. 18999</Td>
                </Tr>
                <Tr>
                  <Td>Pritesh Parmar</Td>
                  <Td>{Date()}</Td>
                  <Td isNumeric>Rs. 18999</Td>
                </Tr>
                <Tr>
                  <Td>Pritesh Parmar</Td>
                  <Td>{Date()}</Td>
                  <Td isNumeric>Rs. 18999</Td>
                </Tr>
                <Tr>
                  <Td>Pritesh Parmar</Td>
                  <Td>{Date()}</Td>
                  <Td isNumeric>Rs. 18999</Td>
                </Tr>
                <Tr>
                  <Td>Pritesh Parmar</Td>
                  <Td>{Date()}</Td>
                  <Td isNumeric>Rs. 18999</Td>
                </Tr>
                <Tr>
                  <Td>Pritesh Parmar</Td>
                  <Td>{Date()}</Td>
                  <Td isNumeric>Rs. 18999</Td>
                </Tr>
                <Tr>
                  <Td>Pritesh Parmar</Td>
                  <Td>{Date()}</Td>
                  <Td isNumeric>Rs. 18999</Td>
                </Tr>
                <Tr>
                  <Td>Pritesh Parmar</Td>
                  <Td>{Date()}</Td>
                  <Td isNumeric>Rs. 18999</Td>
                </Tr>
                <Tr>
                  <Td>Pritesh Parmar</Td>
                  <Td>{Date()}</Td>
                  <Td isNumeric>Rs. 18999</Td>
                </Tr>
                <Tr>
                  <Td>Pritesh Parmar</Td>
                  <Td>{Date()}</Td>
                  <Td isNumeric>Rs. 18999</Td>
                </Tr>
                <Tr>
                  <Td>Pritesh Parmar</Td>
                  <Td>{Date()}</Td>
                  <Td isNumeric>Rs. 18999</Td>
                </Tr>
                <Tr>
                  <Td>Pritesh Parmar</Td>
                  <Td>{Date()}</Td>
                  <Td isNumeric>Rs. 18999</Td>
                </Tr>
                <Tr>
                  <Td>Pritesh Parmar</Td>
                  <Td>{Date()}</Td>
                  <Td isNumeric>Rs. 18999</Td>
                </Tr>
                <Tr>
                  <Td>Pritesh Parmar</Td>
                  <Td>{Date()}</Td>
                  <Td isNumeric>Rs. 18999</Td>
                </Tr>
              </Table>
            </TableContainer>
            <Divider mt={5} />
            <Heading as="h3" size="md" noOfLines={1} m={5}>
              About this item
            </Heading>
            <Text m={5}>{product.description}</Text>
            <Divider mt={5} />
            <Heading as="h3" size="md" noOfLines={1} m={5}>
              Reviews
            </Heading>
            <Text m="5">Review 1</Text>
            <Text m="5">Review 2</Text>
            <Divider mt={5} />
            <Heading as="h3" size="md" noOfLines={1} m={5}>
              About Seller
            </Heading>
            <Flex
              m="5"
              w="100%"
              justifyContent="space-evenly"
              bgColor="rgb(240,240,240)"
            >
              <Image
                borderRadius="full"
                boxSize="300px"
                src={seller.pic}
                alt="Dan Abramov"
              />
              <Divider orientation="vertical" h="300px" />
              <Stack direction="row" h="100px" p={4}>
                <Box>
                  <Heading as="h3" size="xl" noOfLines={1} m={5}>
                    {seller.username}
                  </Heading>
                  <TableContainer>
                    <Table variant="simple">
                      <Tbody>
                        <Tr>
                          <Th>Email</Th>
                          <Th>{seller.email}</Th>
                        </Tr>
                        <Tr>
                          <Td>Contact Number</Td>
                          <Td>{seller.number}</Td>
                        </Tr>
                        <Tr>
                          <Td>Address</Td>
                          <Td>{seller.address} </Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </TableContainer>
                  <Link to={`../seller/${seller.username}`}>
                    <Button m="5">Visit Seller</Button>
                  </Link>
                </Box>
              </Stack>
            </Flex>
          </Box>
        </Center>
      )}
    </Flex>
  );
};

export default ProductPage;
