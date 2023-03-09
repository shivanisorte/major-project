import "./App.css";
import { Routes, Route } from "react-router-dom";
import StudentApp from "./student/App";
import LandingPage from "./LandingPage";
import StudentDashboard from "./student/pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage></LandingPage>}></Route>
      <Route path="/student/*" element={<StudentApp></StudentApp>}></Route>
    </Routes>
  );
}

export default App;
