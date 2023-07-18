import { useEffect, useState } from "react";
import getPanelStatus from "../../utils/getPanelStatus";
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
import AppNav from "../../components/AppNav";
// async function getTeamAllocationStatus() {
//   try {
//     const response = await axios.get(
//       "http://localhost:3001/guide/panel/status",
//       {
//         withCredentials: true,
//       }
//     );
//     console.log(response);
//     if (
//       response.data.panelMemberOf.length < response.data.minimumTeamsToSelect
//     ) {
//       await getAllTeams(setSubmissions);
//     }
//     setMinimumTeamsToSelect(response.data.minimumTeamsToSelect);
//     setTeamsSelected(response.data.panelMemberOf);
//     setLoading(false);
//   } catch (error) {
//     console.log(error);
//   }
// }

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

function SelectTeam() {
  const [teams, setTeams] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  useEffect(() => {
    //check if panel selection is done.
    getAllTeams(setTeams);
  }, []);
  return (
    <div>
      <AppNav />
      <Heading m={2} textAlign={"center"} size={"lg"}>
        Select teams to guide
      </Heading>
      {teams ? (
        <>
          {teams.map((team) => (
            <>
              <Card m={5}>
                <CardBody>
                  <Stack divider={<StackDivider />} spacing="4">
                    <Box>
                      {/* <Heading size="xs" textTransform="uppercase">
                        Domain
                      </Heading> */}
                      <Heading size="xs" pt="2" fontSize="sm">
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
                <CardFooter>
                  <Box width={"full"} textAlign={"center"}>
                    <Button
                      // isDisabled={
                      //   teamObject.formA.panel.length === 3 ||
                      //   panelsSelected.includes(teamObject._id)
                      //     ? true
                      //     : false
                      // }
                      ml={2}
                      variant={"solid"}
                      colorScheme="purple"
                      onClick={() => {
                        onOpen();
                      }}
                      w={["40%", "30%", "20%", "15%"]}
                    >
                      Join Team
                    </Button>
                  </Box>
                </CardFooter>
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent width="90vw">
          <ModalHeader>Confirm Team</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to join this team as guide?
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => {
                onClose();
                toast({
                  title: "Congratulations!",
                  description: "You are guide for team 1!",
                  status: "success",
                  duration: 6000,
                  isClosable: true,
                });
              }}
              colorScheme="purple"
              mr={3}
            >
              Yes
            </Button>
            <Button onClick={onClose} variant="ghost">
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default SelectTeam;
