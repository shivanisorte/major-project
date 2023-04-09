import React, { useState } from "react";
import AppNav from "./../../components/AppNav";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    Textarea,
    VStack,
    useColorModeValue,
    Heading,
  } from "@chakra-ui/react";

const FormA = () => {
  const bg = useColorModeValue('gray.100', 'gray.700');
    const purple = useColorModeValue('purple.600', 'purple.300');
    const textColor = useColorModeValue('gray.800', 'gray.100');

    const [projects, setProjects] = useState([
        { title: "", domain: "", technical: "", futureScope: "", applicability: "" },
        { title: "", domain: "", technical: "", futureScope: "", applicability: "" },
        { title: "", domain: "", technical: "", futureScope: "", applicability: "" },
      ]);

      const handleInputChange = (event, index) => {
        const { name, value } = event.target;
        const newProjects = [...projects];
        newProjects[index][name] = value;
        setProjects(newProjects);
      };
    
      const handleSelectChange = (event, index) => {
        const { value } = event.target;
        const newProjects = [...projects];
        newProjects[index].domain = value;
        setProjects(newProjects);
      };
    
      const handleSubmit = () => {
        console.log(projects);
      };

      
  return (
    <>
    <AppNav></AppNav>
    <Box maxW="xl" mx="auto" my={8} px={8} py={8} borderRadius="lg" bg={bg}>
      <Box bg={purple} px={4} py={2} mb={8} borderTopRadius="lg" borderBottom="4px solid" borderColor={purple}>
      <Heading as="h1" size="lg" color="white" fontWeight="bold">
          Form A
        </Heading>
      </Box>

      <VStack spacing={4} mt={8}>
        {projects.map((project, index) => (
          <Box key={index} w="full" borderWidth="1px" p={4} rounded="md">
            <Heading as="h1" size="md" color="black" fontWeight="bold" mb={'5'}>
                Project {index+1}
            </Heading>
            <FormControl isRequired mb={4}>
              <FormLabel color={textColor} fontWeight="bold">Title</FormLabel>
              <Input
                type="text"
                name="title"
                placeholder="Enter the project title" bg="white"
                value={project.title}
                onChange={(event) => handleInputChange(event, index)}
              />
            </FormControl>

            <FormControl mt={4} isRequired mb={4}>
              <FormLabel color={textColor} fontWeight="bold">Project Domain</FormLabel>
              <Select
                placeholder="Select the project domain"
                bg="white"
                name="domain"
                value={project.domain}
                onChange={(event) => handleSelectChange(event, index)}
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

            <FormControl mt={4} isRequired mb={4}>
              <FormLabel color={textColor} fontWeight="bold">Technical</FormLabel>
              <Textarea
                name="technical"
                placeholder="Enter technical details" 
                bg="white"
                value={project.technical}
                onChange={(event) => handleInputChange(event, index)}
              />
            </FormControl>

            <FormControl mt={4} isRequired mb={4}>
              <FormLabel color={textColor} fontWeight="bold">Future Scope</FormLabel>
              <Textarea
                name="futureScope"
                placeholder="Enter future scope" 
                bg="white"
                value={project.futureScope}
                onChange={(event) => handleInputChange(event, index)}
              />
            </FormControl>

            <FormControl mt={4} isRequired mb={4}>
              <FormLabel color={textColor} fontWeight="bold">Applicability</FormLabel>
              <Textarea
                name="applicability"
                placeholder="Enter applicability" 
                bg="white"
                value={project.applicability}
                onChange={(event) => handleInputChange(event, index)}
              />
            </FormControl>
          </Box>
        ))}

        <Button 
          type="submit" 
          colorScheme="purple" 
          variant="outline" 
          mr={4} 
          mt={8} 
          onClick={handleSubmit}>
          Approve
        </Button>

        <Button 
          type="submit" 
          colorScheme="purple" 
          mt={4} 
          onClick={handleSubmit}>
          Submit
        </Button>
      </VStack>
    </Box>
    </>
  );
}


export default FormA;