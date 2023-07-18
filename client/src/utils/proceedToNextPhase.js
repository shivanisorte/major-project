import axios from "axios";
export default async function proceedToNextPhase(toast, setCurrentPhase) {
  try {
    const response = await axios.post(
      "http://localhost:3001/coordinator/next-phase",
      {},
      { withCredentials: true }
    );
    if (response.data.success === true) {
      setCurrentPhase(response.data.nextPhase);
    }
  } catch (error) {
    if (error.response) {
      toast({
        title: "Could not proceed",
        description: error.response.data.message,
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    } else if (error.request) {
      console.log(error.request);
      toast({
        title: "An error occured",
        description: "Could not send the request. Please try again later.",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Could not proceed to next phase",
        description: error.message,
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
    console.log(error);
  }
}
