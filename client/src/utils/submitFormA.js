import axios from "axios";
export default async function submitFormA(teamId, setTeamSubmission, toast) {
  try {
    const response = await axios.post(
      "http://localhost:3001/student/formA/submit",
      { teamId: teamId },
      {
        withCredentials: true,
      }
    );
    if (response.data.success === true) {
      toast({
        title: "FormA Submitted!.",
        description: "You have submitted FormA!",
        status: "success",
        duration: 6000,
        isClosable: true,
      });
      setTeamSubmission(true);
    }
  } catch (error) {
    if (error.response) {
      toast({
        title: "FormA could not be approved",
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
        title: "Could not approve formA.",
        description: error.message,
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
    console.log(error);
  }
}
