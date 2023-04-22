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
  useToast,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";

import axios from 'axios';


const ProjectModal = ({ project, isOpen, toggleModal }) => {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [teamBackground, setTeamBackground] = useState('');
  const [pastProjects, setPastProjects] = useState('');
  const [projectProposal, setProjectProposal] = useState('');
  const [teamId, setTeamId] = useState('');

  useEffect(()=>{
    const fetchData = async()=>{

      try{
        const resp = await axios.get("http://localhost:3001/student");
        console.log(resp);
          // update team ID
        

      }
      catch(error){
          if (error.response) {
            toast({
              title: "Try again",
              description: "Please refresh.",
              status: "warning",
              duration: 6000,
              isClosable: true,
            });
          } else if (error.request) {
            toast({
              title: "Internal Server Error",
              description: "Please try again later.",
              status: "error",
              duration: 6000,
              isClosable: true,
            });
            console.log(error.request);
          } else {
            toast({
              title: "Check your internet connection",
              description: "Please check your internet connection and try again.",
              status: "error",
              duration: 6000,
              isClosable: true,
            });
          }
      
          console.log(error);
        }
    
    
    }

    fetchData();

  },[])

  const isApplyModalClose = () => {
    setIsApplyModalOpen(false);
  };

  const handleApply=()=>{
    toggleModal();
    setIsApplyModalOpen(true);
  }

  const addApplication = async (projectId, applicationData) => {
    try {
      const response = await axios.post(`http://localhost:3001/projectHub/addapplication/${projectId}`, applicationData);
      return response.data;
    } catch (error) {
      console.error(error);
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

  const toast = useToast();
    

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
          onClick={handleApply}
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
