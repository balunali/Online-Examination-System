import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import style from "./StudentDashboard.module.css";
import Subject from "./Subject/Subject";
import Result from "./ResultComponent/Result";
import Exam from "./ExamComponent/Exam";
import Test from "./TestComponent/Test";

function StudentDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("user") == null) {
      alert("Detect Illegal Way of Entering");
      navigate("/StudentLogin");
    }
  }, [navigate]);

  function logout() {
    sessionStorage.clear();
    navigate("/StudentLogin");
  }

  return (
    <>
      <div id={style.header}>
        <div id={style.headerHeadingBox}>
          <h3>Online Exam System</h3>
        </div>
        <div id={style.headerMenuBox}>
          <NavLink to="Subject">
            <span>Subject</span>
          </NavLink>
          <NavLink to="Result">
            <span>My Result</span>
          </NavLink>
          <NavLink onClick={logout} to="/StudentLogin">
            <span>Logout</span>
          </NavLink>
        </div>
      </div>
      <div id={style.displayBox}>
        <Routes>
          <Route path="subject" element={<Subject />} />
          <Route path="Result" element={<Result />} />
          <Route path="Exam/:category" element={<Exam />} />
          <Route path="Exam/:category/:id" element={<Test />} />
          <Route path="*" element={<h2>Welcome to the Student Dashboard</h2>} />
        </Routes>
      </div>
    </>
  );
}

export default StudentDashboard;