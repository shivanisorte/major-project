import { Box, Heading, VStack , Text, HStack, Button, Center} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {BiChevronRight} from 'react-icons/bi'
import {Link} from 'react-router-dom'


const Hero = () => {

    const [valueIndex, setValueIndex] = useState(0);
    const [text, setText] = useState("developers");
    const values = ["developers", "admins", "students", "managers", "engineers", "mentors", "coders", "guides", "coordinators"]

    useEffect(() => {
        const interval = setInterval(() => {
          setValueIndex((prevIndex) => {
            if (prevIndex === values.length - 1) {
              return 0;
            } else {
              return prevIndex + 1;
            }
          });
        }, 2500);
        setText(values[valueIndex]);
        return () => clearInterval(interval);
      }, [valueIndex, values]);


  return (
    <Center bg='black' minH={'90vh'} flex>
        <VStack color='white' textAlign='center' spacing='10'>
            <Heading as='h1' fontSize={['3xl','3xl','7xl', '7xl']}
            maxW={{base:'lg', md:'xl', lg:'2xl'}}
            >
                The perfect project management tool for {' '}
                <Box 
                as='span'
                bgGradient='linear-gradient(135deg,#0b6ec5,#5e49af,#f35815,#fed54a)'
                bgClip='text'
                >
                    {text}
                </Box>
            </Heading>
            <Text color='whiteAlpha.600' fontSize={['l','l','3xl', '3xl']}>The only project management application in the world that tracks progress through GitHub commits.
            </Text>
            <HStack spacing='6' display={['none', 'none','block', 'block']}>
            <Link to='/student'>
                <Button width='2xs' rightIcon={<BiChevronRight/>} colorScheme='purple' fontSize={['l','l','2xl', '2xl']}>Student</Button>
              </Link>
              <Link to='/guide'>
                <Button width='2xs' rightIcon={<BiChevronRight/>} colorScheme='purple' fontSize={['l','l','2xl', '2xl']}>Guide</Button>
              </Link>
              <Link to='/coordinator'>
                <Button width='2xs' rightIcon={<BiChevronRight/>} colorScheme='purple' fontSize={['l','l','2xl', '2xl']}>Coordinator</Button>
              </Link>
            </HStack>
            <VStack spacing='6' display={['block', 'block','none', 'none']}>
              <Link to='/student'>
                <Button width='3xs' display={'block'} rightIcon={<BiChevronRight/>} colorScheme='purple' fontSize={['l','l','2xl', '2xl']}>Student</Button>
              </Link>
              <Link to='/guide'>
                <Button width='3xs' display={'block'} rightIcon={<BiChevronRight/>} colorScheme='purple' fontSize={['l','l','2xl', '2xl']}>Guide</Button>
              </Link>
              <Link to='/coordinator'>
                <Button width='3xs' display={'block'} rightIcon={<BiChevronRight/>} colorScheme='purple' fontSize={['l','l','2xl', '2xl']}>Coordinator</Button>
              </Link>

            </VStack>
        </VStack>

    </Center>
  )
}

export default Hero