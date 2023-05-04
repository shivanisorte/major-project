import axios from "axios";
export default async function getFormAStatus(
  setTeamApproval,
  setTeamId,
  setNStudents,
  setStudentApproval,
  setProjects,
  setTeamSubmission
) {
  try {
    const response = await axios.get(
      "http://localhost:3001/student/formA/form-a-status",
      {
        withCredentials: true,
      }
    );
    console.log(response.data);
    setTeamApproval(response.data.teamApproval);
    setTeamId(response.data.teamId);
    setNStudents(response.data.nStudents);
    setStudentApproval(response.data.studentApproval);
    setTeamSubmission(response.data.teamSubmission);
    if (response.data.formA.data.length !== 0) {
      setProjects(response.data.formA.data);
    }
  } catch (error) {
    console.log(error);
  }
}
