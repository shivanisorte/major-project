import React, { useState } from "react";
import AppNav from "../../components/AppNav";
import { Box, Heading, Input, Button, VStack, Grid, GridItem, IconButton, useToast } from "@chakra-ui/react";
import { CloseIcon, AddIcon } from "@chakra-ui/icons";

function TeamProgress () {

    const toast = useToast();

    const [sprints, setSprints] = useState([
        { number: 1, tasks: [{name: "Task 1"}] },
        { number: 2, tasks: [{name: "Task 2"}] },
    ]);

    const handleAddSprint = () => {
    const newSprint = { number: sprints.length + 1, tasks: [] };
    setSprints([...sprints, newSprint]);
    };

    const handleAddTask = (sprintIndex) => {
    const newTask = { name: `Task ${sprints[sprintIndex].tasks.length + 1}` };
    const newSprints = [...sprints];
    newSprints[sprintIndex].tasks.push(newTask);
    setSprints(newSprints);
    };

    const handleCreatePlan = () => {
    console.log(sprints); // or save the data to a database or send it to the server
    };

    const handleRemoveSprint = (sprintIndex) => {
        setSprints(prevSprints => {
            const newSprints = [...prevSprints];
            newSprints.splice(sprintIndex, 1);
            return newSprints;
        });
    };
    
    const handleRemoveTask = (sprintIndex, taskId) => {
        setSprints(prevSprints => {
            const newSprints = [...prevSprints];
            const taskIndex = newSprints[sprintIndex].tasks.findIndex(task => task.id === taskId);
            newSprints[sprintIndex].tasks.splice(taskIndex, 1);
            return newSprints;
        });
    };

    const handleToast = () => {
        toast({
            title: "Project Plan Created.",
            description: "Your project plan has been created.",
            status: "success",
            duration: 9000,
            isClosable: true,
        })
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
            height={"86vh"}
        >
            <VStack spacing={12}>
                <Heading as="h2" size="2xl" fontFamily={'sans-serif'} >
                    Create a Project Plan
                </Heading>
            </VStack>

            <Box 
                gap={6}
                mt={6}
                width={"100%"}
                height={"100%"}
                display={"flex"}
                flexDirection="column"
                alignItems={"center"}
                padding={6}
                overflowY={"auto"}
                >
            {sprints && sprints.map((sprint, sprintIndex) => (
                <Grid
                    key={sprint.number}
                    
                    width={"80%"}
                    height={"100%"}
                    display={"flex"}
                    flexDirection={"column"}
                    marginLeft={16}
                    marginRight={16}
                    fontFamily={"sans-serif"}
                    padding={6}
                    borderRadius={"md"}
                    border={"1px solid #CBD5E0"}
                    boxShadow={"md"}
                >   
                    <GridItem 
                        fontSize={['md','md','lg','xl']}
                        fontWeight="bold"
                        display={"flex"}
                        flexDirection={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                    >
                        SPRINT {sprint.number}

                        {sprints.length > 1 && (
                            <IconButton
                                colorScheme="black"
                                backgroundColor={"#BACDDB"}
                                shadow={"lg"}
                                aria-label="Remove Sprint"
                                size="md"
                                icon={<CloseIcon />}
                                onClick={() => handleRemoveSprint(sprintIndex)}
                            />
                        )}
                    </GridItem>
                    <GridItem
                        alignItems={"center"}
                        display={"flex"}
                        flexDirection={"column"}
                    >
                        
                        {sprint.tasks.map((task, taskIndex) => (
                            <GridItem
                                pl={14}
                                width={"100%"}
                                display={"flex"}
                                flexDirection={"row"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                fontWeight={"normal"}
                                borderRadius={"sm"}
                            >   
                            
                                <Input
                                    mt={3}
                                    variant={"filled"}
                                    backgroundColor={"#F1F6F9"}
                                    border={"1px solid #CBD5E0"}
                                    key={task.name}
                                    width={"60%"}
                                    size={"md"}
                                    defaultValue={`Task ${taskIndex + 1}  `}
                                    textAlign={"center"}
                                    mr={2}
                                />
                                <IconButton
                                    mt={3}
                                    aria-label="Remove Task"
                                    size="md"
                                    icon={<CloseIcon color={"red"} />}
                                    border={"1px solid #BACDDB"}
                                    onClick={() => handleRemoveTask(sprintIndex, taskIndex)}
                                />
                            </GridItem>
                        ))}

                        <Button
                            mt={6}
                            colorScheme="purple"
                            backgroundColor={"#AA77FF"}
                            color={"white"}
                            size="md"
                            onClick={() => handleAddTask(sprintIndex)}
                            width={"6%"}
                            borderRadius={"md"}
                            border={"1px solid #BACDDB"}
                            boxShadow={"lg"}
                        >
                            <AddIcon/>
                        </Button>
                    </GridItem>
                    
                    
                </Grid>
            ))}


            {/* Add New Sprint Button */}
            <Box
                mt={6}
                width={"md"}
                height={"25rem"}
                display={"flex"}
                flexDirection="row"
                justifyContent={"space-around"}
                alignItems={"center"}
                fontFamily={"sans-serif"}
            >
                <Button
                    colorScheme="purple"
                    backgroundColor={"#AA77FF"}
                    color={"white"}
                    size="md"
                    onClick={() => handleAddSprint(0)}
                >   
                    Add New Sprint
                </Button>

                <Button
                    colorScheme="purple"
                    backgroundColor={"#AA77FF"}
                    color={"white"}
                    size="md"
                    onClick={handleToast}
                >
                    Submit
                </Button>
            </Box>
            </Box>

            
        </Box>
    </>
  );
}

export default TeamProgress;
