import axios from "axios";
import getFormAData from "./getFormAData";
export default async function getPanelStatus(
  setMinimumTeamsToSelect,
  setPanelsSelected,
  setSubmissions,
  setLoading
) {
  try {
    const response = await axios.get(
      "http://localhost:3001/guide/panel/status",
      {
        withCredentials: true,
      }
    );
    console.log(response);
    if (
      response.data.panelMemberOf.length < response.data.minimumTeamsToSelect
    ) {
      await getFormAData(setSubmissions);
    }
    setMinimumTeamsToSelect(response.data.minimumTeamsToSelect);
    setPanelsSelected(response.data.panelMemberOf);
    setLoading(false);
  } catch (error) {
    console.log(error);
  }
}
