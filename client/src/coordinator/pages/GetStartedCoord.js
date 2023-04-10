import React, { useState } from "react";
import AppNav from "./../../components/AppNav";
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
} from "@chakra-ui/react";
import { BiChevronRight } from "react-icons/bi";

const GetStartedCoord = ({ image, buttonText, heading }) => {
  //for student
  const [studentSelectedFile, setstudentSelectedFile] = useState(null);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  //for guide
  const [guideSelectedFile, setguideSelectedFile] = useState(null);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);

  //student form uploading
  const [isStudDataLoading, setIsStudDataLoading] = useState(false);

  //guide form uploading
  const [isGuideDataLoading, setIsGuideDataLoading] = useState(false);

  const handleStudentFileSelect = (event) => {
    setIsStudDataLoading(true);
    // Simulate file upload delay
    setTimeout(() => {
      setstudentSelectedFile(event.target.files[0]);
      setIsStudDataLoading(false);
    }, 2000);
    console.log(studentSelectedFile.name);
  };

  const handleGuideFileSelect = (event) => {
    setIsGuideDataLoading(true);
    // Simulate file upload delay
    setTimeout(() => {
      setguideSelectedFile(event.target.files[0]);
      setIsGuideDataLoading(false);
    }, 2000);
    console.log(guideSelectedFile.name);
  };

  const handleSubmitStudent = () => {
    // Handle form submission here
    console.log(`Submitted file: ${studentSelectedFile.name}`);
    setIsStudentModalOpen(false);
  };

  const handleSubmitGuide = () => {
    // Handle form submission here
    console.log(`Submitted file: ${guideSelectedFile.name}`);
    setIsGuideModalOpen(false);
  };

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
            ml={4}
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
                    disabled={isStudDataLoading}
                  />
                  {isStudDataLoading ? (
                    <Box mt={4}>Loading...</Box>
                  ) : studentSelectedFile ? (
                    <Box mt={4}>Selected file: {studentSelectedFile.name}</Box>
                  ) : null}
                  {studentSelectedFile && (
                    <Box mt={4}>
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
              fontSize={["l", "l", "xl", "xl"]}
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
                    disabled={isGuideDataLoading}
                  />
                  {isGuideDataLoading ? (
                    <Box mt={4}>Loading...</Box>
                  ) : guideSelectedFile ? (
                    <Box mt={4}>Selected file: {guideSelectedFile.name}</Box>
                  ) : null}
                  {guideSelectedFile && (
                    <Box mt={4}>
                      <Button colorScheme="green" onClick={handleSubmitGuide}>
                        Submit
                      </Button>
                    </Box>
                  )}
                </ModalBody>
              </ModalContent>
            </Modal>
          </Stack>
        </Box>
      </Flex>
    </div>
  );
};

export default GetStartedCoord;
