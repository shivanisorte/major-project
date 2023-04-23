import axios from "axios";
export default async function submitFormAApproval(
  teamId,
  nStudents,
  teamApproval,
  formA,
  setStudentApproval,
  setTeamApproval,
  toast
) {
  try {
    const response = await axios.post(
      "http://localhost:3001/student/formA/approve",
      { teamId, nStudents, formA },
      { withCredentials: true }
    );
    if (response.data.success === true) {
      toast({
        title: "FormA Approved!.",
        description:
          "You have approved FormA! Please ask rest of the team members to approve it.",
        status: "success",
        duration: 6000,
        isClosable: true,
      });
      setStudentApproval(true);
      setTeamApproval(teamApproval + 100 / nStudents);
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
