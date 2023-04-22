import axios from "axios";
export default async function editFormA(
  teamId,
  setTeamApproval,
  setStudentApproval,
  toast
) {
  try {
    const response = await axios.post(
      "http://localhost:3001/student/formA/edit",
      { teamId: teamId },
      {
        withCredentials: true,
      }
    );
    console.log(response.data);
    if (response.data.success === true) {
      setTeamApproval(0);
      setStudentApproval(false);
    }
  } catch (error) {
    if (error.response) {
      toast({
        title: "FormA could not be submitted",
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
        title: "Could not submit formA.",
        description: error.message,
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
    console.log(error);
  }
}
