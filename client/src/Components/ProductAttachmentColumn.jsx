import { Center, Grid, GridItem, Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const ProductAttachmentColumn = (props) => {
  const attachments = props.attachments;
  const [bigImage, setBigImage] = useState("");
  useEffect(() => {
    if (attachments) {
      setBigImage(attachments[0].toString());
    }
  }, [attachments]);
  return (
    <Center>
      <Grid templateColumns="repeat(8, 1fr)">
        <GridItem colSpan={1}>
          <Grid templateRows={`repeat(${attachments.length}, 1fr)`} rowGap="2">
            {attachments.length &&
              attachments.map((attachment, id) => {
                return (
                  <GridItem
                    key={id}
                    rowSpan={1}
                    onMouseEnter={() => {
                      setBigImage(attachment.toString());
                    }}
                  >
                    <Image
                      src={attachment.toString()}
                      h={attachment.toString() === bigImage ? "6vmin" : "5vmin"}
                      w={attachment.toString() === bigImage ? "6vmin" : "5vmin"}
                      border="1px"
                      borderColor="gray.200"
                    />
                  </GridItem>
                );
              })}
          </Grid>
        </GridItem>
        <GridItem colSpan={7}>
          <Center h="50vmin" w="75vmin">
            <Image src={bigImage} h="49vmin" />
          </Center>
        </GridItem>
      </Grid>
    </Center>
  );
};

export default ProductAttachmentColumn;
