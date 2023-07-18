import React from "react";

import { Box, HStack, Link, Flex, Button } from "@chakra-ui/react";

const LandNav = ({ colors }) => {
  return (
    <Box
      as="nav"
      bg={colors[0]}
      color={colors[1]}
      minH={"10vh"}
      paddingTop="1rem"
    >
      <Box>
        <HStack spacing="10">
          <Flex justify="space-between" flex="1">
            <HStack fontSize={["xl", "xl", "4xl", "4xl"]}>
              <Link
                marginLeft="30px"
                fontWeight="bold"
                _hover={{
                  color: colors[2],
                }}
                to="/"
              >
                Motion
              </Link>
            </HStack>

            <HStack
              fontSize={["l", "l", "2xl", "2xl"]}
              spacing={8}
              marginRight="30px"
            >
              <Link
                fontWeight="bold"
                _hover={{
                  color: colors[2],
                }}
                to="/about"
              >
                About App
              </Link>
              <Button
                variant="outline"
                fontSize={["l", "l", "2xl", "2xl"]}
                fontWeight="bold"
                borderColor={colors[2]}
                _hover={{
                  background: "transparent",
                  borderColor: "white",
                }}
              >
                Get in touch
              </Button>
            </HStack>
          </Flex>
        </HStack>
      </Box>
    </Box>
  );
};

export default LandNav;
