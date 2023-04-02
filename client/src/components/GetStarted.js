import React from 'react'
import AppNav from './AppNav'
import img from './../assets/gSCoordinator.png'
import { Box, Flex, Heading,Image,Button,Stack} from "@chakra-ui/react";
import { BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";
  

const GetStarted = () => {

  return (
    <div>
        <AppNav/>
        <Flex
      minH="90vh"
      justify="center"
      direction="column"
      
    >
      <Box maxW="lg" mx="auto" textAlign="center">
        <Heading fontSize={{ base: "3xl", md: "3xl", lg: "4xl" }}>
          Upload data to get started.
        </Heading>
        <Image src={img} alt="get started coordinator img" my={4} ml={4} />
       

        <Stack direction={["column", "column", "row", "row"]} spacing={"20px"}>
          {" "}
          <Link to="/student">
            <Button
              width="2xs"
              rightIcon={<BiChevronRight />}
              colorScheme="purple"
              fontSize={["l", "l", "xl", "xl"]}
            >
              Upload Student Data
            </Button>
          </Link>
          <Link to="/guide">
            <Button
              width="2xs"
              rightIcon={<BiChevronRight />}
              colorScheme="purple"
              fontSize={["l", "l", "xl", "xl"]}
            >
              Upload Guide Data
            </Button>
          </Link>
          
        </Stack>
       

      </Box>
    </Flex>


    </div>
  )
}

export default GetStarted