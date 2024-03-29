import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddItemForm from "../Components/AddItemForm";

function AddItem() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Add Item";
    const url = process.env.REACT_APP_BACKEND_BASE_URL + "sellers/is_seller/";
    axios
      .post(url, {
        token: window.localStorage.getItem("eauc_token"),
      })
      .then((res) => {
        if (res.status !== 200) {
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
