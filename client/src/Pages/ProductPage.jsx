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
// import Footer from "../Components/Footer";
import ProductAttachmentColumn from "../Components/ProductAttachmentColumn";
import Error from "./Error";
// import { FaWindowRestore } from "react-icons/fa";

const socket = io("http://localhost:8081");

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
    category: Array,
    attachments: Array,
    __v: 0,
  });
  const [seller, setSeller] = useState({});
  const toast = useToast();
  const [error, setError] = useState(false);
  const [isDisabled, setDisable] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [variable, setVariable] = useState(0);
  useEffect(() => {
    const fun = async () => {
      try {
        const URL =
          process.env.REACT_APP_BACKEND_BASE_URL + "products/getproduct/" + id;
        await axios.get(URL).then(async (res) => {
          setProduct(res.data.product);
          // socket.emit("join", res.data.product._id);
          const SellerUrl =
            process.env.REACT_APP_BACKEND_BASE_URL +
            "sellers/getseller/" +
            res.data.product.seller;
          await axios
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
  });
  useEffect(() => {
    // socket.on("connect", () => console.log(socket));
    socket.on("inc_done", (res) => {
      setVariable(res.price);
    });
  }, [socket]);
  return (
    <Flex h="100vh">
      {error && <Error />}
      {isLoading && (
        <Center>
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
        <Box w="80vw" h="100vh" m="5">
          <HStack spacing="24px" m="5">
            {
              <HStack spacing={4}>
                {product.catagory.map((cat) => (
                  <Tag size="md" variant="solid" colorScheme="teal">
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
            <GridItem>
              <Heading as="h3" size="xl" noOfLines={1}>
                {product.title}
              </Heading>
              <h1>{variable}</h1>
              <Button
                onClick={() => {
                  socket.emit("increment", {
                    product: product._id,
                    token: window.localStorage.getItem("token").toString(),
                    price: variable + 1,
                    _id: product._id,
                  });
                  var audio = document.getElementById("audio");
                  audio.play();
                  setVariable(variable + 1);
                }}
              >
                Press ME
              </Button>
              <audio
                id="audio"
                src="http://commondatastorage.googleapis.com/codeskulptor-assets/Evillaugh.ogg"
              ></audio>
              <Button
                onClick={() => {
                  socket.emit("join", product._id);
                  setDisable(true);
                }}
                disabled={isDisabled}
              >
                Get Live Feed
              </Button>
            </GridItem>
          </Grid>
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
          <Box m="5">
            <Grid templateColumns="repeat(10,1fr)">
              <GridItem colSpan={3}>
                <Image
                  borderRadius="full"
                  boxSize="300px"
                  src={seller.pic}
                  alt="Dan Abramov"
                />
              </GridItem>
              <GridItem colSpan={7}>
                <Stack direction="row" h="100px" p={4}>
                  <Divider orientation="vertical" h="300px" />
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
              </GridItem>
            </Grid>
          </Box>
        </Box>
      )}
    </Flex>
  );
};

export default ProductPage;
