import React from 'react'
import LandNav from './LandNav'
import logo from './../assets/coordinator.png'
import { Box, Heading, Text, VStack, Image, FormControl, FormLabel, Input, Checkbox, Button, HStack, Flex } from '@chakra-ui/react'

const Login = () => {
  return (
    <div>
        <LandNav colors={['white','black', 'purple.600']}/>

        <HStack w='full' h='90vh'>
            <Flex w='full' h='full'
            display={{base:'none', md:'flex'}}>
                <Image
                objectFit={'cover'}
                // w='full'
                h='90%'
                opacity='0.95'
                src={logo}
                />
            </Flex>

            <Flex w='full' h='full' alignItems='flex-start' justifyContent='center'>
            <Box
        w={['full','md']}
        p={[8,10]}
        mt={[20,'10vh']}
        mx='auto'
        border={['none','1px']}
        borderColor={['','gray.300']}
        borderRadius={10}
        >
            <VStack spacing={4} w='full' align='flex-end'>
                <VStack spacing={1} align={['flex-start','center']} w='full'>
                    <Heading>Hi <Text display='inline' color='purple.600'>Student!</Text></Heading>
                    <Text>Enter your phone number and OTP to login</Text>
                </VStack>

                <FormControl>
                    <FormLabel> Phone number </FormLabel>
                    <Input focusBorderColor='purple.600' rounded='none' variant='filled' type='tel' placeholder='Phone number'/>
                </FormControl>
                <Button variant='link' colorScheme='purple' alignSelf={'end'}>
                        Send OTP
                </Button>

                <FormControl>
                    <FormLabel> OTP </FormLabel>
                    <Input focusBorderColor='purple.600' rounded='none' variant='filled' placeholder='OTP'/>
                </FormControl>

                <Checkbox colorScheme='purple'>Remember me</Checkbox>
                

                <Button rounded='none' colorScheme='purple' w='full' alignSelf='end'>
                    Login
                </Button>

                
            </VStack>

        </Box>
            

            </Flex>
        </HStack>


    </div>

  )
}

export default Login