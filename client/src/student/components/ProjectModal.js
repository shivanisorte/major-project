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

const ProjectModal = ({ project, isOpen, toggleModal }) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const projectData = {
      teamBackground,
      pastProjects,
      projectProposal
    };

    console.log(projectData)
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
              <Textarea placeholder="Introduce each team member with their background and skills." />
            </FormControl>
            <FormControl id="past-projects" isRequired>
              <FormLabel>Relevant Past Projects/Experience</FormLabel>
              <Textarea placeholder="Enter relevant past projects/experience that your team has." />
            </FormControl>
            <FormControl id="project-proposal" isRequired>
              <FormLabel>Project Proposal</FormLabel>
              <Textarea placeholder="Enter a short project proposal describing your objective and goals and how you plan to achieve them." />
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
