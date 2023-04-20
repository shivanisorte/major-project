import React, { useState, useEffect } from 'react';
import addProject from '../../utils/addProject';
import AppNav from '../../components/AppNav';
import ProjectCard from './../../components/ProjectCard';

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Box,
  Center,
  Heading,
  SimpleGrid,
  Text,
  useToast,
  ModalCloseButton,
  ModalFooter,
  ButtonGroup,
  IconButton, 
} from '@chakra-ui/react';

import { AddIcon, CloseIcon } from "@chakra-ui/icons";

import getUploadedByGuide from "../../utils/getUploadByGuide";

import axios from 'axios';



function ProjectHub() {
  const [projects, setProjects] = useState([]);
  const[projectType, setProjectType] = useState('');
  const [title, setTitle] = useState('');
  const [domain, setDomain] = useState('');
  const [description, setDescription] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [contact, setContact] = useState('');
  const [otherDetails, setOtherDetails] = useState('');
  const [uploadedBy, setUploadedBy] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [showAddProjectModal, setShowAddProjectModal] = useState(false);


  const [displayOnlyYourProjects, setDisplayOnlyYourProjects] = useState(false);

  const [displayFilteredProjects, setDisplayFilteredProjects] = useState(false);

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const onFilterModalOpen = () => setIsFilterModalOpen(true);
  const onFilterModalClose = () => setIsFilterModalOpen(false);


  const [selectedPDomain, setseletedPDomain] = useState('');
  const [selectedPtype, setselectedPtype] = useState('');
  const [selectedPstatus, setselectedPstatus] = useState('');


  const [allProjectsButtonColor, setAllProjectsButtonColor] = useState("purple");
  const [yourProjectsButtonColor, setYourProjectsButtonColor] = useState("gray");

  useEffect(()=>{
    const fetchData = async()=>{

      try{
        const resp = await axios.get("http://localhost:3001/projectHub");
        // console.log(resp);
        if(resp.data.success===true){
          setProjects(resp.data.projects);
        }
        getUploadedByGuide(setUploadedBy, toast);

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




  const handleSubmit = (event) => {
    setShowAddProjectModal(true);
    event.preventDefault();
    const newProject = {
      uploadedBy: uploadedBy,
      title: title,
      projectType:projectType,
      domain: domain,
      description: description,
      technologies: technologies,
      contact: contact,
      otherDetails:otherDetails,
      status: 'Open'
    };
    onClose();


    addProject(newProject,toast, setProjects);

  };



  const applySelectedFilters=()=>{
    console.log(selectedPDomain+' , '+selectedPtype+' , '+selectedPstatus);
    setDisplayFilteredProjects(true);
    onFilterModalClose();
    
  }

  const toast = useToast();

  const handleDisplayAllProjects = () => {
    setDisplayOnlyYourProjects(false);
    setDisplayFilteredProjects(false);
    setAllProjectsButtonColor('purple')
    setYourProjectsButtonColor('gray')
  };

  const handleDisplayYourProjects = () => {
    setDisplayOnlyYourProjects(true);
    setAllProjectsButtonColor('gray')
    setYourProjectsButtonColor('purple')
  };


  // Filter projects based on the value of displayOnlyYourProjects
  let filteredProjects;

  if (displayOnlyYourProjects) {
    if (displayFilteredProjects){
      filteredProjects = projects.filter(project => project.uploadedBy === uploadedBy);
      if (selectedPDomain !== "") {
        filteredProjects = filteredProjects.filter(project => project.domain === selectedPDomain);
      }
      
      if (selectedPtype !== "") {
        filteredProjects = filteredProjects.filter(project => project.projectType === selectedPtype);
      }
      
      if (selectedPstatus !== "") {
        filteredProjects = filteredProjects.filter(project => project.status === selectedPstatus);
      }
    }
    else{
      filteredProjects = projects.filter(project => project.uploadedBy === uploadedBy);
    }   
  } 
  else {
    if (displayFilteredProjects){
      filteredProjects = projects;
      if (selectedPDomain !== "") {
        filteredProjects = filteredProjects.filter(project => project.domain === selectedPDomain);
      }
      
      if (selectedPtype !== "") {
        filteredProjects = filteredProjects.filter(project => project.projectType === selectedPtype);
      }
      
      if (selectedPstatus !== "") {
        filteredProjects = filteredProjects.filter(project => project.status === selectedPstatus);
      }

    }
    else{
      filteredProjects = projects;
    }
    
  }

  return (
    <div>
      <AppNav/>  
      <Box>
      <Center>
        <Heading as="h1" size="xl" my={8}>
          Project Hub
        </Heading>
      </Center>

      <Center>
      <ButtonGroup my={2}>
          <Button
          colorScheme={allProjectsButtonColor}
          fontSize={["xs", "md", "md", "lg"]}
          onClick={handleDisplayAllProjects}
          >All Projects</Button>
          <Button 
          colorScheme={yourProjectsButtonColor}
          fontSize={["xs", "md", "md", "lg"]}
          onClick={handleDisplayYourProjects}
          >Your Projects</Button>
          <Button 
          colorScheme="purple" 
          variant={'outline'}
          fontSize={["xs", "md", "md", "lg"]}
          onClick={onFilterModalOpen}
          >Apply Filters</Button>
    </ButtonGroup>
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
                onChange={(e)=>setseletedPDomain(e.target.value)}
                >
                <option value="Artificial Intelligence">Artificial Intelligence</option>
                <option value="Data Science">Data Science</option>
                <option value="Web Development">Web Development</option>
                <option value="Android Development">Android Development</option>
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
                onChange={(e)=>setselectedPtype(e.target.value)}
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
                onChange={(e)=>setselectedPstatus(e.target.value)}
                >
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="purple" mr={3} onClick={onFilterModalClose}>
              Close
            </Button>
            <Button 
            colorScheme="purple"
            variant="outline"
            onClick={applySelectedFilters}
            >Apply Filter</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>






      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx={4}>
          <ModalHeader>Add Project</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  placeholder="Project Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  isRequired
                />
              </FormControl>
              <FormControl>
                <FormLabel>Project Type</FormLabel>
                <Select
                placeholder='Select type'
                value={projectType}
                onChange={(e)=>setProjectType(e.target.value)}
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
                  placeholder="Select Domain"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  isRequired
                >
                <option value="Artificial Intelligence">Artificial Intelligence</option>
                <option value="Data Science">Data Science</option>
                <option value="Web Development">Web Development</option>
                <option value="Android Development">Android Development</option>
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
                  placeholder="Project Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  isRequired
                />
              </FormControl>
              <FormControl>
                <FormLabel>Technologies</FormLabel>
                <Input
                  type="text"
                  placeholder="Technologies Used"
                  value={technologies}
                  onChange={(e) => setTechnologies(e.target.value)}
                  isRequired
                />
              </FormControl>
              <FormControl>
                <FormLabel>Contact</FormLabel>
                <Input
                  type="text"
                  placeholder="Contact Details"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  isRequired
                />
              </FormControl>
              <FormControl>
                <FormLabel>Other Details</FormLabel>
                <Textarea
                  placeholder="Add Extra Details"
                  value={otherDetails}
                  onChange={(e) => setOtherDetails(e.target.value)}
                  
                />
              </FormControl>
              <Button type="submit" my={4} colorScheme='green'>Add</Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      <SimpleGrid columns={[1, 2, 3, 4]} spacing={8} my={8} mx={8}>
        {filteredProjects.map((project, index) => (
          <ProjectCard 
          project={project} 
          key={index} 
          buttonval={displayOnlyYourProjects ? 'Update' : 'View Details'} 
          
          />
        ))}
      </SimpleGrid>


    <IconButton
    icon={<AddIcon />}
    isRound={true}
    // colorScheme="purple"
    border='2px'
    borderColor='white'
    color={'white'}
    background={'purple.600'}
    size="lg"
    position="fixed"
    bottom="4"
    right="4"
    zIndex="1"
    onClick={onOpen}
  />
      
    </Box>

    </div>
  );
}

export default ProjectHub