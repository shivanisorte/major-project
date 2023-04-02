import React from 'react'
import AppNav from './AppNav'
import { Box, Flex, Heading,Image,Button,Stack} from "@chakra-ui/react";
import { BiChevronRight } from "react-icons/bi";
  

const GetStarted = ({ image,buttonText, heading }) => {

  return (
    <div>
        <AppNav/>
       
        <Flex
      minH="90vh"
      justify="center"
      direction="column"
      

    >
      <Box maxW="lg" mx="auto" textAlign="center">
        <Heading fontSize={{ base: "3xl", md: "3xl", lg: "3xl" }}>
          {heading}
        </Heading>
        <Image src={image} alt="get started coordinator img" my={3} ml={4} />
       

        <Stack direction={["column", "row", "row", "row"]} spacing={"20px"} align={'center'}>
          {" "}
  
  
            <Button
              width="2xs"
              rightIcon={<BiChevronRight />}
              colorScheme="purple"
              fontSize={["l", "l", "xl", "xl"]}
            >
              {buttonText[0]}
            </Button>

            <Button
              width="2xs"
              rightIcon={<BiChevronRight />}
              colorScheme="purple"
              fontSize={["l", "l", "xl", "xl"]}
            >
              {buttonText[1]}
            </Button>
            
          
        </Stack>
       

      </Box>
    </Flex>


    </div>
  )
}

export default GetStarted