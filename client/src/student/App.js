import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DefaultPage from "./pages/DefaultPage";
import Login from "../components/Login";
import logo from './../assets/student.png'
import gsimage from './../assets/gSStudent.png'

import FormA from "./pages/FormA";

import GetStartedStud from './pages/GetStartedStud';



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultPage></DefaultPage>}></Route>
        <Route path="/login" element={<Login role={'Student'} image={logo}></Login>}></Route>
        <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        <Route path="/getStarted" element={<GetStartedStud heading={'Your project has not been finalized yet'} image={gsimage} buttonText={['Go To Project Hub','Submit 3 ideas']}></GetStartedStud>}></Route>
        <Route path="/formA" element={<FormA></FormA>}></Route>
      </Routes>
    </>
  );
}
export default App;
