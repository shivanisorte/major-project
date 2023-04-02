import React from "react";
import { Routes, Route } from "react-router-dom";
import DefaultPage from "./pages/DefaultPage";
import Dashboard from "./pages/Dashboard";
import Login from "../components/Login";

import logo from './../assets/guide.png'

function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultPage></DefaultPage>}></Route>
      <Route path="/login" element={<Login role={'Guide'} image={logo}></Login>}></Route>
      <Route path="dashboard" element={<Dashboard></Dashboard>}></Route>
    </Routes>
  );
}

export default App;
