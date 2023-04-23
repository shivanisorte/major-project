import axios from "axios";
const addProject = async (projectData, toast, setProjects ) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/projectHub",

      projectData,
      {
        withCredentials: true,
      }
      
    );
    if (response.data.success === true) {
      setProjects(projects=>
        [...projects, projectData]
      );
      toast({
        title: "Successfully added",
        description: response.data.message,
        status: "success",
        duration: 6000,
        isClosable: true,
      });
    }
  } catch (error) {
    if (error.response) {
      toast({
        title:
          error.response.data.status === "pending"
            ? "Project Data upload pending"
            : "Project Data upload cancelled.",
        description:
          error.response.data.status === "cancelled"
            ? "Project Data upload is cancelled. Please try again."
            : error.response.data.status === "pending"
            ? "Upload Project Data again."
            : "Retry Project Data upload",
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
        title: "Project Data couldn't be uploaded.",
        description:
          "Could not upload the the Project Data. Please try again later.",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Project Data not uploaded. Try again later",
        description: error.message,
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
    console.log("error config", error.config);
  }
};
export default addProject;
