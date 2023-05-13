import { Center, SimpleGrid, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import HomeProductCard from "../Components/HomeProductCard";
import { Link, useParams } from "react-router-dom";

const SearchList = () => {
  const { query } = useParams();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    document.title = "Search : " + query;
    const url =
      process.env.REACT_APP_BACKEND_BASE_URL + "products/search/" + query;
    axios.get(url).then((res) => {
      setProducts(res.data.products);
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

export default SearchList;
