import axios from "axios";
import getPanelStatus from "./getPanelStatus";
import getFormAData from "./getFormAData";
export default async function selectPanel(
  teamPanelSelected,
  setMinimumTeamsToSelect,
  setNPanelSelected,
  setSubmissions,
  setLoading,
  toast,
  onClose
) {
  console.log(teamPanelSelected);
  try {
    setLoading(true);
    onClose();
    const response = await axios.post(
      "http://localhost:3001/guide/panel",
      {
        teamId: teamPanelSelected,
      },
      {
        withCredentials: true,
      }
    );
    console.log(response);

    await getPanelStatus(setMinimumTeamsToSelect, setNPanelSelected);
    await getFormAData(setSubmissions);
    setLoading(false);
    toast({
      title: "Added to panel!",
      description: response.data.message,
      status: "success",
      duration: 6000,
      isClosable: true,
    });
  } catch (error) {
    console.log(error);
  }
}
