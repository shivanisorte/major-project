import axios from "axios";
const uploadGuideCsv = async (guideSelectedFile, toast, setIsLoading) => {
  try {
    const formData = new FormData();
    formData.append("guides", guideSelectedFile);
    setIsLoading(true);
    const response = await axios.post(
      "http://localhost:3001/coordinator/uploadguides",

      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
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
            ? "Guide Data upload pending"
            : "Guide Data upload cancelled.",
        description:
          error.response.data.status === "cancelled"
            ? "Guide Data upload is cancelled. Please try again."
            : error.response.data.status === "pending"
            ? "Upload Guide Data again."
            : "Retry Guide Data upload",
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
        title: "Guide Data couldn't be uploaded.",
        description:
          "Could not upload the the Guide Data. Please try again later.",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Guide Data not uploaded. Try again later",
        description: error.message,
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
    console.log("error config", error.config);
  }
};
export default uploadGuideCsv;
