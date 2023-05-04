import React, { useState } from "react";
import {
  Box,
  useColorModeValue,
  Flex,
  Image,
  Text,
  Icon,
} from "@chakra-ui/react";
import motionLogo from "../../../assets/motion.png";
import { AiOutlineTeam, AiOutlineHome } from 'react-icons/ai';
import { BsFolder2, BsCalendarCheck } from 'react-icons/bs';

const SidebarContent = ({ ...props }) => {
  const [activeNavItem, setActiveNavItem] = useState('');

  function handleNavItemClick(name) {
    setActiveNavItem(name);
  }

  const NavItem = (props) => {
    const color = useColorModeValue('gray.600', 'gray.300');
  
    const { icon, children } = props;
    return (
      <Flex
        align="center"
        px="4"
        py="3"
        cursor="pointer"
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        color={useColorModeValue('inherit', 'gray.400')}
        fontSize="lg"
        my={1}
        _hover={{
          bg: useColorModeValue('gray.100', 'gray.900'),
          color: useColorModeValue('gray.900', 'gray.200')
        }}
      >
        {icon && (
          <Icon
            mx="3"
            boxSize="5"
            _groupHover={{
              color: color
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    );
  };

  return (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg={useColorModeValue('white', 'gray.800')}
      borderColor={useColorModeValue('inherit', 'gray.700')}
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      <Flex px="4" py="5" align="center">
      <Image src={motionLogo} h={8} w={8} ml={3}/>
        <Text
          fontSize="3xl"
          ml="2"
          color={useColorModeValue('brand.500', 'white')}
          fontWeight="semibold"
        >
          Motion
        </Text>
      </Flex>
      <Flex direction="column" as="nav" fontSize="md" color="gray.700" aria-label="Main Navigation">
        <NavItem icon={AiOutlineHome} name="Dashboard" onClick={() => handleNavItemClick('Dashboard')} isActive={activeNavItem === 'Dashboard'}>Dashboard</NavItem>
        <NavItem icon={AiOutlineTeam} name="Team" onClick={() => handleNavItemClick('Team')} isActive={activeNavItem === 'Team'}>Team</NavItem>
        <NavItem icon={BsFolder2} name="Projects" onClick={() => handleNavItemClick('Projects')} isActive={activeNavItem === 'Projects'}>Projects</NavItem>
        <NavItem icon={BsCalendarCheck} name="Calendar" onClick={() => handleNavItemClick('Calendar')} isActive={activeNavItem === 'Calendar'}>Calendar</NavItem>
      </Flex>
    </Box>
  );
};

export default SidebarContent;
