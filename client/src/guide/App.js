import React from "react";
import { Routes, Route } from "react-router-dom";
import DefaultPage from "./pages/DefaultPage";
import Dashboard from "./pages/Dashboard";
function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultPage></DefaultPage>}></Route>
      <Route path="dashboard" element={<Dashboard></Dashboard>}></Route>
    </Routes>
  );
}

export default App;
