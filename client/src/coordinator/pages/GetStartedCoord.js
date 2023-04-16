import React, { useState } from "react";
import uploadStudentCsv from "../../utils/uploadStudentCsv";
import uploadGuideCsv from "../../utils/uploadGuideCsv";
import {
  Box,
  Flex,
  Heading,
  Image,
  Stack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { BiChevronRight } from "react-icons/bi";
// import { useNavigate } from "react-router-dom";

const GetStartedCoord = ({
  image,
  buttonText,
  heading,
  isStudSubmitted,
  isGuideSubmitted,
}) => {
  //for student
  const [studentSelectedFile, setstudentSelectedFile] = useState(null);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  //for guide
  const [guideSelectedFile, setguideSelectedFile] = useState(null);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleStudentFileSelect = (event) => {
    setstudentSelectedFile(event.target.files[0]);
  };

  const handleGuideFileSelect = (event) => {
    setguideSelectedFile(event.target.files[0]);
  };

  const handleSubmitStudent = () => {
    // Handle form submission here
    setIsStudentModalOpen(false);
    uploadStudentCsv(studentSelectedFile, toast, setIsLoading);
  };

  const handleSubmitGuide = () => {
    // Handle form submission here
    console.log(`Submitted file: ${guideSelectedFile.name}`);
    setIsGuideModalOpen(false);
    uploadGuideCsv(guideSelectedFile, toast, setIsLoading);
  };

  // const navigate = useNavigate();

  const toast = useToast();

  return (
    <div>
      <Flex minH="90vh" justify="center" direction="column">
        <Box maxW="lg" mx="auto" textAlign="center">
          <Heading fontSize={{ base: "3xl", md: "3xl", lg: "3xl" }}>
            {heading}
          </Heading>
          <Image
            maxWidth={["90vw", "100%"]}
            src={image}
            alt="get started coordinator img"
            my={3}
          />
          <Stack
            direction={["column", "row", "row", "row"]}
            spacing={"20px"}
            align={"center"}
          >
            {" "}
            <Button
              onClick={() => setIsStudentModalOpen(true)}
              width="2xs"
              rightIcon={<BiChevronRight />}
              colorScheme="purple"
              fontSize={["l", "l", "xl", "xl"]}

              isDisabled={isLoading || isStudSubmitted}
              
            >
              {buttonText[0]}
            </Button>
            <Modal
              isCentered
              isOpen={isStudentModalOpen}
              size={["xs", "lg", "lg", "lg"]}
              onClose={() => setIsStudentModalOpen(false)}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader color={"purple.600"}>
                  Upload the Student XLSX file
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <input
                    type="file"
                    accept=".xlsx"
                    onChange={handleStudentFileSelect}
                  />
                  {studentSelectedFile ? (
                    <Box mt={4}>Selected file: {studentSelectedFile.name}</Box>
                  ) : null}
                  {studentSelectedFile && (
                    <Box textAlign={"right"} mt={4}>
                      <Button colorScheme="green" onClick={handleSubmitStudent}>
                        Submit
                      </Button>
                    </Box>
                  )}
                </ModalBody>
              </ModalContent>
            </Modal>
            <Button
              onClick={() => setIsGuideModalOpen(true)}
              width="2xs"
              rightIcon={<BiChevronRight />}
              colorScheme="purple"
              isDisabled={isLoading}
              fontSize={["l", "l", "xl", "xl"]}
              isDisabled={isGuideSubmitted}
            >
              {buttonText[1]}
            </Button>
            <Modal
              isCentered
              isOpen={isGuideModalOpen}
              onClose={() => setIsGuideModalOpen(false)}
              size={["xs", "lg", "lg", "lg"]}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader color={"purple.600"}>
                  Upload the Guide XLSX file
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <input
                    type="file"
                    accept=".xlsx"
                    onChange={handleGuideFileSelect}
                  />
                  {guideSelectedFile ? (
                    <Box mt={4}>Selected file: {guideSelectedFile.name}</Box>
                  ) : null}
                  {guideSelectedFile && (
                    <Box textAlign={"right"} mt={4}>
                      <Button colorScheme="green" onClick={handleSubmitGuide}>
                        Submit
                      </Button>
                    </Box>
                  )}
                </ModalBody>
              </ModalContent>
            </Modal>
          </Stack>

          <Spinner
            mt={"1rem"}
            visibility={isLoading ? "visible" : "hidden"}
            size="lg"
            color="purple.600"
          ></Spinner>
        </Box>
      </Flex>
    </div>
  );
};

export default GetStartedCoord;
