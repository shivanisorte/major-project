import React from "react";
import { Routes, Route } from "react-router-dom";
import DefaultPage from "./pages/DefaultPage";
import Dashboard from "./pages/Dashboard";
import Login from "../components/Login";
import logo from "./../assets/guide.png";
import ProjectHub from "./pages/ProjectHub";
import SelectPanel from "./pages/SelectPanel";
import SelectTeam from "./pages/SelectTeam";
import Applications from "./pages/Applications";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultPage></DefaultPage>}></Route>
      <Route
        path="/login"
        element={<Login role={"Guide"} image={logo}></Login>}
      ></Route>
      <Route path="dashboard" element={<Dashboard></Dashboard>}></Route>
      <Route path="/projecthub" element={<ProjectHub></ProjectHub>}></Route>
      <Route path="/select-panel" element={<SelectPanel></SelectPanel>}></Route>
      <Route path="/select-team" element={<SelectTeam></SelectTeam>}></Route>
      <Route
        path="/applications"
        element={<Applications></Applications>}
      ></Route>
    </Routes>
  );
}

export default App;
