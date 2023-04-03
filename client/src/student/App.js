import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DefaultPage from "./pages/DefaultPage";
import Login from "../components/Login";
import GetStarted from "../components/GetStarted";

import logo from './../assets/student.png'
import gsimage from './../assets/gSStudent.png'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultPage></DefaultPage>}></Route>
        <Route path="/login" element={<Login role={'Student'} image={logo}></Login>}></Route>
        <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        <Route path="/getStarted" element={<GetStarted heading={'Your project has not been finalized yet'} image={gsimage} buttonText={['Go To Project Hub','Submit 3 ideas']}></GetStarted>}></Route>
        
      </Routes>
    </>
  );
}
export default App;
