import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  Text,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";

import { useState } from "react";

import axios from 'axios';


const ProjectModal = ({ project, isOpen, toggleModal, teamId, toast, setIsProjectHubApplied, isProjectHubApplied }) => {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [teamBackground, setTeamBackground] = useState('');
  const [pastProjects, setPastProjects] = useState('');
  const [projectProposal, setProjectProposal] = useState('');
  

  const isApplyModalClose = () => {
    setIsApplyModalOpen(false);
  };

  const handleApply=()=>{
    toggleModal();
    setIsApplyModalOpen(true);
  }

  const alreadyApplied=()=>{
    toast({
      title: "You have already applied",
      description: "You can apply to only project in Project Hub",
      status: "error",
      duration: 6000,
      isClosable: true,
    });
  }

  const addApplication = async (projectId, applicationData) => {
    try {
      const response = await axios.post(`http://localhost:3001/projectHub/addapplication/${projectId}`, applicationData);
      toast({
        title: "Application submitted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      try {
        const updateIsProjectHubAppliedResponse = await axios.put(`http://localhost:3001/projectHub/isProjectHubApplied/${teamId}`);
        console.log(updateIsProjectHubAppliedResponse.data);
        // Handle success
      } catch (error) {
        console.error(error);
        // Handle error
      }

      setIsProjectHubApplied(true);


      return response.data;
  
    } catch (error) {
      console.error(error);
      toast({
        title: "An error occurred.",
        description: "Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const projectData = {
      teamId,
      teamBackground,
      pastProjects,
      projectProposal
    };

    console.log(projectData);

    try {
      const response = await addApplication(project._id, projectData);
      console.log(response); // handle success response
    } catch (error) {
      console.error(error); // handle error response
    }

    isApplyModalClose();


  }

    

  return (
    <>

    <Modal isOpen={isOpen} onClose={toggleModal} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{project.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <Text fontSize="lg" mb="2">
              <strong>Project Type:</strong> {project.projectType}
            </Text>
            <Text fontSize="lg" mb="2">
              <strong>Domain:</strong> {project.domain}
            </Text>
            <Text fontSize="lg" mb="2">
              <strong>Description:</strong> {project.description}
            </Text>
            <Text fontSize="lg" mb="2">
              <strong>Technologies:</strong> {project.technologies}
            </Text>
            <Text fontSize="lg" mb="2">
              <strong>Contact:</strong> {project.contact}
            </Text>
            <Text fontSize="lg" mb="2">
              <strong>Other Details:</strong> {project.otherDetails}
            </Text>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="purple" mr={3} 
          onClick={isProjectHubApplied ? alreadyApplied : handleApply}
          >
            Apply
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>


    <Modal isOpen={isApplyModalOpen} onClose={isApplyModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Your Application </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="team-background" isRequired>
              <FormLabel>Team Background</FormLabel>
              <Textarea 
              placeholder="Introduce each team member with their background and skills." 
              value={teamBackground}
              onChange={(e) => setTeamBackground(e.target.value)}
              isRequired/>
            </FormControl>
            <FormControl id="past-projects" isRequired>
              <FormLabel>Relevant Past Projects/Experience</FormLabel>
              <Textarea 
              placeholder="Enter relevant past projects/experience that your team has." 
              value={pastProjects}
              onChange={(e) => setPastProjects(e.target.value)}
              isRequired/>
            </FormControl>
            <FormControl id="project-proposal" isRequired>
              <FormLabel>Project Proposal</FormLabel>
              <Textarea 
              placeholder="Enter a short project proposal describing your objective and goals and how you plan to achieve them." 
              value={projectProposal}
              onChange={(e) => setProjectProposal(e.target.value)}
              isRequired/>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="purple" mr={3} onClick={handleSubmit}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>



</>

  );
};

export default ProjectModal;
