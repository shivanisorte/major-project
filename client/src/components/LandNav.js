import React from 'react'

import {Box, HStack, Link, Flex, Button, Image} from '@chakra-ui/react'

const LandNav = () => {
  return (
    <Box as='nav' bg="black" color='white' minH={'10vh'} paddingTop='1rem' >
      <Box>

        <HStack spacing='10'>
          <Flex justify='space-between' flex='1'>
            <HStack  fontSize={['xl','xl','4xl', '4xl']}>
            {/* <Box maxW="250px" maxH="250px" marginY='-80px'>
            <Image src={'https://o.remove.bg/downloads/621ce993-84b1-4091-bf90-ce3187ea9e2c/motion__1_-removebg-preview.png'} alt="Motion"/>
            </Box> */}
              <Link 
              marginLeft='30px'
              fontWeight='bold'
              _hover={{
                color: 'orange.600', 
              }}
              to="/">
                Motion
              </Link>
            </HStack>

            <HStack  fontSize={['l','l','2xl', '2xl']} spacing={8} marginRight='30px' >
              <Link
              fontWeight='bold'
              _hover={{
                color: 'orange.600', 
              }}>
                About App
              </Link>
              <Button 
              variant='outline' 
              fontSize={['l','l','2xl', '2xl']}
              fontWeight='bold'
              borderColor='orange.600'
              _hover={{
                background:'transparent',
                borderColor:'white',
              }}
              >Get in touch</Button>
            </HStack>


          </Flex>

        </HStack>

      </Box>
      
    </Box>
  )
}

export default LandNav