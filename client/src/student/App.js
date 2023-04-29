import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DefaultPage from "./pages/DefaultPage";
import Login from "../components/Login";
import ProjectHub from "./pages/ProjectHub";
import SubmitRepo from "./pages/SubmitRepo";

import logo from "./../assets/student.png";

import FormA from "./pages/FormA";



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultPage></DefaultPage>}></Route>
        <Route
          path="/login"
          element={<Login role={"Student"} image={logo}></Login>}
        ></Route>
        <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        <Route path="/formA" element={<FormA></FormA>}></Route>
        <Route path="/projecthub" element={<ProjectHub></ProjectHub>}></Route>
        <Route path="/submitrepo" element={<SubmitRepo></SubmitRepo>}></Route>
      </Routes>
    </>
  );
}
export default App;
