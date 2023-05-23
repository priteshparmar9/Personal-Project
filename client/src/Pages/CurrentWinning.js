import { Center, SimpleGrid, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import HomeProductCard from "../Components/HomeProductCard";

const CurrentWinning = () => {
  const navigate = useNavigate();
  const [products, setProduct] = useState([]);
  useEffect(() => {
    let token = window.localStorage.getItem("token");
    if (token) {
      let url = process.env.REACT_APP_BACKEND_BASE_URL + "users/validateToken";
      axios.post(url, { token: token }).then((res) => {
        if (res.status !== 200) {
          navigate("/login");
        }
      });
    }
  });
  useEffect(() => {
    document.title = "Your winning Zone";
    const url = process.env.REACT_APP_BACKEND_BASE_URL + "products/getWinning";
    axios
      .post(url, {
        headers: {
          "content-type": "multipart/form-data",
          authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // console.log(res);
        setProduct(res.data.winnings);
      });
  }, []);
  return (
    <Center minH={"100vh"}>
      {products.length !== 0 ? (
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
          minW="65vw"
        >
          {products.map((product, id) => {
            return (
              <Link key={id} to={`/product/${product.id}`}>
                <HomeProductCard product={product} />
              </Link>
            );
          })}
        </SimpleGrid>
      ) : (
        <Spinner
          thickness="5px"
          speed="0.5s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      )}
    </Center>
  );
};

export default CurrentWinning;
