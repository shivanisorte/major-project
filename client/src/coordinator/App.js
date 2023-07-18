import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DefaultPage from "./pages/DefaultPage";
import Login from "../components/Login";
import ProjectHub from "./pages/ProjectHub";

import logo from "./../assets/coordinator.png";
import Applications from "./pages/Applications";
import AllTeams from "./pages/AllTeams";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<DefaultPage></DefaultPage>}></Route>
        <Route
          path="/login"
          element={<Login role={"Coordinator"} image={logo}></Login>}
        ></Route>
        <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        <Route path="/projecthub" element={<ProjectHub></ProjectHub>}></Route>
        <Route
          path="/applications"
          element={<Applications></Applications>}
        ></Route>
        <Route path="/all-teams" element={<AllTeams></AllTeams>}></Route>
      </Routes>
    </div>
  );
}

export default App;
