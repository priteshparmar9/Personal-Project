import { Button, Card, CardBody, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../Components/NavigationBar";

function SellerPage() {
  const { name } = useParams();
  // let temp = 10;

  const [temp, setTemp] = useState(10);
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount((count) => count + 1);
  }, [temp]);
  const fun = (e) => {
    // temp = temp + 1;
    setTemp(temp + 1);
    // temp++;
  };
  return (
    <Flex>
      <Sidebar />
      <Card>
        <CardBody>
          <Text>{name}</Text>
        </CardBody>
      </Card>
      Seller Page
      <Button onClick={fun}>Press Me</Button>
      <br />
      {/* {temp} */}
      {count}
    </Flex>
  );
}
export default SellerPage;
