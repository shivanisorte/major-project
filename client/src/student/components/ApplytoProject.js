import { useState } from "react";
import { Box, Text, Heading, Flex, Button } from "@chakra-ui/react";

import ProjectModal from "./ProjectModal";

const ApplytoProject = ({ project }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      transition="transform .2s"
      _hover={{ transform: "scale(1.05)" }}
    >
      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Text
            textTransform="uppercase"
            fontSize="sm"
            fontWeight="bold"
            color="purple.600"
            mr="2"
          >
            {project.domain}
          </Text>
        </Box>

        <Heading size="md" my="2" fontWeight="semibold">
          {project.title}
        </Heading>

        <Text color="gray.700" fontSize="md" mb="4">
          Guide: {project.contact}
        </Text>

        <Flex justifyContent="flex-end">
          <Button colorScheme="purple" size="sm" onClick={toggleModal}>
            View Details
          </Button>
        </Flex>

        <ProjectModal
          project={project}
          isOpen={isOpen}
          toggleModal={toggleModal}
        />
      </Box>
    </Box>
  );
};

export default ApplytoProject;
