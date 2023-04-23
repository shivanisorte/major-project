import React from "react";
import { Box, Flex, Heading, Image, Button, Stack } from "@chakra-ui/react";
import { BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";

function handleEmailClick() {
  const email = "sssorte1428@gmail.com";
  const subject = "Request for assistance with ...";
  const body = `I hope this email finds you well. I am writing to follow up on the status of ...

Best Regards,
    `;
  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoUrl;
}

const GetStartedGuide = ({ image, buttonText, heading }) => {
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
            <Link to="../projecthub">
              <Button
                minWidth="2xs"
                rightIcon={<BiChevronRight />}
                colorScheme="purple"
                fontSize={["l", "l", "xl", "xl"]}
                p={2}
              >
                {buttonText[0]}
              </Button>
            </Link>
            <Link to={"../select-panel"}>
              {" "}
              <Button
                minWidth="2xs"
                rightIcon={<BiChevronRight />}
                colorScheme="purple"
                fontSize={["l", "l", "xl", "xl"]}
                // onClick={handleEmailClick}
                p={2}
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

export default GetStartedGuide;
