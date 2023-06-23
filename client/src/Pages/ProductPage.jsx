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
} from "@chakra-ui/react";
import { io } from "socket.io-client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductAttachmentColumn from "../Components/ProductAttachmentColumn";
import Error from "./Error";
import { ToastContainer, toast } from "react-toastify";

const socket = io(process.env.REACT_APP_SOCKET_URL);

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    _id: "",
    seller: "",
    endTime: Object,
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
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [catagory, setCatagory] = useState([]);
  const [valid, setValid] = useState(true);
  const [value, setVal] = useState(0);
  const [status, setStatus] = useState("");
  const [bids, setBids] = useState([]);
  const [hours, setHours] = useState(0);
  const [days, setDays] = useState(0);
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);
  const [isLoggedIn, setLogin] = useState(false);
  const [productEndTime, setProductEndtime] = useState(Date());
  const navigate = useNavigate();

  useEffect(() => {
    const fun = async () => {
      try {
        const URL =
          process.env.REACT_APP_BACKEND_BASE_URL + "products/getproduct/" + id;
        axios.get(URL).then((res) => {
          setProduct(res.data.product);
          document.title = res.data.product.title + " | EAuction";
          setProductEndtime(new Date(res.data.product.endTime));
          setBids(res.data.bids.reverse());
          setCatagory(res.data.product.catagory.split(","));
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
    const token = window.localStorage.getItem("token");
    if (token) {
      let url = process.env.REACT_APP_BACKEND_BASE_URL + "users/validateToken";
      axios.post(url, { token: token }).then((res) => {
        if (res.status === 200) {
          setLogin(true);
        }
      });
    }
  }, []);

  let tm = setTimeout(() => {
    let currentDate = new Date();
    if (product.endTime) {
      var distance = productEndTime - currentDate;
      setSecs(Math.floor((distance % (1000 * 60)) / 1000));
      setMins(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      setHours(
        Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      );
      setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
      if (distance < 0) {
        setStatus("Expired");
        setSecs(0);
        setMins(0);
        setHours(0);
        setDays(0);
      }
    }
  }, 1000);
  useEffect(() => {
    socket.emit("join", id);
    socket.on("bid_acceped", (res) => {
      toast("New bid accepted!");
      setProduct(res.bid.product);
      let temp = res.bid.bids;
      temp.unshift(res.bid);
      setBids(temp);
    });
  }, [socket]);

  return (
    <Flex bgColor="white" minH="100vh" flexDir="column" >
      {error && <Error />}
      {isLoading && (
        <Center w="100%" minH="100vh" bgColor="white">
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
        <Center>
          <ToastContainer />
          <Box w="90vw" h="100vh" m="5">
            <HStack spacing="24px" m="5">
              {
                <HStack spacing={4}>
                  {catagory.length &&
                    catagory.map((cat, id) => (
                      <Link key={id} to={`/search/${cat}`}>
                        <Tag size="md" variant="solid" colorScheme="teal">
                          {cat}
                        </Tag>
                      </Link>
                    ))}
                </HStack>
              }
            </HStack>
            <Grid templateColumns="repeat(2, 1fr)" columnGap={5} ml="5">
              <GridItem colSpan={1}>
                {product.attachments && (
                  <ProductAttachmentColumn attachments={product.attachments} />
                )}
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
                {productEndTime && status !== "Expired" && (
                  <HStack>
                    <Text fontSize="xl">{days.toString()}</Text>
                    <Text>:</Text>
                    <Text fontSize="xl">{hours.toString()}</Text>
                    <Text>:</Text>
                    <Text fontSize="xl">{mins.toString()}</Text>
                    <Text>:</Text>
                    <Text fontSize="xl">{secs.toString()}</Text>
                  </HStack>
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
                      <Tr>
                        <Td>
                          <Text fontSize="xl">End Time:</Text>
                        </Td>
                        <Td isNumeric fontSize="xl">
                          {product.endTime}
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>

                {isLoggedIn ? (
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
                        disabled={status === "Expired"}
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
                      color="white"
                      isDisabled={!valid || status === "Expired"}
                      onClick={() => {
                        let temp = bids;
                        temp.unshift({
                          username: "You",
                          time: Date(),
                          bid_amt: value,
                        });
                        setBids(temp);
                        // console.log(bids);
                        socket.emit("bid_request", {
                          product: { ...product, currentPrice: value },
                          bids: bids,
                          token: window.localStorage
                            .getItem("token")
                            .toString(),
                          _id: product._id,
                        });
                      }}
                    >
                      Place Bid
                    </Button>
                  </HStack>
                ) : (
                  <HStack>
                    <Button
                      _hover={{ backgroundColor: "rgb(40,90,80)" }}
                      w="100%"
                      bg="rgb(60,72,107)"
                      color="white"
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      Login
                    </Button>
                  </HStack>
                )}
              </GridItem>
            </Grid>
            <Divider mt={5} />
            <Heading m="15px">Placed Bids</Heading>
            <TableContainer w="100%" maxH="50vmin" overflowY="auto" minW="100%">
              <Table variant="simple" size="md" w="100%">
                <Tbody>
                  {bids.map((bid, id) => {
                    return (
                      <Tr key={id} bg={id === 0 ? "green.200" : "white"}>
                        <Td>{bid.username}</Td>
                        <Td>{bid.time}</Td>
                        <Td isNumeric>Rs. {bid.bid_amt}</Td>
                      </Tr>
                    );
                  })}
                </Tbody>
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
            <Flex m="5" w="100%" justifyContent="space-evenly" bgColor="white">
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
