import "./App.css";
import { Routes, Route } from "react-router-dom";
import StudentApp from "./student/App";
import LandingPage from "./LandingPage";
import GuideApp from "./guide/App";
import CoordinatorApp from "./coordinator/App";

import TeamProgress from "./student/pages/TeamProgress";

import AboutApp from "./components/AboutApp"


function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage></LandingPage>}></Route>

      <Route path="/progress" element={<TeamProgress/>}></Route>

      <Route path="/about" element={<AboutApp></AboutApp>}></Route>

      <Route path="/student/*" element={<StudentApp></StudentApp>}></Route>
      <Route path="/guide/*" element={<GuideApp></GuideApp>}></Route>
      <Route
        path="/coordinator/*"
        element={<CoordinatorApp></CoordinatorApp>}
      ></Route>
    </Routes>
  );
}

export default App;
