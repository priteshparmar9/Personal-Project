import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
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
  Stack,
  Tag,
  TagCloseButton,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";

const AddItemForm = () => {
  const [categories, setCategory] = useState([]);
  const [catInput, setCatInput] = useState("");
  function categoryHandler(e) {
    setCatInput(e.target.value);
    let arr = catInput.split("#");
    setCategory(arr);
    // console.log(categories);
    arr = [];
    for (let i = 0; i < categories.length; i++) {
      console.log(arr);
      if (categories[i] != "" && categories[i] != " ") {
        arr.push(categories[i]);
      }
    }
    // setCategory(arr);
    //   console.log(categories)
    // }
  }
  function removeItem(cat) {
    console.log(cat, "Removed");
  }
  return (
    <>
      <Flex
        flexDirection="column"
        minH="100vh"
        backgroundColor="white.100"
        justifyContent="center"
        alignItems="center"
        overflowY={"hidden"}
      >
        <Box>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              m="1rem"
              backgroundColor="white"
              boxShadow="lg"
              borderRadius={"md"}
            >
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
              <ToastContainer />
              <FormControl isRequired>
                <FormLabel>Product Name</FormLabel>
                <Input placeholder="Product Name" />
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
                      w="100%"
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </InputGroup>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Minimum Premium</FormLabel>
                  <InputGroup w="100%">
                    <InputLeftAddon children="%" fontSize="1.2em" />
                    <NumberInput
                      defaultValue={2.0}
                      precision={2}
                      step={10}
                      w="100%"
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </InputGroup>
                </FormControl>
              </HStack>
              <FormControl isRequired>
                <FormLabel>End Time</FormLabel>
                <Input
                  type="datetime-local"
                  min={new Date().toISOString().slice(0, 16)}
                  placeholder="End Time"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Product Description</FormLabel>
                <Textarea
                  placeholder="Here is a sample placeholder"
                  size="sm"
                />
              </FormControl>
              <FormControl>
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
                  placeholder="Enter Categories"
                  onChangeCapture={categoryHandler}
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
                    placeholder="Upload profile picture"
                    onChange={(e) => {
                      var regexp = /\.([0-9a-z]+)(?:[?#]|$)/i;
                      var extension = e.target.value.match(regexp);

                      if (
                        extension[0] === ".jpg" ||
                        extension[0] === ".JPG" ||
                        extension[0] === ".png" ||
                        extension[0] === ".PNG" ||
                        extension[0] === ".gif" ||
                        extension[0] === ".GIF"
                      ) {
                        // setPic(e.target.files[0]);
                        // console.log(pro_pic);
                      } else {
                        // toast("Only PNG/JPG/GIF file are supported!");
                        // setPic({});
                        console.log("F");
                        // console.log(pro_pic);
                      }
                    }}
                  />
                </InputGroup>
              </FormControl>
            </Stack>
          </form>
        </Box>
      </Flex>
    </>
  );
};

export default AddItemForm;
