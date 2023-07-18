import {
  Spinner,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionIcon,
  Box,
  HStack,
  AccordionButton,
  Button,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  Modal,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

async function getPanelMemberOf(setTeams, toast) {
  try {
    const response = await axios.get(
      "http://localhost:3001/guide/panel/members-of",
      {
        withCredentials: true,
      }
    );
    if (response.data.success === true) {
      setTeams(response.data.panelMemberOf);
    }
  } catch (error) {
    if (error.response) {
      toast({
        title: "Could not get data",
        description: error.response.data.message,
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    } else if (error.request) {
      console.log(error.request);
      toast({
        title: "An error occured",
        description: "Could not send the request. Please try again later.",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Could not get teams' data",
        description: error.message,
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
    console.log(error);
  }
}

function finalizeTopic(toast, title, team, onClose) {
  onClose();
  toast({
    title: "Finalized",
    description: "You have finalized " + title + " for team " + team,
    status: "success",
    duration: 6000,
    isClosable: true,
  });
}

function PanelMemberOf({ toast }) {
  const [teams, setTeams] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const toast = useToast();
  useEffect(() => {
    getPanelMemberOf(setTeams, toast);
  }, []);
  return (
    <div>
      {teams ? (
        teams.map((teamObject, index) => (
          <>
            {" "}
            <Card size={"sm"} m={4} variant={"elevated"}>
              <CardHeader>
                <Heading size={"md"}>Team {index + 1}</Heading>
              </CardHeader>
              <CardBody>
                {teamObject.formA.data.map((proposal) => (
                  <Accordion allowMultiple>
                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <HStack
                            as="span"
                            flex="1"
                            justifyContent="space-between"
                            textAlign="left"
                          >
                            <Box>{proposal.title}</Box>
                            <Box>
                              <span style={{ margin: "0rem 0.5rem" }}>
                                {proposal.domain}
                              </span>
                              <Button
                                onClick={() => {
                                  onOpen();
                                }}
                              >
                                Finalize
                              </Button>
                            </Box>
                          </HStack>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <Heading size="sm">Technical: </Heading>
                        {proposal.technical}
                        <Heading size="sm">Future Scope:</Heading>
                        {proposal.futureScope}
                        <Heading size="sm">Applicability</Heading>
                        {proposal.applicability}
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                ))}
              </CardBody>
            </Card>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent width="90vw">
                <ModalHeader>Finalize topic</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  Are you sure you want to finalize this topic?
                </ModalBody>

                <ModalFooter>
                  <Button
                    onClick={() => {
                      finalizeTopic(
                        toast,
                        "Smart Home Automation System",
                        12,
                        onClose
                      );
                    }}
                    colorScheme="blue"
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
          </>
        ))
      ) : (
        <Spinner></Spinner>
      )}
    </div>
  );
}

export default PanelMemberOf;
