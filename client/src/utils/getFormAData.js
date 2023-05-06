import axios from "axios";
export default async function getFormAData(setSubmissions) {
  try {
    const response = await axios.get("http://localhost:3001/student/formA", {
      withCredentials: true,
    });
    if (response.data.success === true) {
      setSubmissions(response.data.formA);
    }
  } catch (error) {
    console.log(error);
  }
}
