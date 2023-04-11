import AppNav from "../../components/AppNav";
import GetStartedStud from "../pages/GetStartedStud";
import gsimage from "../../assets/gSStudent.png";
import { useEffect, useState } from "react";
import { Spinner, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import getStudent from "../../utils/getStudent";

function Dashboard() {
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    getStudent(navigate, toast, setStudent);
  }, []);

  return (
    <>
      <AppNav></AppNav>
      {student ? (
        student.isTopicFinalised === true ? (
          "Hello student"
        ) : (
          <GetStartedStud
            heading={"Your project has not been finalized yet"}
            image={gsimage}
            buttonText={["Go To Project Hub", "Submit 3 ideas"]}
          ></GetStartedStud>
        )
      ) : (
        <Spinner />
      )}
    </>
  );
}
export default Dashboard;
