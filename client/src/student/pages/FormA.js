import React, { useEffect, useState } from "react";
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
  Spinner,
  useToast,
  Image,
  Stack,
} from "@chakra-ui/react";

import formAApproved from "../../assets/formAApproved.svg";

import submitFormA from "../../utils/submitFormA";
import getFormAStatus from "../../utils/getFormAStatus";
import submitFormAApproval from "../../utils/submitFormAApproval";
import editFormA from "../../utils/editFormA";

const FormA = () => {
  const bg = useColorModeValue("gray.100", "gray.700");
  const purple = useColorModeValue("purple.600", "purple.300");
  const textColor = useColorModeValue("gray.800", "gray.100");

  const [projects, setProjects] = useState([
    {
      title: "",
      domain: "",
      technical: "",
      futureScope: "",
      applicability: "",
    },
    {
      title: "",
      domain: "",
      technical: "",
      futureScope: "",
      applicability: "",
    },
    {
      title: "",
      domain: "",
      technical: "",
      futureScope: "",
      applicability: "",
    },
  ]);
  const [teamApproval, setTeamApproval] = useState(null);
  const [studentApproval, setStudentApproval] = useState(null);
  const [teamId, setTeamId] = useState(null);
  const [nStudents, setNStudents] = useState(null);
  const [teamSubmission, setTeamSubmission] = useState(false);

  const toast = useToast();

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

  const handleApprove = (event) => {
    event.preventDefault();
    submitFormAApproval(
      teamId,
      nStudents,
      teamApproval,
      projects,
      setStudentApproval,
      setTeamApproval,
      toast
    );
  };

  const handleSubmit = (event) => {
    submitFormA(teamId, setTeamSubmission, toast);
  };

  const handleEdit = (event) => {
    editFormA(teamId, setTeamApproval, setStudentApproval, toast);
  };

  useEffect(() => {
    getFormAStatus(
      setTeamApproval,
      setTeamId,
      setNStudents,
      setStudentApproval,
      setProjects,
      setTeamSubmission
    );
  }, []);

  return (
    <>
      <AppNav></AppNav>
      {studentApproval != null ? (
        studentApproval === true ? (
          <>
            <Stack
              m={"2rem auto"}
              width={["80vw", "70vw", "55vw", "30vw"]}
              padding={"2rem"}
            >
              <Image height={"80%"} src={formAApproved}></Image>
              <Heading textAlign={"center"} fontFamily={"unset"} size={"md"}>
                {teamSubmission === true ? (
                  <>
                    YAY! Your team has submitted formA. Goodluck for your
                    presentation!
                  </>
                ) : (
                  "Please ask rest of your teammates to approve the form."
                )}
              </Heading>
              {teamSubmission === false ? (
                <>
                  <Button
                    onClick={handleEdit}
                    colorScheme="purple"
                    variant="outline"
                  >
                    Edit
                  </Button>
                  {teamApproval != null ? (
                    <Button
                      type="submit"
                      colorScheme="purple"
                      mt={4}
                      onClick={handleSubmit}
                      isDisabled={teamApproval < 100}
                    >
                      Submit
                    </Button>
                  ) : (
                    <Spinner color="purple.600"></Spinner>
                  )}
                </>
              ) : null}
            </Stack>
          </>
        ) : (
          <Box
            maxW="xl"
            mx="auto"
            my={8}
            px={8}
            py={8}
            borderRadius="lg"
            bg={bg}
          >
            <Box
              bg={purple}
              px={4}
              py={2}
              mb={8}
              borderTopRadius="lg"
              borderBottom="4px solid"
              borderColor={purple}
            >
              <Heading as="h1" size="lg" color="white" fontWeight="bold">
                Form A
              </Heading>
            </Box>

            <VStack spacing={4} mt={8}>
              <form
                style={{ textAlign: "center", width: "100%" }}
                onSubmit={handleApprove}
              >
                {projects.map((project, index) => (
                  <Box
                    key={index}
                    w="full"
                    borderWidth="1px"
                    p={4}
                    rounded="md"
                  >
                    <Heading
                      as="h1"
                      size="md"
                      color="black"
                      fontWeight="bold"
                      mb={"5"}
                      textAlign={"left"}
                    >
                      Project {index + 1}
                    </Heading>
                    <FormControl isRequired mb={4}>
                      <FormLabel color={textColor} fontWeight="bold">
                        Title
                      </FormLabel>
                      <Input
                        type="text"
                        name="title"
                        placeholder="Enter the project title"
                        bg="white"
                        value={project.title}
                        onChange={(event) => handleInputChange(event, index)}
                      />
                    </FormControl>

                    <FormControl mt={4} isRequired mb={4}>
                      <FormLabel color={textColor} fontWeight="bold">
                        Project Domain
                      </FormLabel>
                      <Select
                        placeholder="Select the project domain"
                        bg="white"
                        name="domain"
                        value={project.domain}
                        onChange={(event) => handleSelectChange(event, index)}
                      >
                        <option value="Artificial Intelligence">
                          Machine Learning
                        </option>
                        <option value="Data Science">Data Science</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Android Development">
                          Android Development
                        </option>
                        <option value="IOT">Internet of Things</option>
                        <option value="Algorithms">Algorithms</option>
                        <option value="Compilers">Compilers</option>
                        <option value="Blockchain">Blockchain</option>
                        <option value="Cloud">Cloud</option>
                        <option value="Others">Others</option>
                      </Select>
                    </FormControl>

                    <FormControl mt={4} isRequired mb={4}>
                      <FormLabel color={textColor} fontWeight="bold">
                        Technical
                      </FormLabel>
                      <Textarea
                        name="technical"
                        placeholder="Enter technical details"
                        bg="white"
                        value={project.technical}
                        onChange={(event) => handleInputChange(event, index)}
                      />
                    </FormControl>

                    <FormControl mt={4} isRequired mb={4}>
                      <FormLabel color={textColor} fontWeight="bold">
                        Future Scope
                      </FormLabel>
                      <Textarea
                        name="futureScope"
                        placeholder="Enter future scope"
                        bg="white"
                        value={project.futureScope}
                        onChange={(event) => handleInputChange(event, index)}
                      />
                    </FormControl>

                    <FormControl mt={4} isRequired mb={4}>
                      <FormLabel color={textColor} fontWeight="bold">
                        Applicability
                      </FormLabel>
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

                {studentApproval != null ? (
                  <Button
                    type="submit"
                    colorScheme="purple"
                    variant="outline"
                    mt={8}
                    isDisabled={studentApproval === true}
                  >
                    Approve
                  </Button>
                ) : (
                  <Spinner color="purple.600"></Spinner>
                )}
              </form>
            </VStack>
          </Box>
        )
      ) : (
        <Spinner></Spinner>
      )}
    </>
  );
};

export default FormA;
