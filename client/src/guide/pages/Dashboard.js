import React from "react";
import GetStartedGuide from "./GetStartedGuide";
import gsimage from "../../assets/gSGuide.png";
import AppNav from "./../../components/AppNav";
function Dashboard() {
  return (
    <>
      <AppNav></AppNav>
      <GetStartedGuide
        heading={"You haven't been alloted a team yet"}
        image={gsimage}
        buttonText={["Go to Project Hub", "Contact Coordinator"]}
      ></GetStartedGuide>
    </>
  );
}

export default Dashboard;
