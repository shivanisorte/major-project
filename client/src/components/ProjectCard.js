import { useState } from "react";
import { 
  Box,
  Text,
  Heading,
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
 } from "@chakra-ui/react";

 import ProjectModal from './ProjectModal';

const ProjectCard = ({ project, buttonval }) => {
    const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);
    const [isEditDetailsOpen, setIsEditDetailsOpen] = useState(false);
    // const [editedProject, setEditedProject] = useState(project);
    const [editedProject, setEditedProject] = useState(project);


    const toggleModal = () => {
      setIsViewDetailsOpen(!isViewDetailsOpen);
    };

    const toggleEditDetailsModal = () => {
      setIsEditDetailsOpen(!isEditDetailsOpen);
    };

    const handleUpdateModal = () =>{
      console.log("I'm going to update the project with the following details: ", editedProject);
      // Make an API call to update the project with editedProject data
      toggleEditDetailsModal();
    }

    const handleDeleteProject = () => {
      console.log("I'm going to delete the project with the following details: ", editedProject);
      // Make an API call to delete the project with editedProject data
      toggleEditDetailsModal();
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedProject((prevState) => ({ ...prevState, [name]: value }));
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
            <Button colorScheme="purple" size="sm" 
             onClick={buttonval === "View Details" ? toggleModal : toggleEditDetailsModal}
            >
              {buttonval}
            </Button>
          </Flex>
  
          <ProjectModal project={project} isOpen={isViewDetailsOpen} toggleModal={toggleModal} />

          <Modal isOpen={isEditDetailsOpen} onClose={toggleEditDetailsModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Project Details</ModalHeader>
              <ModalBody>
                <Stack spacing="4">
                  <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input type="text" name="title" value={project.title} onChange={handleInputChange} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Project Type</FormLabel>
                    <Input type="text" name="projectType" value={project.projectType} onChange={handleInputChange} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Domain</FormLabel>
                    <Input type="text" name="domain" value={project.domain} onChange={handleInputChange} />
                  </FormControl>
                  <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea name="description" value={project.description} onChange={handleInputChange} />
              </FormControl>

              <FormControl>
                <FormLabel>Technologies</FormLabel>
                <Textarea name="technologies" value={project.technologies} onChange={handleInputChange} />
              </FormControl>

              <FormControl>
                <FormLabel>Contact</FormLabel>
                <Input type="text" name="contact" value={project.contact}  onChange={handleInputChange}/>
              </FormControl>

              <FormControl>
                <FormLabel>Other Details</FormLabel>
                <Textarea name="otherDetails" value={project.otherDetails} onChange={handleInputChange} />
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>

            <Button colorScheme="purple" mr={3} onClick={() => handleUpdateModal()}>
              Update
            </Button>

            <Button colorScheme="purple" variant={"outline"} onClick={() => handleDeleteProject()}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>



        </Box>
      </Box>
    );
  };
  
  export default ProjectCard;