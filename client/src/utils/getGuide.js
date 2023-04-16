import axios from "axios";
export default async function getStudent(navigate, toast, setGuide) {
  try {
    const response = await axios.get("http://localhost:3001/guide", {
      withCredentials: true,
    });
    if (response.data.success === true) {
      console.log(response.data.student);
      setGuide(response.data.guide);
    }
  } catch (error) {
    navigate("../login", { replace: true });
    if (error.response) {
      toast({
        title: "Login again",
        description: "Please login again.",
        status: "warning",
        duration: 6000,
        isClosable: true,
      });
    } else if (error.request) {
      toast({
        title: "Internal Server Error",
        description: "Please login again.",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
      console.log(error.request);
    } else {
      toast({
        title: "Check your internet connection",
        description: "Please check your internet connection and login again.",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }

    console.log(error);
  }
}
