import { Box, Center, Grid, GridItem, Image } from "@chakra-ui/react";
import React, { useState } from "react";

const ProductAttachmentColumn = (props) => {
  const attachments = props.attachments;
  const [bigImage, setBigImage] = useState(attachments[0].toString());
  console.log(attachments);
  return (
    <Center>
      <Grid templateColumns="repeat(8, 1fr)">
        <GridItem colSpan={1}>
          <Grid templateRows={`repeat(${attachments.length}, 1fr)`} rowGap="2">
            <GridItem
              rowSpan={1}
              onMouseEnter={() => {
                setBigImage(attachments[0].toString());
              }}
            >
              <Image src={attachments[0].toString()} h="10" />
            </GridItem>
            <GridItem
              rowSpan={1}
              onMouseEnter={() => {
                setBigImage(attachments[1].toString());
              }}
            >
              <Image src={attachments[1].toString()} h="10" />
            </GridItem>
            <GridItem
              rowSpan={1}
              onMouseEnter={() => {
                setBigImage(attachments[2].toString());
              }}
            >
              <Image src={attachments[2].toString()} h="10" />
            </GridItem>
            <GridItem rowSpan={1}>
              <video width="75" height="75" controls="controls">
                <source src={attachments[3].toString()} type="video/mp4" />
              </video>
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem colSpan={7}>
          <Center>
            <Image src={bigImage} h="sm" />
          </Center>
        </GridItem>
      </Grid>
    </Center>
  );
};

export default ProductAttachmentColumn;
