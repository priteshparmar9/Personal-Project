import { Center, SimpleGrid, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import HomeProductCard from "../Components/HomeProductCard";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    document.title = "EAuction | A place to buy everything at lowest rate!";
    const url = process.env.REACT_APP_BACKEND_BASE_URL + "products/";
    axios.get(url).then((res) => {
      setProducts(res.data);
    });
  }, []);
  return (
    <Center minH={"100vh"} maxW="100%" overflowX="hidden">
      {products.length !== 0 ? (
        <SimpleGrid
          spacing={2}
          templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
          minW="65vw"
          m="10"
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

export default ProductList;
