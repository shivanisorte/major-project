import React, { useEffect } from "react";
import AppNav from "../../components/AppNav";
import GetStartedCoord from "./GetStartedCoord";
import gsimage from "../../assets/gSCoordinator.png";

function Dashboard() {
  useEffect(() => {
    //here we will check if student collection exist, and render the UI accordingly.
  }, []);
  return (
    <>
      <AppNav />
      <GetStartedCoord
        heading={"Upload data to get started."}
        image={gsimage}
        buttonText={["Upload Student Data", "Upload Guide Data"]}
      ></GetStartedCoord>
    </>
  );
}

export default Dashboard;
