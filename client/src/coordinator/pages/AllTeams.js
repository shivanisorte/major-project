import { useState, useEffect } from "react";
import AppNav from "../../components/AppNav";
import axios from "axios";
import {
  Spinner,
  Box,
  Text,
  StackDivider,
  Stack,
  CardBody,
  Heading,
  Card,
  Button,
  CardFooter,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  Modal,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

async function getAllTeams(setTeams) {
  try {
    const response = await axios.get(
      "http://localhost:3001/guide/team/all-teams",
      {
        withCredentials: true,
      }
    );
    if (response.data.success === true) {
      setTeams(response.data.teams);
    }
  } catch (error) {
    console.log(error);
  }
}

function AllTeams() {
  const [teams, setTeams] = useState(null);
  useEffect(() => {
    //check if panel selection is done.
    getAllTeams(setTeams);
  }, []);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <AppNav></AppNav>{" "}
      {teams ? (
        <>
          {teams.map((team, index) => (
            <>
              <Card _hover={{ shadow: "lg" }} m={5}>
                <CardBody>
                  <Stack divider={<StackDivider />} spacing="4">
                    <Box>
                      <Heading size="xs" pt="2" fontSize="sm">
                        Team {index + 1}
                      </Heading>
                      <Heading
                        textAlign={"right"}
                        size="xs"
                        pt="2"
                        fontSize="sm"
                      >
                        {team.formA.data[0].domain}
                      </Heading>
                      <Heading size="md">{team.formA.data[0].title}</Heading>
                    </Box>
                    <Box>
                      <Heading size="xs" textTransform="uppercase">
                        Technical
                      </Heading>
                      <Text pt="2" fontSize="md">
                        {team.formA.data[0].technical}
                      </Text>
                    </Box>
                    <Box>
                      <Heading size="xs" textTransform="uppercase">
                        Future Scope
                      </Heading>
                      <Text pt="2" fontSize="md">
                        {team.formA.data[0].futureScope}
                      </Text>
                    </Box>
                    <Box>
                      <Heading size="xs" textTransform="uppercase">
                        Applicability
                      </Heading>
                      <Text pt="2" fontSize="md">
                        {team.formA.data[0].applicability}
                      </Text>
                    </Box>
                  </Stack>
                </CardBody>{" "}
                <CardFooter></CardFooter>
              </Card>
            </>
          ))}
        </>
      ) : (
        <Box height="100vh">
          <Spinner
            position={"absolute"}
            top={"50%"}
            left={"50%"}
            color="purple.600"
          ></Spinner>
        </Box>
      )}
    </div>
  );
}

export default AllTeams;
