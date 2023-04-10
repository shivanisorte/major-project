import axios from "axios";
const verifyOtp = async (otp, phno, navigate, toast, setOtpSent) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/auth/verify",
      {
        otp: otp,
        phno: phno,
      },
      {
        withCredentials: true,
      }
    );
    if (response.data.success === true) {
      navigate(`../dashboard`, { replace: true });
    }
  } catch (error) {
    if (error.response) {
      toast({
        title:
          error.response.data.status === "pending"
            ? "OTP verification pending"
            : "OTP verification cancelled.",
        description:
          error.response.data.status === "cancelled"
            ? "OTP verification is cancelled. Please try again."
            : error.response.data.status === "pending"
            ? "verify the otp again."
            : "Retry verification with new otp",
        status: error.response.data.status === "pending" ? "warning" : "error",
        duration: 6000,
        isClosable: true,
      });
      if (error.response.data.status === "cancelled") {
        setOtpSent(false);
      }
    } else if (error.request) {
      console.log(error.request);
      toast({
        title: "OTP could not be verified.",
        description: "Could not verify the the otp. Please try again later.",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    } else {
      toast({
        title: "OTP not verified. Try again later",
        description: error.message,
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
    console.log("error config", error.config);
  }
};
export default verifyOtp;
