import axios from "axios";
export default async function sendOtp(
  phno,
  role,
  setOtpSent,
  toast,
  setShowSpinner
) {
  try {
    setShowSpinner(true);
    const response = await axios.post(`http://localhost:3001/auth/send-otp`, {
      phno: phno,
      entity: role.toUpperCase(),
    });
    setShowSpinner(false);
    if (response.data.success === true) {
      setOtpSent(true);
      toast({
        title: "OTP Sent.",
        description: "We've sent the otp to your registered phone number.",
        status: "success",
        duration: 6000,
        isClosable: true,
      });
    } else {
      console.log(response.data.message);
      toast({
        title: "OTP not sent.",
        description: response.data.message,
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
  } catch (error) {
    setShowSpinner(false);
    if (error.response) {
      toast({
        title: "OTP not sent.",
        description: error.response.data.message,
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    } else if (error.request) {
      console.log(error.request);
      toast({
        title: "OTP not sent.",
        description: "Could not send the request. Please try again later.",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    } else {
      toast({
        title: "OTP not sent.",
        description: error.message,
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
    console.log("error config", error.config);
  }
}
