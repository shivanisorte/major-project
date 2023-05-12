import React, { useState, useEffect } from "react";
import AppNav from "../../components/AppNav";
import { Box, Heading, Input, Button, Text, Link, VStack, Center, Image } from "@chakra-ui/react";
import axios from "axios";
import { useToast } from '@chakra-ui/react';
import done from "./../../assets/done.png"

function SubmitRepo() {
  const [repositoryUrl, setRepositoryUrl] = useState("");
  const [projectTitle, setProjectTitle]= useState('');
  const [projectDomain, setProjectDomain]= useState('');
  const [repoSub, setRepoSub] = useState(false);
  const [teamId, setTeamId] = useState("");
  const toast = useToast();
  

  useEffect(() => {
    console.log('hvghv')
    axios
      .get("http://localhost:3001/student/", { withCredentials: true })
      .then((response) => {
        setTeamId(response.data.student.team);
        console.log(response.data.student.team);
      })
      .catch((error) => {
        console.log(error);
      });
  
    const fetchTeamData = async (teamId) => {
      if (teamId) {
        try {
          const response = await axios.get(`http://localhost:3001/student/getdata/${teamId}`, { withCredentials: true });
          const { success, team, message } = response.data;
  
          if (success) {
            // Team data retrieval successful
            console.log('Team:', team);
            if(team.repoLink){
              setRepoSub(true);
            }
            setProjectTitle(team.projectTitle)
            setProjectDomain(team.projectDomain)
            // Process team data as needed
          } else {
            // Team not found or other error
            console.error(message);
          }
        } catch (error) {
          // Error during API call
          console.error('Error:', error.message);
        }
      }
    };
  
    fetchTeamData(teamId);
  }, [teamId]);
  

  const handleSubmit = (event) => {
    event.preventDefault();

    if (repositoryUrl.trim() === '') {
      // Display a toast message when the repository URL is empty
      toast({
        title: 'Empty Repository URL',
        description: 'Please enter a valid repository URL',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }


    console.log(repositoryUrl);
    const repoData = {
      repoLink: repositoryUrl
    };
    axios.put(`http://localhost:3001/student/studentsubmitrepo/${teamId}`, repoData, { withCredentials: true } )
    .then(response => {
      console.log(response.data);
      toast({
        title: 'Added Repository URL',
        description: 'Successfully added repository URL',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      // Handle success response
    })
    .catch(error => {
      console.error(error);
      // Handle error response
      toast({
        title: 'Error',
        description: error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    });
    };

  const handleChange = (event) => {
    setRepositoryUrl(event.target.value);
  };

  return (
    <div style={{ 
      background: "linear-gradient(16deg, rgba(255, 255, 255, 1) 20%, rgba(183, 148, 244, 0.4) 80.1%)",
    }}>
    
      <AppNav></AppNav>

      <Box
        p={6}
        mt={6}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="87vh"
      >
        <VStack spacing={6}>
        {repoSub ? (
          <>
          <Heading as="h1" size="2xl">
            Repository Submitted ✅
          </Heading>

          <Image
            maxWidth={["300px", "300px"]}
            src={done}
            alt="get started coordinator img"
            my={3}
            ml={4}
          />

          </>
        ) : (
          <>
          <Heading as="h1" size="2xl">
            Submit your GitHub repository
          </Heading>
          <form
          my={6}
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "row" }}
        >
          <Input
          name="repositoryUrl"
          placeholder="Enter your repository URL"
          size={["md","md","lg","lg"]}
          mr={2}
          value={repositoryUrl}
          onChange={handleChange}
          borderColor="black"
        />

          <Button type="submit" colorScheme="purple" size="lg">
            Submit
          </Button>
        </form>
        </>
        )}



          
          
          <Center>
          <Text fontSize={['md','md','lg','xl']}>Project Finalized - {projectTitle}</Text>
          </Center>
          <Center>
          <Text fontSize={['md','md','lg','xl']}>Project Domain - {projectDomain}</Text>
          </Center>
          <Text fontSize={['sm','sm','md','lg']}>
            Need help creating a repository on GitHub? Check out the{" "}
            <Link
              href="https://docs.github.com/en/github-ae@latest/get-started/quickstart/create-a-repo"
              color="blue.500"
              isExternal
            >
              Github documentation page
            </Link>{" "}
            for step-by-step instructions.
          </Text>
        </VStack>
      </Box>
    </div>
  );
}

export default SubmitRepo;
