import AppNav from "../../components/AppNav";
import GetStartedCoord from "./GetStartedCoord";
import gsimage from "../../assets/gSCoordinator.png";
import { useEffect, useState } from "react";
import {
  Spinner,
  useToast,
  Box,
  useSteps,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepTitle,
  StepDescription,
  StepSeparator,
  StepIcon,
  StepNumber,
  CircularProgress,
  CircularProgressLabel,
  Button,
  Text,
  Stack,
  Heading,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import getCoordinator from "../../utils/getCoordinator";
import GoToProjectHub from "../components/GoToProjectHub";
import Schedule from "../components/Schedule";
import proceedToNextPhase from "../../utils/proceedToNextPhase";
import LastPhase from "../components/LastPhase";

const phases = { 1: GetStartedCoord, 2: GoToProjectHub };

const steps = [
  { title: "First", description: "Upload Data" },
  { title: "Second", description: "Upload projects in \n Project Hub" },
  {
    title: "Third",
    description: "FormA submit/ \n Apply in Project Hub",
  },
  { title: "fourth", description: "Project Hub results" },
  { title: "fifth", description: "Panel Formation" },
  { title: "sixth", description: "Scheduling" },
  { title: "seventh", description: "Project Finalization" },
  { title: "eighth", description: "Guide allocation" },
];

function Dashboard() {
  const [coordinator, setCoordinator] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });
  const [currentPhase, setCurrentPhase] = useState();
  useEffect(() => {
    //here we will check if student collection exist, and render the UI accordingly.
    getCoordinator(
      navigate,
      toast,
      setCoordinator,
      setCurrentPhase,
      setActiveStep
    );
  }, [currentPhase]);

  return (
    <>
      <AppNav />
      {steps[activeStep + 1] ? (
        <Box padding={5} display={["none", "none", "inline", "inline"]}>
          <Stepper colorScheme="purple" p={5} size="sm" index={activeStep}>
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>

                <Box flexShrink="0">
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>
                    <Text whiteSpace={"pre-wrap"}>{step.description}</Text>
                  </StepDescription>
                </Box>

                <StepSeparator />
              </Step>
            ))}
          </Stepper>
        </Box>
      ) : null}
      {steps[activeStep + 1] ? (
        <Box
          mt={5}
          visibility={["visible", "visible", "hidden", "hidden"]}
          textAlign="center"
        >
          <CircularProgress
            value={((activeStep + 1) / 8) * 100}
            color="green.400"
          >
            <CircularProgressLabel>{activeStep + 1} of 8</CircularProgressLabel>
          </CircularProgress>
          {steps[activeStep + 1] ? (
            <Text size={"md"}>
              {console.log("active step", steps[activeStep])}
              {activeStep + 1}: {steps[activeStep].description}
            </Text>
          ) : (
            ""
          )}
          {steps[activeStep + 1] ? (
            <Text size={"sm"}>
              <Text color={"purple.600"} display={"inline"}>
                Next:
              </Text>{" "}
              {steps[activeStep + 1] ? steps[activeStep + 1].description : ""}
            </Text>
          ) : (
            ""
          )}
        </Box>
      ) : null}
      {coordinator ? (
        <>
          {coordinator.phase === 1 && (
            <GetStartedCoord
              heading={"Upload data to get started."}
              image={gsimage}
              buttonText={["Upload Student Data", "Upload Guide Data"]}
              isGuideSubmitted={coordinator.isGuideSubmitted}
              isStudSubmitted={coordinator.isStudSubmitted}
              setCurrentPhase={setCurrentPhase}
            ></GetStartedCoord>
          )}
          {coordinator.phase === 2 && (
            <GoToProjectHub
              heading={"Go to project hub to upload projects"}
              toast={toast}
              setCurrentPhase={setCurrentPhase}
            ></GoToProjectHub>
          )}
          {coordinator.phase === 3 && (
            <Box height={"50vh"} textAlign="center">
              <Heading size={["md", "lg", "lg", "lg"]}>
                Please inform students to submit formA or apply to project hub.{" "}
              </Heading>
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
          )}
          {coordinator.phase === 4 && (
            <GoToProjectHub
              heading={
                "Please go to project hub and finalize the teams under applications tab ."
              }
              toast={toast}
              setCurrentPhase={setCurrentPhase}
            ></GoToProjectHub>
          )}
          {coordinator.phase === 5 && (
            <Box height={"50vh"} textAlign="center">
              <Heading size={["md", "lg", "lg", "lg"]}>
                Please ask guides to select the panels
              </Heading>
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
          )}
          {coordinator.phase === 6 && (
            <Schedule
              toast={toast}
              setCurrentPhase={setCurrentPhase}
            ></Schedule>
          )}
          {coordinator.phase === 7 && (
            <Box height={"50vh"} textAlign={"center"}>
              <Heading size={["md", "lg", "lg", "lg"]}>
                Please ask all guides to finalize the project proposals
                submitted by teams
              </Heading>
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
          )}
          {coordinator.phase === 8 && (
            <Box height={"50vh"} textAlign={"center"}>
              {" "}
              <Heading size={["md", "lg", "lg", "lg"]}>
                Please ask all guides to finalize the project proposals
                submitted by teams
              </Heading>
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
          )}
          {coordinator.phase === 9 && <LastPhase toast={toast} />}
        </>
      ) : (
        <Box
          height={"100vh"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Spinner size={"lg"} color="purple.600" />{" "}
        </Box>
      )}
    </>
  );
}

export default Dashboard;
