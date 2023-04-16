import axios from "axios";
const uploadStudentCsv = async (studentSelectedFile, toast, setIsLoading) => {
  try {
    const formData = new FormData();
    formData.append("students", studentSelectedFile);

    setIsLoading(true);
    const response = await axios.post(
      "http://localhost:3001/coordinator/uploadStudents",

      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          //   'Cookie': cookie,
        },
        withCredentials: true,
      }
    );
    setIsLoading(false);
    if (response.data.success === true) {
      toast({
        title: "Successfully added",
        description: response.data.message,
        status: "success",
        duration: 6000,
        isClosable: true,
      });
    }
  } catch (error) {
    setIsLoading(false);
    if (error.response) {
      toast({
        title:
          error.response.data.status === "pending"
            ? "Student Data upload pending"
            : "Student Data upload cancelled.",
        description:
          error.response.data.status === "cancelled"
            ? "Student Data upload is cancelled. Please try again."
            : error.response.data.status === "pending"
            ? "Upload Student Data again."
            : "Retry Student Data upload",
        status: error.response.data.status === "pending" ? "warning" : "error",
        duration: 6000,
        isClosable: true,
      });
      if (error.response.data.status === "cancelled") {
        //if the process is completely cancelled.
      }
    } else if (error.request) {
      console.log(error.request);
      toast({
        title: "Student Data couldn't be uploaded.",
        description:
          "Could not upload the the Student Data. Please try again later.",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Student Data not uploaded. Try again later",
        description: error.message,
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
    console.log("error config", error.config);
  }
};
export default uploadStudentCsv;
