import AppNav from "../../components/AppNav";
import GetStartedCoord from "./GetStartedCoord";
import gsimage from "../../assets/gSCoordinator.png";
import { useEffect, useState } from "react";
import { Spinner, useToast, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import getCoordinator from "../../utils/getCoordinator";

function Dashboard() {
  const [coordinator, setCoordinator] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();
  useEffect(() => {
    //here we will check if student collection exist, and render the UI accordingly.
    getCoordinator(navigate, toast, setCoordinator);
  }, []);
  return coordinator ? (
    coordinator.isStudSubmitted && coordinator.isGuideSubmitted === true ? (
      <>
        <AppNav />
        "Hello Coordinator"
      </>
    ) : (
      <>
        <AppNav />
        <GetStartedCoord
          heading={"Upload data to get started."}
          image={gsimage}
          buttonText={["Upload Student Data", "Upload Guide Data"]}
          isGuideSubmitted={coordinator.isGuideSubmitted}
          isStudSubmitted={coordinator.isStudSubmitted}
        ></GetStartedCoord>
      </>
    )
  ) : (
    <Box
      height={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Spinner size={"lg"} color="purple.600" />{" "}
    </Box>
  );
}

export default Dashboard;
