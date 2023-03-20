import { Text, Flex, Image } from "@chakra-ui/react";

function Logo({ category }) {
  return (
    <>
      <Flex direction={"column"} gap={"0"}>
        <Image src='https://o.remove.bg/downloads/621ce993-84b1-4091-bf90-ce3187ea9e2c/motion__1_-removebg-preview.png' alt='Motion' boxSize='250px' marginTop='-90px' marginBottom='-100px' marginLeft='-40px'/>
        <Text color={"white"} ml={"4"} fontFamily={"mono"} fontSize={"xs"}>
          {category}
        </Text>
      </Flex>
    </>
  );
}

export default Logo;
