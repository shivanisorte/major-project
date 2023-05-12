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
} from "@chakra-ui/react";

function LastPhase({ toast }) {
  const [reviewButton, setReviewButton] = useState(true);
  const [submissionButton, setSubmissionButton] = useState(true);
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
    </Box>
  );
}

export default LastPhase;
