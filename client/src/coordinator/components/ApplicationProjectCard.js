import React, { useState, useEffect } from "react";
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
    ModalCloseButton,
    Table,
    Tbody,
    Tr,
    Td,
  } from "@chakra-ui/react";
import axios from 'axios';


  

const ApplicationProjectCard = ({
  project,
  toast,
  guide,
  guides,
}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFinalizeModalOpen, setIsFinalizeModalOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(99);
    const [isFinalized, setIsFinalized]=useState(false);
    const [isTeamDetailsOpen, setisTeamDetailsOpen] = useState(false);
    const [team, setTeam] = useState([]);

    useEffect(()=>{
      setIsFinalized(project.isFinalized)

    },[isFinalized]);

    const onViewApplications = () => {
        setIsModalOpen(true);
      };

      const alreadyFinalized=()=>{
        toast({
          title: "This project's team is already finalized",
          description: "Try finalizing teams for other projects.",
          status: "error",
          duration: 6000,
          isClosable: true,
        });
      }

     const noApplications = ()=>{
        toast({
            title: "No project applications",
            description: "This project didnt receive any applications.",
            status: "error",
            duration: 6000,
            isClosable: true,
          });

     }

     const getStudentsInfo = async (index) => {
      try {
        const response = await axios.get(`http://localhost:3001/projectHub/studentsInfoFromTeam/${project.applications[index].teamId}`);
        console.log( response.data);
        setTeam(response.data.students)
        setisTeamDetailsOpen(true);
        
      } catch (error) {
        console.error(error);
      }
    }

     const handleFinalizeClick = (index) => {
      setSelectedIndex(index);
        setIsFinalizeModalOpen(true);
      };
      
      const handleFinalizeConfirm = () => {
        // Perform finalize team logic here
        console.log(project.applications[selectedIndex]);
        updateTeamDetails(project.applications[selectedIndex].teamId, guide, project.title, project.domain, project.projectType);


        setIsFinalizeModalOpen(false);
      };
      
      const updateTeamDetails = async (teamId, guide, projectTitle, projectDomain, projectType) => {
        try {
          const putData = {
            guide: guide,
            projectTitle: projectTitle,
            projectDomain: projectDomain,
            projectType: projectType
          };

          console.log(putData)

         
          const response =  await axios.put(`http://localhost:3001/guide/finalizePHub/${teamId}`, putData, { withCredentials: true });
          console.log(response);

          const isFinalizeData= {
            "isFinalized": true
        };
        
          const response1 = await axios.put(`http://localhost:3001/projectHub/finalize/${project._id}`, isFinalizeData, { withCredentials: true });
          console.log(response1.data); // log the response from the server
          setIsModalOpen(false)
          project.isFinalized=true;
          setIsFinalized(true);

          if (response.data.success === true) {
            toast({
              title: "Team Selected",
              description: "All team Members are notified.",
              status: "success",
              duration: 6000,
              isClosable: true,
            });
          }
        } 
        catch (error) {
          if (error.response) {
            toast({
              title:
                error.response.data.status === "pending"
                  ? "Team Finalization pending"
                  : "Team Finalization cancelled.",
              description:
                error.response.data.status === "cancelled"
                  ? "Team Finalization is cancelled. Please try again."
                  : error.response.data.status === "pending"
                  ? "Try Team Finalization again."
                  : "Retry Team Finalization",
              status: error.response.data.status === "pending" ? "warning" : "error",
              duration: 6000,
              isClosable: true,
            });
            if (error.response.data.status === "cancelled") {
              //if the process is completely cancelled.
            }
          } else if (error.request) {
            console.log(error.request);
            toast({
              title: "Team Finalization couldn't be done.",
              description:
                "Could not do the the Team Finalization. Please try again later.",
              status: "error",
              duration: 6000,
              isClosable: true,
            });
          } else {
            toast({
              title: "Team Finalization not done. Try again later",
              description: error.message,
              status: "error",
              duration: 6000,
              isClosable: true,
            });
          }
          console.log("error config", error.config);
          console.log("error response data:", error.response.data);
        }


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
          <Text fontSize={{ base: "sm", md: "md" }}>
            Guide : {guides.find(guide => guide._id === project.guide)?.name}
          </Text>
          <Text fontSize={{ base: "sm", md: "md" }}>{project.domain}</Text>
          <Text fontSize={{ base: "sm", md: "md" }}>{project.projectType}</Text>
          <Text fontSize={{ base: "sm", md: "md" }} color={project.applications.length === 0 ? "red" : "green"} fontWeight={project.applications.length === 0 ? "normal" : "bold"}>
            {project.applications.length} applications
        </Text>
        </Box>
        <Button
          backgroundColor={project.isFinalized ? "green.500" : "purple.500"}
          color="white"
          borderRadius="full"
          px="6"
          onClick={project.isFinalized ? alreadyFinalized : (project.applications.length === 0 ? noApplications : onViewApplications)}
          _hover={{ backgroundColor: project.isFinalized ? "green.600" : "purple.600" }}
          _focus={{ outline: "none" }}
        >
          {project.isFinalized ? "Team Finalized" : "View Applications"}
        </Button>

      </Flex>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader backgroundColor={"#f5f1f9"}>Applications for {project.title}</ModalHeader>
          <ModalBody maxHeight="70vh" overflowY="auto">
            {project.applications.map((application, index) => (
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
                onClick={() =>getStudentsInfo(index)}
                size={'md'}>
                Team Details
                </Button>
                <Button 
                size={'md'}
                colorScheme="purple"
                variant={"outline"}
                onClick={() => handleFinalizeClick(index)}

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



    <Modal isOpen={isTeamDetailsOpen} onClose={() => setisTeamDetailsOpen(false)}>
  <ModalOverlay />
  <ModalContent
    maxWidth={['80%','80%','80%','60%']}

    margin="auto"
  >
    <ModalHeader>Team Details</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      <div style={{ overflowX: "auto" }}>
        <Table>
          <Tbody>
            {team.map((student) => (
              <Tr key={student._id}>
                <Td>{student.name}</Td>
                <Td>{student.email}</Td>
                <Td>{student.rno}</Td>
                <Td>{student.erno}</Td>
                <Td>{student.phno}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    </ModalBody>
    <ModalFooter>
      <Button colorScheme="purple" mr={3} onClose={() => setisTeamDetailsOpen(false)}>
        Close
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>




    </Box>
  );
};

export default ApplicationProjectCard;
