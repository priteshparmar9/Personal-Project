import { ChevronDownIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spinner,
  Stack,
  Tag,
  TagCloseButton,
  Textarea,
  Switch,
  InputRightElement,
  Tooltip,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const AddItemForm = () => {
  const [product, setProduct] = useState({
    title: "",
    basePrice: 100,
    minimumPremium: 2,
    description: "",
    category: [],
    endTime: Date,
    attachments: [],
    items: 0,
    onAuction: true,
  });
  const [categories, setCategory] = useState([]);
  const [catInput, setCatInput] = useState("");
  const [submitted, setSubmit] = useState(false);
  function categoryHandler(e) {
    setCatInput(e.target.value);
    let arr = catInput.split("#");
    setCategory(arr);
    setProduct({ ...product, category: arr });
  }

  const handler = (e) => {
    // console.log(e);
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const Submit = (e) => {
    e.preventDefault();
    setSubmit(true);
    const url = process.env.REACT_APP_BACKEND_BASE_URL + "products/add_product";
    const formData = new FormData();
    formData.append("title", product.title);
    for (let i = 0; i < product.attachments.length; i++) {
      formData.append("attachments", product.attachments[i]);
    }
    formData.append("endTime", product.endTime);
    formData.append("category", product.category);
    formData.append("onAuction", product.onAuction);
    formData.append("description", product.description);
    formData.append("minimumPremium", product.minimumPremium);
    formData.append("items", product.items);
    formData.append("basePrice", product.basePrice);
    axios
      .post(url, formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${window.localStorage.getItem("eauc_token")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setProduct({
            title: "",
            basePrice: 100,
            minimumPremium: 2,
            description: "",
            category: [],
            endTime: Date,
            attachments: [],
          });
          toast.success(
            "Congrats! Your item has been added to the database and soon will be available on products page",
            {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: false,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
          setSubmit(false);
        }
      });
  };

  return (
    <>
      <Flex
        flexDirection="column"
        minH="100vh"
        minW="100vw"
        backgroundColor="white.100"
        justifyContent="center"
        alignItems="center"
        overflowY={"hidden"}
      >
        <Box>
          <form method="post">
            <Stack
              spacing={4}
              p="1rem"
              m="1rem"
              backgroundColor="white"
              boxShadow="lg"
              borderRadius={"md"}
            >
              <ToastContainer />
              <FormControl isRequired>
                <FormLabel>Product Name</FormLabel>
                <Input
                  placeholder="Product Name"
                  name="title"
                  value={product.title}
                  onChange={handler}
                  disabled={submitted}
                />
              </FormControl>
              <HStack>
                <FormControl isRequired>
                  <FormLabel>Base Price</FormLabel>
                  <InputGroup w="100%">
                    <InputLeftAddon children="₹" fontSize="1.2em" />
                    <NumberInput
                      defaultValue={0.0}
                      precision={2}
                      step={10}
                      disabled={submitted}
                      w="100%"
                      name="basePrice"
                      value={product.basePrice}
                      onChange={(e) => setProduct({ ...product, basePrice: e })}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </InputGroup>
                </FormControl>
                {product.onAuction && (
                  <FormControl isRequired>
                    <FormLabel>Minimum Premium</FormLabel>
                    <InputGroup w="100%">
                      <InputLeftAddon children="%" fontSize="1.2em" />
                      <NumberInput
                        defaultValue={2.0}
                        precision={2}
                        step={10}
                        w="100%"
                        disabled={submitted}
                        name="minimumPremium"
                        value={product.minimumPremium}
                        onChange={(e) =>
                          setProduct({ ...product, minimumPremium: e })
                        }
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </InputGroup>
                  </FormControl>
                )}
                {!product.onAuction && (
                  <FormControl isRequired>
                    <FormLabel>No. of items</FormLabel>
                    <InputGroup w="100%">
                      <NumberInput
                        step={1}
                        disabled={submitted}
                        w="100%"
                        name="items"
                        value={product.items}
                        onChange={(e) => setProduct({ ...product, items: e })}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </InputGroup>
                  </FormControl>
                )}
              </HStack>
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="email-alerts" mb="0">
                  Want to sell this item on Auction?
                </FormLabel>
                <Switch
                  id="email-alerts"
                  onChange={(e) =>
                    setProduct({ ...product, onAuction: !product.onAuction })
                  }
                  defaultChecked
                />
              </FormControl>
              {product.onAuction && (
                <FormControl isRequired>
                  <FormLabel>End Time</FormLabel>
                  <Input
                    type="datetime-local"
                    disabled={submitted}
                    value={product.endTime}
                    min={new Date().toISOString().slice(0, 16)}
                    placeholder="End Time"
                    name="endTime"
                    onChange={handler}
                  />
                </FormControl>
              )}
              <FormControl>
                <FormLabel>Product Description</FormLabel>
                <Textarea
                  placeholder="Here is a sample placeholder"
                  size="sm"
                  name="description"
                  onChange={handler}
                  value={product.description}
                  disabled={submitted}
                />
              </FormControl>
              <FormControl disabled={submitted}>
                <FormLabel>Categories</FormLabel>
                {categories.map((cat) => {
                  return (
                    <Tag
                      size="md"
                      variant="solid"
                      colorScheme="teal"
                      mr="2"
                      mb="1"
                    >
                      {cat}
                      <TagCloseButton />
                    </Tag>
                  );
                })}
                <Input
                  value={catInput}
                  type="text"
                  placeholder="Enter Categories (You can separate them using #)"
                  onChangeCapture={categoryHandler}
                  disabled={submitted}
                />
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<EditIcon color="gray.500" />}
                  />
                  <Input
                    multiple
                    pt={1}
                    type="file"
                    disabled={submitted}
                    // value={product.attachments}
                    placeholder="Upload product pictures"
                    onChange={(e) =>
                      setProduct({ ...product, attachments: e.target.files })
                    }
                  />
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={"5px"}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                onClick={Submit}
                disabled={submitted}
              >
                {submitted ? <Spinner /> : "Add Product"}
              </Button>
            </Stack>
          </form>
        </Box>
      </Flex>
    </>
  );
};

export default AddItemForm;
