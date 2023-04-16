import React from "react";
import GetStartedGuide from "./GetStartedGuide";
import gsimage from "../../assets/gSGuide.png";
import AppNav from "./../../components/AppNav";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner, useToast, Box } from "@chakra-ui/react";
import getGuide from "../../utils/getGuide";
function Dashboard() {
  const [guide, setGuide] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    getGuide(navigate, toast, setGuide);
  }, []);
  return (
    <>
      {guide ? (
        guide.team.length > 0 ? (
          <>
            <AppNav></AppNav>
            "Hello Guide"
          </>
        ) : (
          <>
            <AppNav></AppNav>
            <GetStartedGuide
              heading={"You haven't been alloted a team yet"}
              image={gsimage}
              buttonText={["Go to Project Hub", "Contact Coordinator"]}
            ></GetStartedGuide>
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
      )}
    </>
  );
}

export default Dashboard;
