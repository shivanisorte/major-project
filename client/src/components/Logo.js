import { Flex, Link } from "@chakra-ui/react";

function Logo() {
  return (
    <>
      <Flex direction={"column"} gap={"0"}>
      <Link 
      fontSize={['xl','xl','4xl', '4xl']}
              fontWeight='bold'
              ml={'3'}
              _hover={{
                color: 'purple.400', 
              }}
              to="/">
                Motion
              </Link>

      </Flex>
    </>
  );
}

export default Logo;
