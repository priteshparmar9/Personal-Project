import { Box, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import axios from "axios";
import Sidebar from "../Components/NavigationBar";
import { Link, useNavigate } from "react-router-dom";
import AddItemForm from "../Components/AddItemForm";

function AddItem() {
  const navigate = useNavigate();

  useEffect(() => {
    const url = process.env.REACT_APP_BACKEND_BASE_URL + "sellers/is_seller/";
    axios
      .post(url, {
        token: window.localStorage.getItem("eauc_token"),
      })
      .then((res) => {
        if (!res.data) {
          navigate("/");
        }
      });
  }, []);
  return (
    <Box>
      <AddItemForm />;
    </Box>
  );
}
export default AddItem;
