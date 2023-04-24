import React, { useState } from "react"; 
import {
    Box,
    Button,
    Flex,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from "@chakra-ui/react";

  

const ApplicationProjectCard = ({
  project,
  toast,
}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFinalizeModalOpen, setIsFinalizeModalOpen] = useState(false);

    const onViewApplications = () => {
        setIsModalOpen(true);
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

     const handleFinalizeClick = () => {
        setIsFinalizeModalOpen(true);
      };
      
      const handleFinalizeConfirm = () => {
        // Perform finalize team logic here

        setIsFinalizeModalOpen(false);
      };
      
      const handleFinalizeCancel = () => {
        setIsFinalizeModalOpen(false);
      };
   
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
            {project.title}
          </Text>
          <Text fontSize={{ base: "sm", md: "md" }}>{project.domain}</Text>
          <Text fontSize={{ base: "sm", md: "md" }}>{project.projectType}</Text>
          <Text fontSize={{ base: "sm", md: "md" }} color={project.applications.length === 0 ? "red" : "green"} fontWeight={project.applications.length === 0 ? "normal" : "bold"}>
            {project.applications.length} applications
        </Text>
        </Box>
        <Button
          backgroundColor="purple.500"
          color="white"
          borderRadius="full"
          px="6"
          onClick={project.applications.length === 0 ? noApplications : onViewApplications}
          _hover={{ backgroundColor: "purple.600" }}
          _focus={{ outline: "none" }}
        >
          View Applications
        </Button>
      </Flex>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader backgroundColor={"#f5f1f9"}>Applications for {project.title}</ModalHeader>
          <ModalBody maxHeight="70vh" overflowY="auto">
            {project.applications.map((application) => (
                <Box key={application._id} borderBottomWidth="1px" pb="4" mb="4">
                <Text fontWeight="bold">Team Bio: </Text>
                <Text  mb="2">{application.teamBackground}</Text>
                <Text fontWeight="bold">Project Proposal: </Text>
                <Text mb="2">{application.projectProposal}</Text>
                <Text fontWeight="bold">Past Projects: </Text>
                <Text mb="2">{application.pastProjects}</Text>
                <Flex justifyContent="flex-end">
                <Button 
                colorScheme="purple" 
                mr={3} 
                variant={"ghost"}
                size={'md'}>
                Team Details
                </Button>
                <Button 
                size={'md'}
                colorScheme="purple"
                variant={"outline"}
                onClick={handleFinalizeClick}
                >
                Finalize Team
                </Button>
                </Flex>
                </Box>
            ))}
          </ModalBody>



          <ModalFooter backgroundColor={"#f5f1f9"}>
            <Button variant={"solid"} colorScheme="purple" onClick={() => setIsModalOpen(false)}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


      <Modal isOpen={isFinalizeModalOpen} onClose={handleFinalizeCancel}>
      <ModalOverlay />
      <ModalContent display="flex" alignItems="center" justifyContent="center">
        <ModalHeader>Finalize Team</ModalHeader>
        <ModalBody>
          Are you sure you want to finalize this team? Once finalized, this action can not be undone. 
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={handleFinalizeCancel}>
            No
          </Button>
          <Button colorScheme="purple" onClick={handleFinalizeConfirm}>
            Yes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>


    </Box>
  );
};

export default ApplicationProjectCard;
