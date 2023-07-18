import { useState } from "react";
import {
  Box,
  Text,
  Heading,
  StackDivider,
  Stack,
  CardBody,
  Card,
  Button,
  CardFooter,
  CardHeader,
  Input,
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
import { Link } from "react-router-dom";

function LastPhase({ toast }) {
  const [reviewButton, setReviewButton] = useState(true);
  const [submissionButton, setSubmissionButton] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      {" "}
      <Card m={5}>
        <CardHeader>
          <Heading size={"lg"}>Schedule Reviews</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading m={2} size="md">
                Review 1
              </Heading>
              <Input placeholder="Select Date and Time" size="md" type="date" />
            </Box>
            <Box>
              <Heading m={2} size="md">
                Review 2
              </Heading>
              <Input placeholder="Select Date and Time" size="md" type="date" />
            </Box>
          </Stack>
          <Button
            onClick={() => {
              toast({
                title: "Schedule Set!",
                description: "You have set the review schedule",
                status: "success",
                duration: 6000,
                isClosable: true,
              });
              setReviewButton(false);
            }}
            isDisabled={!reviewButton}
            colorScheme={"purple"}
            mt={3}
          >
            Done
          </Button>
        </CardBody>
      </Card>
      <Card m={5}>
        <CardHeader>
          <Heading size={"lg"}>Final Submission</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading m={2} size="md">
                Project Report
              </Heading>
              <Input placeholder="Select Date and Time" size="md" type="date" />
            </Box>
            <Box>
              <Heading m={2} size="md">
                Final Presentation
              </Heading>
              <Input placeholder="Select Date and Time" size="md" type="date" />
            </Box>
          </Stack>
          <Button
            onClick={() => {
              toast({
                title: "Deadlines Set!",
                description: "You have set the submission dates",
                status: "success",
                duration: 6000,
                isClosable: true,
              });
              setSubmissionButton(false);
            }}
            isDisabled={!submissionButton}
            colorScheme={"purple"}
            mt={3}
          >
            Done
          </Button>
        </CardBody>
      </Card>
      <Box m={3} textAlign={"center"}>
        <Link to="../all-teams">
          <Button m={"0rem 1rem"} colorScheme="purple">
            View all teams
          </Button>
        </Link>

        <Button onClick={onOpen}>Schedule Webinar</Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent width="90vw">
          <ModalHeader>Schedule a webinar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Input m={1} placeholder="Title"></Input>
              <Input m={1} placeholder="By"></Input>
              <Input m={1} placeholder="Description"></Input>
              <Input m={1} type="datetime-local" placeholder="When"></Input>
            </Box>
          </ModalBody>

          <ModalFooter justifyContent={"center"}>
            <Button
              w={"50%"}
              onClick={() => {
                onClose();
                toast({
                  title: "Scheduled!",
                  description:
                    "You have scheduled a webinar. A mail has been sent to everyone!",
                  status: "success",
                  duration: 6000,
                  isClosable: true,
                });
              }}
              colorScheme="purple"
              mr={3}
            >
              Schedule
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default LastPhase;
