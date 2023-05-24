import {
  Box,
  Button,
  Card,
  Center,
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
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
  const [addresses, setAddresses] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fetchProduct = () => {
    const URL =
      process.env.REACT_APP_BACKEND_BASE_URL + "products/getproduct/" + id;
    axios.get(URL).then((res) => {
      setProduct(res.data.product);
    });
  };
  const handler = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
    // console.log(address);
  };
  const [value, setValue] = useState("0");
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
        console.log(addresses);
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
  return (
    <Stack m="20px">
      <Heading>Payment</Heading>
      <Box>
        <Text as="h3">Select Address</Text>
        {addresses.length !== 0 && (
          <RadioGroup
            onChange={setValue}
            value={value}
            display="flex"
            flexDir="column"
          >
            {addresses.map((address, index) => {
              return (
                <Radio value={`${index}`} key={index}>
                  <Card m="10px" p="10px" minW="50vw">
                    <Text fontSize="20px" ml="20px">
                      {address.houseOrBuilding}, {address.street1},<br />
                      {address.street2}, <br />
                      {address.city}, {address.state}, {address.pin}.<br />
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
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
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
    </Stack>
  );
};

export default Payment;
