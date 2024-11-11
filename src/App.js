
import Home from "./Components/HomeComponent/Home";

import StudentLogin from "./Components/StudentComponent/StudentLogin/StudentLogin";
import AdminLogin from "./Components/AdminComponent/AdminLogin/AdminLogin";
import AdminDashboard from "./Components/AdminComponent/AdminDashboard/AdminDashboard";
import StudentDashboard from "./Components/StudentComponent/StudentDashboard/StudentDashboard";

import { Route, Routes } from "react-router-dom";
import StudentSignup from "./Components/StudentComponent/StudentSignup/StudentSignup";




function App() {
  return (
    <div>
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/StudentLogin/*" element={<StudentLogin />} />
          <Route path="/StudentSignup/*" element={<StudentSignup />} />
          <Route path="/AdminLogin/*" element={<AdminLogin />} />
          <Route path="/AdminDashboard/*" element={<AdminDashboard />} />
          <Route path="/StudentDashboard/*" element={<StudentDashboard />} />
        </Routes> 
         </div>);
} export default App;