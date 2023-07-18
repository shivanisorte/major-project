import React from 'react'
import students from '../../sampleData/students'
import guides from '../../sampleData/guides'   
import teams from '../../sampleData/teams' 
import AppNav from './../../components/AppNav'
import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Grid,
    Input,
    useToast,
    Box,
    VStack,
    Heading,
    Button,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Checkbox,
    GridItem
  } from '@chakra-ui/react'

function DisplayTeamInfo() {

    const toast = useToast();

    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
    const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);


    const onScheduleModalOpen = () => setIsScheduleModalOpen(true);
    const onScheduleModalClose = () => setIsScheduleModalOpen(false);

    const onAttendanceModalOpen = () => setIsAttendanceModalOpen(true);
    const onAttendanceModalClose = () => setIsAttendanceModalOpen(false);

    const generateMeetingToast = () => {
        toast({
            title: "Meeting Scheduled",
            description: "Meeting has been scheduled",
            status: "success",
            duration: 9000,
            isClosable: true,
        })
        setIsScheduleModalOpen(false);
    }

    const generateAttendanceToast = () => {
        toast({
            title: "Attendance Marked",
            description: "Attendance has been marked",
            status: "success",
            duration: 9000,
            isClosable: true,
        })
        setIsAttendanceModalOpen(false);
    }

    return (
    <>
        <AppNav></AppNav>

        <Box
            p={6}
            mt={6}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignContent={"center"}
            alignItems={"center"}
            height={"100%"}

            fontFamily={'sans-serif'}
        >
            <VStack spacing={12}>
                <Heading as="h2" size="xl" fontFamily={'sans-serif'} >
                    Team 1: {teams[0].formA.data[0].title}
                </Heading>
            </VStack>   

            <Box
                p={6}
                mt={6}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignContent={"center"}
                alignItems={"center"}
                height={"100%"}
                fontFamily={'sans-serif'}
            >   
                <TableContainer>
                    <Table variant='simple' size={'lg'}>
                        <TableCaption>Team 1 Members</TableCaption>
                        <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Email</Th>
                            <Th isNumeric>Roll No.</Th>
                            <Th isNumeric>Enrollment No.</Th>
                            <Th isNumeric>Phone No.</Th>
                            <Th>GitHub Link</Th>
                        </Tr>
                        </Thead>
                        <Tbody>
                            {students.map((student, index) => (
                                <Tr
                                    key={index}
                                    _hover={{
                                        background: "gray.100",
                                        shadow: "md",
                                    }}
                                >
                                    <Td>{student.name}</Td>
                                    <Td>{student.email}</Td>
                                    <Td isNumeric>{student.rno}</Td>
                                    <Td isNumeric>{student.erno}</Td>
                                    <Td isNumeric>{student.phno.$numberLong}</Td>
                                    <Td 
                                        color={'blue.500'}
                                        _hover={{
                                            color: 'blue.600',
                                            textDecoration: 'underline',
                                        }}
                                    > <a href={student.github}>Link</a></Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>

            <Box
                p={6}
                mt={6}
                display="flex"
                flexDirection="row"
                justifyContent="space-around"
                alignContent={"center"}
                alignItems={"center"}
                fontFamily={'sans-serif'}
                width={'60%'}
            >
                <Button
                    _hover={{
                        shadow: 'lg',
                    }}
                    p={4}
                    borderRadius={8}

                    onClick={onScheduleModalOpen}
                >
                    Schedule Meeting
                </Button>

                <Button
                    _hover={{
                        shadow: 'lg',
                    }}
                    p={4}
                    borderRadius={8}

                    onClick={onAttendanceModalOpen}
                >
                    Add Meeting Attendance
                </Button>

                <Button
                    _hover={{
                        shadow: 'lg',
                    }}
                    p={4}
                    borderRadius={8}
                >
                    Check Progress
                </Button>
            </Box>

            <Modal
                isOpen={isScheduleModalOpen}
                onClose={onScheduleModalClose}
                size={'xl'}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Schedule Meeting</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Grid
                            p={6}
                            mt={6}
                            height={"100%"}
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"
                            alignItems={"center"}
                            fontFamily={'sans-serif'}
                            fontSize={'xl'}
                        >   
                            <GridItem>
                            <h1>
                                Set Meeting Date and Time:
                            </h1>
                            </GridItem>
                            
                            <GridItem>
                            <Input type="datetime-local" id="meeting-time"
                                name="meeting-time" value="2021-06-12T19:30"
                                min="2021-06-07T00:00" max="2021-06-14T00:00">
                            </Input>
                            </GridItem>

                            

                        </Grid>
                    </ModalBody>
                
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onScheduleModalClose}>
                            Close
                        </Button>
                        <Button 
                            variant="ghost"
                            onClick={generateMeetingToast}
                        >
                            Schedule</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal
                isOpen={isAttendanceModalOpen}
                onClose={onAttendanceModalClose}
                size={'xl'}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Members Attendance</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box
                            p={6}
                            mt={6}
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignContent={"center"}
                            alignItems={"center"}
                            fontFamily={'sans-serif'}
                        >
                            <TableContainer>
                                <Table variant='simple' size={'lg'}>
                                    <TableCaption>Team 1 Members</TableCaption>
                                    <Thead>
                                    <Tr>
                                        <Th>Name</Th>
                                        <Th>Present?</Th>
                                    </Tr>
                                    </Thead>
                                    <Tbody>
                                        {students.map((student, index) => (
                                            <Tr
                                                key={index}
                                                _hover={{
                                                    background: "gray.100",
                                                    shadow: "md",
                                                }}
                                            >
                                                <Td>{student.name}</Td>
                                                <Td
                                                    align='center'
                                                    alignContent={'center'}
                                                    alignItems={'center'}
                                                >
                                                    <Checkbox
                                                        size={'lg'}
                                                        colorScheme="green"
                                                        defaultIsChecked
                                                    />
                                                </Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </TableContainer>


                        </Box>
                    </ModalBody>
                
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onAttendanceModalClose}>
                            Close
                        </Button>
                        <Button 
                            variant="ghost"
                            onClick={generateAttendanceToast}
                        >
                            Save</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    </>
  )
}

export default DisplayTeamInfo