import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DefaultPage from "./pages/DefaultPage";
import Login from "../components/Login";

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
      </Routes>
    </>
  );
}
export default App;
