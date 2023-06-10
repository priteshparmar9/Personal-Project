import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Spinner,
  Stack,
  Text,
  useDisclosure,
  keyframes,
} from "@chakra-ui/react";
import axios from "axios";
import { CheckIcon, CloseIcon, SpinnerIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;
const shakeAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-8px);
  }
  75% {
    transform: translateX(8px);
  }
  100% {
    transform: translateX(0);
  }
`;

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
const Payment = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [address, setAddress] = useState({
    houseOrBuilding: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    contact: 0,
    pin: 0,
  });
  const [bill, setBill] = useState({
    prodName: "",
    price: 0,
    sellerId: "",
    address: "",
    gst: "",
  });
  const [addresses, setAddresses] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [paymentStatus, setStatus] = useState("none");
  const fetchProduct = () => {
    const URL =
      process.env.REACT_APP_BACKEND_BASE_URL + "products/getproduct/" + id;
    axios.get(URL).then((res) => {
      setProduct(res.data.product);
      setBill({
        ...bill,
        price: res.data.product.currentPrice,
        prodName: res.data.product.title,
        sellerId: res.data.product.seller,
      });
      // console.log(res.data);
    });
  };
  const handler = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
    // console.log(address);
  };
  const [value, setValue] = useState("0");

  const selectAddress = (e) => {
    setValue(e);
    setAddress(addresses[+e]);
  };

  const fetchAddress = () => {
    const url = process.env.REACT_APP_BACKEND_BASE_URL + "address/get";
    axios
      .post(url, {
        headers: {
          "content-type": "multipart/form-data",
          authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setAddresses(res.data.addresses);
        if (res.data.addresses.length !== 0) {
          setAddress(res.data.addresses[0]);
        }
        // console.log(addresses);
      });
  };
  const AddAddress = async () => {
    const url = process.env.REACT_APP_BACKEND_BASE_URL + "address/addAddress";
    axios
      .post(url, {
        ...address,
        headers: {
          "content-type": "multipart/form-data",
          authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          onClose();
          fetchAddress();
        }
      });
  };
  useEffect(() => {
    fetchProduct();
    fetchAddress();
  }, []);
  const initPayment = (data) => {
    const options = {
      key: process.env.RAZOR_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: bill.prodName,
      description: "Test Transaction",
      // image: book.img,
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl =
            process.env.REACT_APP_BACKEND_BASE_URL + "payment/verify";
          const { data } = await axios.post(verifyUrl, {
            response: response,
            productId: product._id,
            address: address,
          });
          setStatus("successful");
          /*
           */
        } catch (error) {
          console.log(error);
          setStatus("aborted");
        }
      },
      theme: {
        color: "#3C486B",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    setTimeout(() => {
      if (paymentStatus !== "successful") {
        setStatus("aborted");
      }
    }, 1000 * 60 * 5);
    setStatus("active");
    try {
      const orderUrl =
        process.env.REACT_APP_BACKEND_BASE_URL + "payment/orders";
      const { data } = await axios.post(orderUrl, { amount: bill.price });
      // console.log(data);
      initPayment(data.data);
    } catch (error) {
      setStatus("aborted");
      console.log(error);
    }
  };
  return (
    <>
      {paymentStatus === "none" && (
        <Grid templateColumns="repeat(5, 1fr)" gap={4}>
          <GridItem m="30px">
            <Heading>Payment</Heading>
            <Box>
              <Text as="h3">Select Address</Text>
              {addresses.length !== 0 && (
                <RadioGroup
                  onChange={selectAddress}
                  value={value}
                  display="flex"
                  flexDir="column"
                >
                  {addresses.map((address, index) => {
                    return (
                      <Radio value={`${index}`} key={index}>
                        <Card m="10px" p="10px" minW="40vw">
                          <Text fontSize="20px" ml="20px">
                            {address.houseOrBuilding}, {address.street1},<br />
                            {address.street2}, <br />
                            {address.city}, {address.state}, {address.pin}.
                            <br />
                            Mo. : {address.contact}
                          </Text>
                        </Card>
                      </Radio>
                    );
                  })}
                </RadioGroup>
              )}
            </Box>
            <Button onClick={onOpen} w="10vw">
              Add Address
            </Button>
            <Box>
              <Heading size="md">GST Details (Optional)</Heading>
              <Input
                mt="10px"
                onChange={(e) => setBill({ ...bill, gst: e.target.value })}
                placeholder="GST Number"
              ></Input>
            </Box>
            <Modal
              closeOnOverlayClick={false}
              isOpen={isOpen}
              onClose={onClose}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Add Address</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <Stack>
                    <Input
                      placeholder="House/Building Name or Number"
                      name="houseOrBuilding"
                      size="md"
                      required
                      onChange={handler}
                    />
                    <Input
                      placeholder="Street"
                      name="street1"
                      onChange={handler}
                      size="md"
                      required
                    />
                    <Input
                      placeholder="Landmark"
                      name="street2"
                      size="md"
                      required
                      onChange={handler}
                    />
                    <Input
                      placeholder="City/town"
                      name="city"
                      size="md"
                      required
                      onChange={handler}
                    />
                    <Input
                      placeholder="State"
                      name="state"
                      size="md"
                      required
                      onChange={handler}
                    />
                    <Input
                      onChange={handler}
                      placeholder="Pin Code"
                      type="number"
                      name="pin"
                      size="md"
                      required
                    />
                    <Input
                      onChange={handler}
                      placeholder="Contact number"
                      type="tel"
                      name="contact"
                      size="md"
                      required
                    />
                  </Stack>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={AddAddress}>
                    Add
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </GridItem>
          <GridItem m="30px">
            <Heading size="lg">Billing</Heading>
            <Card mt="30px" minW="30vw">
              <CardBody>
                <Box>
                  <HStack>
                    <Heading size="sm">Product Name:</Heading>
                    <Text>{product.title}</Text>
                  </HStack>
                </Box>
                <Box>
                  <HStack>
                    <Heading size="sm">Price: </Heading>
                    <Text>{product.currentPrice} INR</Text>
                  </HStack>
                </Box>
                <Box>
                  <HStack>
                    <Heading size="sm">Seller ID :</Heading>
                    <Text>{product.seller}</Text>
                  </HStack>
                </Box>
                <Box>
                  <HStack>
                    <Heading size="sm">Address :</Heading>
                    <Text fontSize="20px" ml="20px">
                      {address.houseOrBuilding}, {address.street1},<br />
                      {address.street2}, <br />
                      {address.city}, {address.state}, {address.pin}.<br />
                      Mo. : {address.contact}
                    </Text>
                  </HStack>
                </Box>
                {bill.gst.length > 10 && (
                  <Box>
                    <HStack>
                      <Heading size="sm">GST Number:</Heading>
                      <Text>{bill.gst}</Text>
                    </HStack>
                  </Box>
                )}
              </CardBody>
            </Card>
            <Button mt="20px" onClick={handlePayment}>
              Proceed to pay (Via Razorpay)
            </Button>
          </GridItem>
        </Grid>
      )}
      {paymentStatus === "active" && (
        <Center minH="90vh" minW="100%">
          <Heading>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Heading>
        </Center>
      )}
      {paymentStatus === "successful" && (
        <Box minH="95vh" minW="100%">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            height="100vh"
          >
            <Box
              display="inline-block"
              position="relative"
              transform="translateY(-50%)"
              padding="10px"
            >
              <CheckIcon
                boxSize={10}
                color="green.500"
                animation={`${pulseAnimation} 1s infinite`}
              />
              <Box
                position="absolute"
                top="-6px"
                left="-6px"
                right="-6px"
                bottom="-6px"
                borderRadius="50%"
                border="2px solid"
                borderColor="green.500"
                animation={`${spinAnimation} 1.5s infinite`}
              />
            </Box>
            <Text fontSize="2xl" fontWeight="bold" mt={4} color="green.500">
              Payment Successful
            </Text>
            <Text>Thank you for using EAuction! It means a lot to us.</Text>
            <Text>
              Your item will be dispatched today it self and would be on your
              way soon! You can stay updated regarding same via My Orders Page.
            </Text>
          </Box>
        </Box>
      )}
      {paymentStatus === "aborted" && (
        <Box minH="95vh" minW="100%">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            height="100vh"
          >
            <Box
              display="inline-block"
              position="relative"
              transform="translateY(-50%)"
            >
              <CloseIcon
                boxSize={10}
                padding="5px"
                color="red.500"
                animation={`${shakeAnimation} 0.5s ease-in-out infinite`}
              />
              <Box
                position="absolute"
                top="-6px"
                left="-6px"
                right="-6px"
                bottom="-6px"
                borderRadius="50%"
                border="2px solid"
                borderColor="red.500"
                animation={`${spinAnimation} 1.5s infinite`}
              />
            </Box>
            <Text fontSize="2xl" fontWeight="bold" mt={4}>
              Payment Failed
            </Text>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Payment;
