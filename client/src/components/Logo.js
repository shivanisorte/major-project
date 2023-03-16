import { Text, Flex } from "@chakra-ui/react";

function Logo({ category }) {
  return (
    <>
      <Flex direction={"column"} gap={"0"}>
        <Text color={"brand.white"} ml={"4"} fontSize={"2xl"}>
          Motion
        </Text>
        <Text color={"white"} ml={"4"} fontFamily={"mono"} fontSize={"xs"}>
          {category}
        </Text>
      </Flex>
    </>
  );
}

export default Logo;
