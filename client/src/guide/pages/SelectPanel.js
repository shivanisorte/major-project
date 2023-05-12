import { useEffect, useState } from "react";

import {
  Spinner,
  Box,
  HStack,
  Button,
  Icon,
  Card,
  CardBody,
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionButton,
  AccordionPanel,
  Heading,
  CardHeader,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalContent,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import AppNav from "../../components/AppNav";
import { BsDot } from "react-icons/bs";
import Loading from "../../components/Loading";
import getPanelStatus from "../../utils/getPanelStatus";
import selectPanel from "../../utils/selectPanel";
import PanelMemberOf from "../components/PanelMemberOf";

function SelectPanel() {
  const [submissions, setSubmissions] = useState();
  const [minimumTeamsToSelect, setMinimumTeamsToSelect] = useState();
  const [panelsSelected, setPanelsSelected] = useState(null);
  const [teamPanelSelected, setTeamPanelSelected] = useState();
  const [loading, setLoading] = useState(true);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  useEffect(() => {
    //check if panel selection is done.
    getPanelStatus(
      setMinimumTeamsToSelect,
      setPanelsSelected,
      setSubmissions,
      setLoading
    );
  }, []);

  return (
    <>
      <AppNav />

      {panelsSelected ? (
        panelsSelected.length < minimumTeamsToSelect ? (
          submissions != null ? (
            <>
              <Heading m={2} textAlign={"center"} size={"lg"}>
                Teams selected: {panelsSelected.length}/{minimumTeamsToSelect}
              </Heading>
              {submissions.map((teamObject, index) => (
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
                                <Box>{proposal.domain}</Box>
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

                    <Box width={"full"} textAlign={"center"}>
                      <Icon
                        color={
                          teamObject.formA.panel[0] ? "purple.600" : "grey"
                        }
                        fontSize={"3xl"}
                      >
                        <BsDot></BsDot>
                      </Icon>
                      <Icon
                        color={
                          teamObject.formA.panel[1] ? "purple.600" : "grey"
                        }
                        fontSize={"3xl"}
                      >
                        <BsDot></BsDot>
                      </Icon>
                      <Icon
                        color={
                          teamObject.formA.panel[2] ? "purple.600" : "grey"
                        }
                        fontSize={"3xl"}
                      >
                        <BsDot></BsDot>
                      </Icon>
                    </Box>
                    <Box width={"full"} textAlign={"center"}>
                      <Button
                        isDisabled={
                          teamObject.formA.panel.length === 3 ||
                          panelsSelected.includes(teamObject._id)
                            ? true
                            : false
                        }
                        ml={2}
                        variant={"solid"}
                        colorScheme="purple"
                        onClick={() => {
                          onOpen();
                          setTeamPanelSelected(teamObject._id);
                        }}
                        w={["40%", "30%", "20%", "15%"]}
                      >
                        Join Panel
                      </Button>
                    </Box>
                  </CardBody>
                </Card>
              ))}
            </>
          ) : (
            <Spinner></Spinner>
          )
        ) : (
          <>
            <Heading size={"md"} mt={5} textAlign={"center"}>
              You have completed panel selection. Please finalize the topics
              now.
            </Heading>
            <PanelMemberOf toast={toast} />
          </>
        )
      ) : (
        <>
          <Loading visibility={loading}></Loading>
        </>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent width="90vw">
          <ModalHeader>Confirm Panel</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to join this panel?</ModalBody>

          <ModalFooter>
            <Button
              onClick={() =>
                selectPanel(
                  teamPanelSelected,
                  setMinimumTeamsToSelect,
                  setPanelsSelected,
                  setSubmissions,
                  setLoading,
                  toast,
                  onClose
                )
              }
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
  );
}

export default SelectPanel;
