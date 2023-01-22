import {
  EditIcon,
  EmailIcon,
  LockIcon,
  PhoneIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const {
  Stack,
  Avatar,
  Box,
  FormControl,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Button,
  VStack,
  FormHelperText,
  Spinner,
  Textarea,
  FormLabel,
  HStack,
} = require("@chakra-ui/react");

function SellerSignup() {
  const [showPassword, setShowPass] = useState(false);
  const [otp, setOtp] = useState("");
  const [user, setUser] = useState({
    username: "",
    password: "",
    re_password: "",
    email: "",
    pic: Object,
  });
  const [pro_pic, setPic] = useState();
  const [otpSent, setOTP] = useState(false);
  const [submitted, setSubmit] = useState(false);
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();

    if (user.email && user.password && user.re_password && user.username) {
      if (user.password !== user.re_password) {
        toast.warn("Both passwords should be same!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        setShowPass(false);
        setSubmit(true);
        const url = process.env.REACT_APP_BACKEND_BASE_URL + "sellers/signup/";
        // setUser({ ...user, pic: pro_pic });
        user.pic = pro_pic;
        console.log(user);
        // const res = await axios.post(url, user);

        axios
          .post(url, user, {
            headers: {
              "content-type": "multipart/form-data",
            },
          })
          .then((res) => {
            if (res.data.code === 100) {
              toast.warn(
                "Email already registered! Please try with other email or sign in",
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
            } else if (res.data.code === 200) {
              setOTP(true);
              toast.success("OTP has been send!! Please check your email!", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            } else {
              toast.error(res.data.status, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }
          });
      }
    } else {
      toast.error("Please enter all fields!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    // setSubmit(false);
  }

  function handleShowClick() {
    if (showPassword) setShowPass(false);
    else setShowPass(true);
  }
  async function otpsubmit(e) {
    e.preventDefault();
    setOTP(false);
    const url = process.env.REACT_APP_BACKEND_BASE_URL + "sellers/check_otp/";
    // console.log(user.email, otp);
    const res = await axios.post(url, { email: user.email, otp: otp });
    if (res.data.code === 100) {
      setSubmit(true);
      setOtp("");
      toast.error("Incorrect OTP!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setOTP(true);
    } else if (res.data.code === 200) {
      toast.success("Account Verified Successfully!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/login");
    } else {
      toast.error("Some error occured at our end! Please try again later!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setOTP(false);
    }
  }
  return (
    <>
      <Box minW={{ base: "90%", md: "468px" }}>
        <form>
          <Stack
            spacing={4}
            p="1rem"
            backgroundColor="white"
            boxShadow="md"
            borderRadius={"md"}
          >
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<Avatar size={"2xs"} color="gray.500" />}
                />
                <Input
                  type="text"
                  placeholder="Store / Seller Name"
                  disabled={submitted}
                  value={user.username}
                  onChange={(e) => {
                    const { value } = e.target;
                    setUser({
                      ...user,
                      username: value,
                    });
                  }}
                />
              </InputGroup>
            </FormControl>
            <HStack>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<LockIcon color="gray.500" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={user.password}
                    disabled={submitted}
                    onChange={(e) => {
                      const { value } = e.target;
                      setUser({
                        ...user,
                        password: value,
                      });
                    }}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<LockIcon color="gray.500" />}
                  />
                  <Input
                    value={user.re_password}
                    type="password"
                    placeholder="Confirm Password"
                    disabled={submitted}
                    onChange={(e) => {
                      const { value } = e.target;
                      setUser({
                        ...user,
                        re_password: value,
                      });
                    }}
                  />
                </InputGroup>
              </FormControl>
            </HStack>
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<EmailIcon color="gray.500" />}
                />
                <Input
                  type="email"
                  placeholder="Business Email"
                  disabled={submitted}
                  value={user.email}
                  onChange={(e) => {
                    const { value } = e.target;
                    setUser({
                      ...user,
                      email: value,
                    });
                  }}
                />
              </InputGroup>
            </FormControl>
            <HStack>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<PhoneIcon color="gray.500" />}
                  />
                  <Input
                    type="number"
                    placeholder="Contact Number"
                    disabled={submitted}
                    value={user.email}
                    onChange={(e) => {
                      const { value } = e.target;
                      setUser({
                        ...user,
                        email: value,
                      });
                    }}
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<EditIcon color="gray.500" />}
                  />
                  <Input
                    pt={1}
                    // value={user.pic}
                    type="file"
                    placeholder="Upload profile picture"
                    disabled={submitted}
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
                        setPic(e.target.files[0]);
                        console.log(pro_pic);
                      } else {
                        toast("Only PNG/JPG/GIF file are supported!");
                        setPic({});
                        console.log("F");
                        // console.log(pro_pic);
                      }
                    }}
                  />
                </InputGroup>
              </FormControl>
            </HStack>
            <FormControl>
              {/* <FormLabel>Description</FormLabel> */}
              <InputGroup>
                <Textarea
                  placeholder="Description of Seller"
                  size="sm"
                  resize="vertical"
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              {/* <FormLabel>Address</FormLabel> */}
              <InputGroup>
                <Textarea
                  placeholder="Address of Seller"
                  size="sm"
                  resize="vertical"
                />
              </InputGroup>
            </FormControl>
            {otpSent ? (
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<EditIcon color="gray.500" />}
                  />
                  <Input
                    type="password"
                    value={otp}
                    placeholder="OTP"
                    minLength="6"
                    maxLength="6"
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
            ) : (
              <></>
            )}
            <FormControl>
              <VStack>
                <FormHelperText textAlign="left" pb="2">
                  <Link to="../login">Already have an account?</Link>
                </FormHelperText>
              </VStack>
            </FormControl>
            <Button
              borderRadius={"5px"}
              type="submit"
              variant="solid"
              colorScheme="teal"
              width="full"
              onClick={submitted ? otpsubmit : submit}
            >
              {submitted ? otpSent ? "Submit OTP" : <Spinner /> : "Signup"}
            </Button>
          </Stack>
        </form>
      </Box>
    </>
  );
}
export default SellerSignup;
