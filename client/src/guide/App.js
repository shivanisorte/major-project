import React from "react";
import { Routes, Route } from "react-router-dom";
import DefaultPage from "./pages/DefaultPage";
import Dashboard from "./pages/Dashboard";
import Login from "../components/Login";
import GetStarted from "../components/GetStarted";

import logo from './../assets/guide.png'
import gsimage from './../assets/gSGuide.png'

function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultPage></DefaultPage>}></Route>
      <Route path="/login" element={<Login role={'Guide'} image={logo}></Login>}></Route>
      <Route path="dashboard" element={<Dashboard></Dashboard>}></Route>
      <Route path="/getStarted" element={<GetStarted heading={"You haven't been alloted a team yet"} image={gsimage} buttonText={['Go to Project Hub','Contact Coordinator']}></GetStarted>}></Route>
      
    </Routes>
  );
}

export default App;
