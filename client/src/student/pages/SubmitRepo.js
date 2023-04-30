import React, { useState, useEffect } from "react";
import AppNav from "../../components/AppNav";
import { Box, Heading, Input, Button, Text, Link, VStack, Center } from "@chakra-ui/react";
import axios from "axios";

function SubmitRepo() {
  const [repositoryUrl, setRepositoryUrl] = useState("");
  const [teamId, setTeamId] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/student/", { withCredentials: true })
      .then((response) => {
        setTeamId(response.data.student.team);
        console.log(response.data.student.team)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(repositoryUrl);
    const repoData = {
      repoLink: repositoryUrl
    };
    axios.put(`http://localhost:3001/student/studentsubmitrepo/${teamId}`, repoData)
    .then(response => {
      console.log(response.data);
      // Handle success response
    })
    .catch(error => {
      console.error(error);
      // Handle error response
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
          <Center>
          <Text fontSize={['md','md','lg','xl']}>Project Finalized - Project XYZ</Text>
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
