import React from "react";
import { Box, Flex, Heading, Image, Button, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";

const GetStartedStud = ({ image, buttonText, heading }) => {
  return (
    <div>
      <Flex minH="90vh" justify="center" direction="column">
        <Box maxW="lg" mx="auto" textAlign="center">
          <Heading fontSize={{ base: "3xl", md: "3xl", lg: "3xl" }}>
            {heading}
          </Heading>
          <Image
            maxWidth={["90vw", "100%"]}
            src={image}
            alt="get started coordinator img"
            my={3}
            ml={4}
          />

          <Stack
            direction={["column", "row", "row", "row"]}
            spacing={"20px"}
            align={"center"}
          >
            {" "}
            <Button
              width="2xs"
              rightIcon={<BiChevronRight />}
              colorScheme="purple"
              fontSize={["l", "l", "xl", "xl"]}
            >
              {buttonText[0]}
            </Button>
            <Link to="../formA">
              <Button
                width="2xs"
                rightIcon={<BiChevronRight />}
                colorScheme="purple"
                fontSize={["l", "l", "xl", "xl"]}
              >
                {buttonText[1]}
              </Button>
            </Link>
          </Stack>
        </Box>
      </Flex>
    </div>
  );
};

export default GetStartedStud;
