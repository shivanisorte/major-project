import { Box, Flex, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box as="footer" position="fixed" bottom={0} width="full" bg="purple.400" py={4}>
    <Flex align="center" justify="center">
        <Text color="white">Made with ♥️ by Motion Team</Text>
      </Flex>
      <Flex align="center" justify="center">
        <Text color="white">&copy; 2023 Your Website. All rights reserved.</Text>
      </Flex>
    </Box>
  );
};

export default Footer;