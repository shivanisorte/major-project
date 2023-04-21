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
} from "@chakra-ui/react";

const ProjectModal = ({ project, isOpen, toggleModal }) => {
  return (
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
          <Button colorScheme="purple" mr={3} onClick={toggleModal}>
            Apply
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProjectModal;
