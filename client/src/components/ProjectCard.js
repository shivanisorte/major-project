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
  Select,
} from "@chakra-ui/react";

import ProjectModal from "./ProjectModal";

import axios from "axios";

const ProjectCard = ({ project, buttonval, setProjects }) => {
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);
  const [isEditDetailsOpen, setIsEditDetailsOpen] = useState(false);
  // const [editedProject, setEditedProject] = useState(project);
  const [editedProject, setEditedProject] = useState(project);

  const toggleModal = () => {
    setIsViewDetailsOpen(!isViewDetailsOpen);
  };

  const updateit = () => {
    setEditedProject(project);
    toggleEditDetailsModal();
  };
  const toggleEditDetailsModal = () => {
    setIsEditDetailsOpen(!isEditDetailsOpen);
  };

  const updateProject = async (projectId, projectData) => {
    const url = `http://localhost:3001/projectHub/${projectId}`;
    try {
      const response = await axios.put(url, projectData);
      setProjects(prevProjects => {
        const updatedProjects = prevProjects.map(project => {
          if (project._id === projectId) {
            return {
              ...project,
              ...projectData
            };
          }
          return project;
        });
        return updatedProjects;
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const deleteProject = async (projectId) => {
    const url = `http://localhost:3001/projectHub/${projectId}`;
    try {
      const response = await axios.delete(url);
      setProjects(prevProjects => {
        const filteredProjects = prevProjects.filter(project => project._id !== projectId);
        return filteredProjects;
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleUpdateModal = () => {
    console.log(
      "I'm going to update the project with the following details: ",
      editedProject
    );
    const projectId = editedProject._id;
    const projectData = editedProject;
    updateProject(projectId, projectData)
      .then((updatedProject) => {
        console.log(updatedProject);
      })
      .catch((error) => {
        console.error(error);
      });

    toggleEditDetailsModal();
  };

  const handleDeleteProject = () => {
    console.log(
      "I'm going to delete the project with the following details: ",
      editedProject
    );
    const projectId = editedProject._id;
    deleteProject(projectId)
      .then((deletedProject) => {
        console.log(deletedProject);
      })
      .catch((error) => {
        console.error(error);
      });
    toggleEditDetailsModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProject((prevProject) => ({ ...prevProject, [name]: value }));
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
          <Button
            colorScheme="purple"
            size="sm"
            onClick={buttonval === "View Details" ? toggleModal : updateit}
          >
            {buttonval}
          </Button>
        </Flex>

        <ProjectModal
          project={project}
          isOpen={isViewDetailsOpen}
          toggleModal={toggleModal}
        />

        <Modal isOpen={isEditDetailsOpen} onClose={toggleEditDetailsModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Project Details</ModalHeader>
            <ModalBody>
              <Stack spacing="4">
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input
                    type="text"
                    name="title"
                    value={editedProject.title}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Project Type</FormLabel>
                  <Select
                    name="projectType"
                    value={editedProject.projectType}
                    onChange={handleInputChange}
                    isRequired
                  >
                    <option value="Faculty Project">Faculty Project</option>
                    <option value="DHealth">DHealth</option>
                    <option value="CREIYA">CREIYA</option>
                    <option value="ICAR">ICAR</option>
                    <option value="Others">Others</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Domain</FormLabel>
                  <Select
                    name="domain"
                    value={editedProject.domain}
                    onChange={handleInputChange}
                    isRequired
                  >
                    <option value="Artificial Intelligence">
                      Artificial Intelligence
                    </option>
                    <option value="Data Science">Data Science</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Android Development">
                      Android Development
                    </option>
                    <option value="IOT">Internet of Things</option>
                    <option value="Algorithms">Algorithms</option>
                    <option value="Compilers">Compilers</option>
                    <option value="Blockchain">Blockchain</option>
                    <option value="Cloud">Cloud</option>
                    <option value="Others">Others</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    name="description"
                    value={editedProject.description}
                    onChange={handleInputChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Technologies</FormLabel>
                  <Textarea
                    name="technologies"
                    value={editedProject.technologies}
                    onChange={handleInputChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Contact</FormLabel>
                  <Input
                    type="text"
                    name="contact"
                    value={editedProject.contact}
                    onChange={handleInputChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Other Details</FormLabel>
                  <Textarea
                    name="otherDetails"
                    value={editedProject.otherDetails}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="purple"
                mr={3}
                onClick={() => handleUpdateModal()}
              >
                Update
              </Button>

              <Button
                colorScheme="purple"
                variant={"outline"}
                onClick={() => handleDeleteProject()}
              >
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
