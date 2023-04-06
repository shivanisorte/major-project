import React, { useState } from "react";
import AppNav from "./../../components/AppNav";
import { Box, Flex, Heading, Image, Stack, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from "@chakra-ui/react";
import { BiChevronRight } from "react-icons/bi";

const GetStartedCoord = ({ image, buttonText, heading }) => {
    //for student
    const [studentSelectedFile, setstudentSelectedFile] = useState(null);
    const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
    //for guide
    const [guideSelectedFile, setguideSelectedFile] = useState(null);
    const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);


    const handleStudentFileSelect = (event) => {
        console.log("i'm here");
        console.log(event.target.files[0]);
        setstudentSelectedFile(event.target.files[0]);
        setIsStudentModalOpen(false);
      };

    const handleGuideFileSelect = (event) => {
        console.log("i'm here");
        console.log(event.target.files[0]);
        setguideSelectedFile(event.target.files[0]);
        setIsGuideModalOpen(false);
      };

  return (
    <div>
      <AppNav />

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
            <Modal isCentered isOpen={isStudentModalOpen} onClose={() => setIsStudentModalOpen(false)} size={['xs','lg','lg','lg']}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader color={"purple.600"}>Upload the Student XLSX file</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <input type="file" accept=".xlsx" onChange={handleStudentFileSelect} />
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
            <Modal isCentered isOpen={isGuideModalOpen} onClose={() => setIsGuideModalOpen(false)} size={['xs','lg','lg','lg']}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader color={"purple.600"}>Upload the Guide XLSX file</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <input type="file" accept=".xlsx" onChange={handleGuideFileSelect} />
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
