import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DefaultPage from "./pages/DefaultPage";
import Login from "../components/Login";

import logo from './../assets/coordinator.png'
import GetStarted from "../components/GetStarted";
import gsimage from './../assets/gSCoordinator.png'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<DefaultPage></DefaultPage>}></Route>
        <Route path="/login" element={<Login role={'Coordinator'} image={logo}></Login>}></Route>
        <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        <Route path="/getStarted" element={<GetStarted heading={'Upload data to get started.'} image={gsimage} buttonText={['Upload Student Data','Upload Guide Data']}></GetStarted>}></Route>
      </Routes>
    </div>
  );
}

export default App;
