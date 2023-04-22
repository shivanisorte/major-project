import React, { useState, useEffect } from "react";
import AppNav from "../../components/AppNav";
import ApplytoProject from "../components/ApplytoProject";

import {
  Button,
  FormControl,
  FormLabel,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Box,
  Center,
  Heading,
  SimpleGrid,
  useToast,
  ModalCloseButton,
  ModalFooter,
  IconButton,
} from "@chakra-ui/react";

import { MdFilterList } from "react-icons/md";

import axios from "axios";

function ProjectHub() {
  const [projects, setProjects] = useState([]);

  const [displayFilteredProjects, setDisplayFilteredProjects] = useState(false);

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const onFilterModalOpen = () => setIsFilterModalOpen(true);
  const onFilterModalClose = () => setIsFilterModalOpen(false);

  const [selectedPDomain, setseletedPDomain] = useState("");
  const [selectedPtype, setselectedPtype] = useState("");
  const [selectedPstatus, setselectedPstatus] = useState("");
  const [teamId, setTeamId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get("http://localhost:3001/projectHub");
        if (resp.data.success === true) {
          setProjects(resp.data.projects);
        }
        const response = await axios.get("http://localhost:3001/student", {
          withCredentials: true
        })
    
        setTeamId(response.data.student.team)
      } catch (error) {
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
    };

    fetchData();
  }, []);

  const applySelectedFilters = () => {
    console.log(
      selectedPDomain + " , " + selectedPtype + " , " + selectedPstatus
    );
    setDisplayFilteredProjects(true);
    onFilterModalClose();
  };

  const toast = useToast();

  const onResetFilter = () => {
    setselectedPstatus("");
    setselectedPtype("");
    setseletedPDomain("");
  };

  let filteredProjects;

  if (displayFilteredProjects) {
    filteredProjects = projects;
    if (selectedPDomain !== "") {
      filteredProjects = filteredProjects.filter(
        (project) => project.domain === selectedPDomain
      );
    }

    if (selectedPtype !== "") {
      filteredProjects = filteredProjects.filter(
        (project) => project.projectType === selectedPtype
      );
    }

    if (selectedPstatus !== "") {
      filteredProjects = filteredProjects.filter(
        (project) => project.status === selectedPstatus
      );
    }
  } else {
    filteredProjects = projects;
  }

  

  return (
    <div>
      <AppNav />
      <Box>
        <Center>
          <Heading as="h1" size="xl" my={8}>
            Project Hub
          </Heading>
        </Center>

        <Modal isOpen={isFilterModalOpen} onClose={onFilterModalClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Filters</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Domain</FormLabel>
                <Select
                  placeholder="Select domain"
                  value={selectedPDomain}
                  onChange={(e) => setseletedPDomain(e.target.value)}
                >
                  <option value="Artificial Intelligence">
                    Artificial Intelligence
                  </option>
                  <option value="Data Science">Data Science</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Android Development">
                    Android Development
                  </option>
                  <option value="IOT">IOT</option>
                  <option value="Algorithms">Algorithms</option>
                  <option value="Compilers">Compilers</option>
                  <option value="Blockchain">Blockchain</option>
                  <option value="Cloud">Cloud</option>
                  <option value="Others">Others</option>
                </Select>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Type</FormLabel>
                <Select
                  placeholder="Select type"
                  value={selectedPtype}
                  onChange={(e) => setselectedPtype(e.target.value)}
                >
                  <option value="Faculty Project">Faculty Project</option>
                  <option value="DHealth">DHealth</option>
                  <option value="CREIYA">CREIYA</option>
                  <option value="ICAR">ICAR</option>
                  <option value="Others">Others</option>
                </Select>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Status</FormLabel>
                <Select
                  placeholder="Select status"
                  value={selectedPstatus}
                  onChange={(e) => setselectedPstatus(e.target.value)}
                >
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                </Select>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="purple" mr={3} onClick={onResetFilter}>
                Reset
              </Button>
              <Button
                colorScheme="purple"
                variant="outline"
                onClick={applySelectedFilters}
              >
                Apply Filter
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <SimpleGrid columns={[1, 2, 3, 4]} spacing={8} my={8} mx={8}>
          {filteredProjects.map((project, index) => (
            <ApplytoProject
              project={project}
              key={index}
              teamId={teamId}
              toast={toast}
            />
          ))}
        </SimpleGrid>

        <IconButton
          icon={<MdFilterList />}
          isRound={true}
          border="2px"
          borderColor="white"
          color={"white"}
          background={"purple.600"}
          size="lg"
          position="fixed"
          bottom="4"
          right="4"
          zIndex="1"
          onClick={onFilterModalOpen}
        />
      </Box>
    </div>
  );
}

export default ProjectHub;
