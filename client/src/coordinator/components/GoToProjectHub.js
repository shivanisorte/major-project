import { Heading, Button, Box } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import proceedToNextPhase from "../../utils/proceedToNextPhase";

function GoToProjectHub({ heading, toast, setCurrentPhase }) {
  return (
    <Box height={"50vh"} textAlign={"center"}>
      <Heading size={["md", "lg", "lg", "lg"]} mt={[5, 5, 0, 0]} mb={5}>
        {heading}
      </Heading>
      <Link to={"../projecthub"}>
        <Button colorScheme="purple">Go to Project Hub</Button>
      </Link>
      <Button
        position={"absolute"}
        right={0}
        bottom={0}
        m={3}
        p={5}
        colorScheme="purple"
        variant={"solid"}
        onClick={() => proceedToNextPhase(toast, setCurrentPhase)}
      >
        Next
      </Button>
    </Box>
  );
}

export default GoToProjectHub;
