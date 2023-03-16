import {
  Flex,
  Avatar,
  Icon,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import Logo from "./Logo";
import { IoMdSettings, IoIosNotifications } from "react-icons/io";
import { HamburgerIcon } from "@chakra-ui/icons";
import { BsFillPersonFill } from "react-icons/bs";
function AppNav({ category }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {" "}
      <Flex
        justify={"space-between"}
        bg="brand.blue2"
        w="100%"
        p={3}
        color="white"
        align={"center"}
      >
        <Logo category={category}></Logo>

        <Flex
          display={["none", "none", "flex", "flex"]}
          align={"center"}
          gap={2}
        >
          {" "}
          <IconButton
            colorScheme="none"
            boxSize={6}
            as={BsFillPersonFill}
          ></IconButton>
          <IconButton
            colorScheme="none"
            boxSize={6}
            as={IoMdSettings}
          ></IconButton>
          <IconButton
            colorScheme="none"
            boxSize={6}
            as={IoIosNotifications}
          ></IconButton>
        </Flex>
        <IconButton
          aria-label="Open menu"
          size={"lg"}
          icon={<HamburgerIcon></HamburgerIcon>}
          display={["flex", "flex", "none", "none"]}
          colorScheme="none"
          onClick={onOpen}
        ></IconButton>
      </Flex>
      <Modal
        display={["block", "block", "none", "none"]}
        size={"xs"}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Motion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <List spacing={3} textAlign={"left"}>
              <ListItem cursor={"pointer"}>
                <ListIcon as={BsFillPersonFill} />
                Profile
              </ListItem>
              <ListItem cursor={"pointer"}>
                <ListIcon as={IoIosNotifications}></ListIcon>
                Notification
              </ListItem>
              <ListItem cursor={"pointer"}>
                <ListIcon as={IoMdSettings}></ListIcon>Settings
              </ListItem>
            </List>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
export default AppNav;
