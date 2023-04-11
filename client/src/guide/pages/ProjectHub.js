import React, { useState } from 'react';
import AppNav from '../../components/AppNav';
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
  Flex,
  Text,
} from '@chakra-ui/react';


function ProjectHub() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [domain, setDomain] = useState('');
  const [description, setDescription] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [contact, setContact] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();


  const [showAddProjectModal, setShowAddProjectModal] = useState(false);


  const handleCloseModal = () => {
    setShowAddProjectModal(false);
  };


  const handleSubmit = (event) => {
    setShowAddProjectModal(true);
    event.preventDefault();
    const newProject = {
      title: title,
      domain: domain,
      description: description,
      technologies: technologies,
      contact: contact,
      status: 'Open'
    };
    setProjects([...projects, newProject]);
    onClose();
    console.log(newProject)
  };

  const ProjectCard = ({ project }) => {
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
              <Button colorScheme="purple" size="sm">
                View Details
              </Button>
            </Flex>
          </Box>
        </Box>
      );
    };

  

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
        <Button colorScheme="purple" onClick={onOpen} my={2}>
          Add Project
        </Button>
      </Center>
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
                <FormLabel>Domain</FormLabel>
                <Select
                  placeholder="Select Domain"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  isRequired
                >
                <option value="Artificial Intelligence">Machine Learning</option>
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
              <Button type="submit" my={4} colorScheme='green'>Add</Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      <SimpleGrid columns={[1, 2, , 3, 4]} spacing={8} my={8} mx={8}>
        {projects.map((project, index) => (
          <ProjectCard project={project} key={index} />
        ))}
      </SimpleGrid>
      
    </Box>

    </div>
  );
}

export default ProjectHub