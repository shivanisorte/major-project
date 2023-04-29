import React, { useState } from "react";
import AppNav from "../../components/AppNav";
import { Box, Heading, Input, Button, Text, Link, VStack, Center } from "@chakra-ui/react";

function SubmitRepo() {
  const [repositoryUrl, setRepositoryUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(repositoryUrl);
    // give to mongodb
  };

  const handleChange = (event) => {
    setRepositoryUrl(event.target.value);
  };

  return (
    <>
      <AppNav></AppNav>

      <Box
        p={6}
        mt={6}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="70vh"
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
              size="lg"
              mr={2}
              value={repositoryUrl}
              onChange={handleChange}
            />
            <Button type="submit" colorScheme="purple" size="lg">
              Submit
            </Button>
          </form>
          <Center>
          <Text fontSize={['md','md','lg','xl']}>Project Finalized - Project XYZ</Text>
          </Center>
          <Text fontSize={['sm','sm','md','lg']}>
            Need help creating a repository on Github? Check out the{" "}
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
    </>
  );
}

export default SubmitRepo;
