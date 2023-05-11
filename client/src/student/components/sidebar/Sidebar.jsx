import {
  Box,
  Flex,
  Icon,
  Text,
  Drawer,
  DrawerContent,
  IconButton,
  useDisclosure,
  DrawerOverlay,
  useColorModeValue,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { IoMdSettings } from "react-icons/io";
import { BsFillPersonFill } from "react-icons/bs";
// Here we have used react-icons package for the icons
import { FaBell } from 'react-icons/fa';
import { AiOutlineHome } from 'react-icons/ai'; 
import { FiMenu } from 'react-icons/fi';
import SidebarContent from './SidebarContent';


const cards = [
  {
    id: 1,
    title: "Lines Deleted",
    subtitle: "Lines Deleted",
  },
  {
    id: 2,
    title: "Lines Added",
    subtitle: "Lines Added",
  },
  {
    id: 3,
    title: "Commits Made",
    subtitle: "Commits Made",
  },
  {
    id: 4,
    title: "Meeting Attended",
    subtitle: "Meeting Attended",
  },
];

const Card = ({ title, subtitle }) => {
  return (
    <Box
    bg={'white'}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      textAlign="center"
    >
      <IconButton icon={<AiOutlineHome />} aria-label="user" />
      <Text fontWeight="bold" mt={4}>
        {title}
      </Text>
      <Text color="gray.500" fontSize="sm">
        {subtitle}
      </Text>
    </Box>
  );
};

export default function Sidebar() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  
  

  return (
    <Box as="section" bg={useColorModeValue('gray.50', 'gray.700')} minH="100vh">
      <SidebarContent display={{ base: 'none', md: 'unset' }} />
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <Flex
          as="header"
          align="center"
          justify={{ base: 'space-between', md: 'flex-end' }}
          w="full"
          px="4"
          borderBottomWidth="1px"
          borderColor={useColorModeValue('inherit', 'gray.700')}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow="sm"
          h="14"
        >
          <IconButton
            aria-label="Menu"
            display={{ base: 'inline-flex', md: 'none' }}
            onClick={onOpen}
            icon={<FiMenu />}
            size="md"
          />

          <Flex align="center">
            <Icon color="gray.600" as={FaBell} cursor="pointer" boxSize={6} 
            _hover={{
              color: 'purple.600', 
            }}/>
            <Icon color="gray.600" ml="4" as={IoMdSettings} cursor="pointer" boxSize={6} 
            _hover={{
              color: 'purple.600', 
            }}/>
            <Icon color="gray.600" ml="4" as={BsFillPersonFill} cursor="pointer" boxSize={6} 
            _hover={{
              color: 'purple.600', 
            }}/>
          </Flex>

          
        </Flex>

        <Grid
      templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg:"repeat(4, 1fr)"}}
      gap={6}
      mt={4}
      mx={5}
    >
      {cards.map((card) => (
        <GridItem key={card.id}>
          <Card title={card.title} subtitle={card.subtitle} phone={card.phone} />
        </GridItem>
      ))}
    </Grid>

    <Flex direction={{ base: "column", md: "row" }} justifyContent="space-between" mt={8} mx={6}>
    <Box w={{ base: "100%", md: "67%" }} h="400px" bg="white" rounded="md" boxShadow="sm" p={4} borderWidth="1px" borderRadius="lg" shadow={'md'}>
      {/* Add content for graph one here */}
    </Box>
    <Box w={{ base: "100%", md: "30%" }} h="400px" bg="white" rounded="md" boxShadow="sm" p={4} mt={{ base: 8, md: 0 }} borderWidth="1px" borderRadius="lg" shadow={'md'}>
      {/* Add content for graph two here */}
    </Box>
  </Flex>

  
  <Flex direction={{ base: "column", md: "row" }} justifyContent="space-between" my={8} mx={6}>
      <Box w={{ base: "100%", md: "30%" }}  h="300px" bg="white" rounded="md" boxShadow="sm" p={4} borderWidth="1px" borderRadius="lg" shadow={'md'}></Box>
      <Box w={{ base: "100%", md: "30%" }}  h="300px" bg="white" rounded="md" boxShadow="sm" p={4} mt={{ base: 8, md: 0 }} borderWidth="1px" borderRadius="lg" shadow={'md'}></Box>
      <Box w={{ base: "100%", md: "30%" }}  h="300px" bg="white" rounded="md" boxShadow="sm" p={4} mt={{ base: 8, md: 0 }} borderWidth="1px" borderRadius="lg" shadow={'md'}></Box>
    </Flex>


    <Flex direction={{ base: "column", md: "row" }} justifyContent="space-between" mt={8} mx={6}>
    <Box w={{ base: "100%", md: "49%" }} h="400px" bg="white" rounded="md" boxShadow="sm" p={4} borderWidth="1px" borderRadius="lg" shadow={'md'}>
      {/* Add content for graph one here */}
    </Box>
    <Box w={{ base: "100%", md: "49%" }} h="400px" bg="white" rounded="md" boxShadow="sm" p={4} mt={{ base: 8, md: 0 }}  mb={10} borderWidth="1px" borderRadius="lg" shadow={'md'}>
      {/* Add content for graph two here */}
    </Box>
  </Flex>

  

        
      </Box>
    </Box>
  );
}

