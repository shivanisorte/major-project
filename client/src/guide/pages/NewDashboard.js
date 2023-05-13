import React from "react";
import AppNav from "./../../components/AppNav";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner, useToast, Box, VStack, Heading, Grid, GridItem } from "@chakra-ui/react";
import DisplayTeams from "./DisplayTeamInfo";
import studets from '../../sampleData/students'
import guides from '../../sampleData/guides'   
import teams from '../../sampleData/teams' 


function NewDashboard() {

    const navigate = useNavigate();
    const toast = useToast();

    const handleTeamClick = () => {
        navigate("/guide-dash/team-info");
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
            height={"100%"}
        >
            <VStack spacing={12}>
                <Heading as="h2" size="xl" fontFamily={'sans-serif'} >
                    Hello Guide, Here are your teams
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
                {teams.map((team, index) => (
                    <Grid   
                        gap={6}
                        mt={6}
                        p={4}
                        display="flex"
                        flexDirection="row"
                        justifyContent="space-between"
                        alignContent={"center"}
                        height={"100%"}
                        width={"45%"}
                        onClick={handleTeamClick}
                        cursor="pointer"

                        boxShadow="md"
                        borderRadius="md"

                        backgroundColor={index%2==0 ? "gray.100" : "gray.200"}
                    >
                        <GridItem
                            fontWeight="bold"
                            size="md"
                            fontSize={20}
                        >
                            Team {index+1}
                        </GridItem>
                        <GridItem
                            fontWeight="bold"
                            fontSize={20}
                            size="large"
                        >
                            {team.formA.data[0].title}
                        </GridItem>
                    </Grid>
                ))}
                


            </Box>
        </Box>

        
      
    </>
  );
}

export default NewDashboard;
