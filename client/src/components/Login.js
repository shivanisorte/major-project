import { useState } from "react";
import LandNav from "./LandNav";
import {
  Box,
  Heading,
  Text,
  VStack,
  Image,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Button,
  HStack,
  Flex,
  InputGroup,
  InputLeftAddon,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { TbPassword } from "react-icons/tb";
import sendOtp from "../utils/sendOtp";
import verifyOtp from "../utils/verifyOtp";
import { useNavigate } from "react-router-dom";

const Login = ({ role, image }) => {
  const [phno, setPhno] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const toast = useToast();

  const navigate = useNavigate();

  return (
    <div>
      <LandNav colors={["white", "black", "purple.600"]} />

      <HStack w="full" h="90vh">
        <Flex w="full" h="full" display={{ base: "none", md: "flex" }}>
          <Image objectFit={"cover"} h={"90%"} opacity="0.95" src={image} />
        </Flex>

        <Flex w="full" h="full" alignItems="flex-start" justifyContent="center">
          <Box
            w={["full", "md"]}
            p={[8, 10]}
            mt={[20, "10vh"]}
            mx="auto"
            border={["none", "1px solid #D6BCFA"]}
            boxShadow={"lg"}
            borderRadius={10}
          >
            <VStack spacing={4} w="full" align="flex-end">
              <VStack spacing={1} align={["flex-start", "center"]} w="full">
                <Heading>
                  Hi{" "}
                  <Text display="inline" color="purple.600">
                    {role}!
                  </Text>
                </Heading>
                <Text>Enter your phone number and OTP to login</Text>
              </VStack>

              <FormControl>
                <FormLabel> Phone number </FormLabel>
                <InputGroup>
                  <InputLeftAddon children="+91" />
                  <Input
                    value={phno}
                    onChange={(event) => setPhno(event.target.value)}
                    focusBorderColor="purple.600"
                    rounded="none"
                    variant="filled"
                    type="tel"
                    placeholder="Phone number"
                  />
                </InputGroup>
              </FormControl>
              {showSpinner ? (
                <Spinner color="purple.600"></Spinner>
              ) : (
                <Button
                  isDisabled={phno.length !== 10 || otpSent === true}
                  variant="link"
                  colorScheme="purple"
                  alignSelf={"end"}
                  onClick={() =>
                    sendOtp(phno, role, setOtpSent, toast, setShowSpinner)
                  }
                >
                  Send OTP
                </Button>
              )}

              <FormControl>
                <FormLabel> OTP </FormLabel>

                <InputGroup>
                  <InputLeftAddon children={<TbPassword />}></InputLeftAddon>
                  <Input
                    value={otp}
                    onChange={(event) => setOtp(event.target.value)}
                    focusBorderColor="purple.600"
                    rounded="none"
                    variant="filled"
                    placeholder="OTP"
                    type="password"
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                </InputGroup>
              </FormControl>

              <Checkbox colorScheme="purple">Remember me</Checkbox>

              <Button
                rounded="none"
                colorScheme="purple"
                w="full"
                alignSelf="end"
                onClick={() =>
                  verifyOtp(otp, phno, navigate, toast, setOtpSent)
                }
              >
                Login
              </Button>
            </VStack>
          </Box>
        </Flex>
      </HStack>
    </div>
  );
};

export default Login;
