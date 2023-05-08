import {
  Card,
  CardBody,
  Center,
  Heading,
  Image,
  Skeleton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import React, { useState } from "react";

const HomeProductCard = (props) => {
  const [imageLoaded, setImgLoad] = useState(false);
  const product = props.product;
  return (
    <Card
      maxW="sm"
      mt={"1rem"}
      ml={"1rem"}
      _hover={{
        transform: "scale(1.1)",
        boxShadow:
          "0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12);",
      }}
      transition={"0.25s"}
    >
      {/* <Skeleton height="20vmin" color="white" fadeDuration={1} /> */}
      <CardBody>
        <Center>
          <Skeleton
            height={imageLoaded ? "0px" : "20vmin"}
            width={imageLoaded ? "0px" : "200px"}
            color="white"
            fadeDuration={1}
          />

          <Image
            src={product.pic}
            borderRadius="lg"
            h={"20vmin"}
            onLoad={() => {
              setImgLoad(true);
            }}
            hidden={!imageLoaded}
          />
        </Center>
        <Stack mt="6" spacing="3">
          <Heading size="md">{product.title}</Heading>

          <TableContainer overflowX={"hidden"}>
            <Table size="sm">
              <Tbody>
                <Tr>
                  <Td justifyContent={"left"}>Base Price</Td>
                  <Td isNumeric>Rs. {product.basePrice}</Td>
                </Tr>
                <Tr>
                  <Td justifyContent={"left"}>Current Price</Td>
                  <Td isNumeric>
                    {product.currentPrice
                      ? `Rs. ${product.currentPrice}`
                      : `No bids`}
                  </Td>
                </Tr>
                <Tr>
                  <Td justifyContent={"left"}>Minimum Premium</Td>
                  <Td isNumeric>{product.minimumPremium}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
          <Text fontSize="xl">
            Place bid at :
            <Text color="blue">
              Rs.
              {product.currentPrice
                ? ` ${
                    (product.currentPrice * (100 + product.minimumPremium)) /
                    100
                  } `
                : ` ${product.basePrice}`}
            </Text>
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default HomeProductCard;
