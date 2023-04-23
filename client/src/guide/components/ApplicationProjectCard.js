import React from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";

const ApplicationProjectCard = ({
  title,
  domain,
  type,
  numApplications,
  toast,
//   onViewApplications,
  applications,
}) => {

    const onViewApplications = () => {
        toast({
            title: " project applications",
            description: "This project  receive  applications.",
            status: "success",
            duration: 6000,
            isClosable: true,
          });
      };

     const noApplications = ()=>{
        toast({
            title: "No project applications",
            description: "This project didnt receive any applications.",
            status: "error",
            duration: 6000,
            isClosable: true,
          });

     }
   
  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      width={["100%", "70%", "70%", "66%"]}
      mx="auto"
      my="4"
      transition="all 0.3s"
      _hover={{ transform: "scale(1.02)" }}
      boxShadow="md"
      backgroundColor="white"
    >
      <Flex
        justify="space-between"
        alignItems="center"
        padding={{ base: "4", md: "6" }}
      >
        <Box>
          <Text fontWeight="bold" fontSize={{ base: "lg", md: "xl" }}>
            {title}
          </Text>
          <Text fontSize={{ base: "sm", md: "md" }}>{domain}</Text>
          <Text fontSize={{ base: "sm", md: "md" }}>{type}</Text>
          <Text fontSize={{ base: "sm", md: "md" }} color={numApplications === 0 ? "red" : "green"} fontWeight={numApplications === 0 ? "normal" : "bold"}>
            {numApplications} applications
        </Text>
        </Box>
        <Button
          backgroundColor="purple.500"
          color="white"
          borderRadius="full"
          px="6"
          onClick={numApplications === 0 ? noApplications : onViewApplications}
          _hover={{ backgroundColor: "purple.600" }}
          _focus={{ outline: "none" }}
        >
          View Applications
        </Button>
      </Flex>
    </Box>
  );
};

export default ApplicationProjectCard;
