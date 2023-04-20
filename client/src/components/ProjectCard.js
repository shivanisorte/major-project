import { useState } from "react";
import { 
    Box,
    Text,
    Heading,
    Flex,
    Button,
 } from "@chakra-ui/react";

 import ProjectModal from './ProjectModal';

const ProjectCard = ({ project, buttonval }) => {
    const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);
    const [ isUpdateOpen, setIsUpdateOpen] =useState(false);
  
    const toggleModal = () => {
      setIsViewDetailsOpen(!isViewDetailsOpen);
    };

    const handleUpdateModal = () =>{
      setIsUpdateOpen(!isUpdateOpen);
      console.log("I'm going to handle update and delete project")
    }
  
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
            <Button colorScheme="purple" size="sm" 
             onClick={buttonval === "View Details" ? toggleModal : handleUpdateModal}
            >
              {buttonval}
            </Button>
          </Flex>
  
          <ProjectModal project={project} isOpen={isViewDetailsOpen} toggleModal={toggleModal} />
        </Box>
      </Box>
    );
  };
  
  export default ProjectCard;