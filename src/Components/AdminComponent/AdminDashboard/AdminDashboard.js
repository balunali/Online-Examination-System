import style from "./AdminDashboard.module.css";
import {  useNavigate } from "react-router-dom";
import { NavLink, Routes, Route } from "react-router-dom";

import pic4 from "../../../images/logo.png";

// Importing components for the admin dashboard
import Dashboard from "./Dashboard/Dashboard";
import Subject from "./SubjectComponent/Subject";
import Exam from "./ExamComponent/Exam";
//import Question from "./QuestionComponent/Question";
import Result from "./ResultComponent/Result";
import StudentList from "./StudentList/StudentList";
import Student from "./StudentList/Student/Student";
import Details from "./ExamComponent/DetailComponent/Details";
import ViewQuestion from "./ExamComponent/ViewQuestion/ViewQuestion";
import AddQuestion from "./ExamComponent/AddQuestion/AddQuestion";

function AdminDashboard() {
    let navigate = useNavigate();

    function goToAdminLogin() {
        navigate ("/AdminLogin");
    }
    return (
        <>
            <div id={style.header}>
                <div id={style.headerHeadingBox}>
                    <h3>Online Exam System</h3>
                </div>

                <div id={style.headerMenuBox}>
                    <NavLink to="/AdminDashboard"> <span> Dashboard</span> </NavLink>
                    <a> <span onClick={goToAdminLogin}> Logout</span></a>
                </div>
            </div>

            <div id={style.content}>
                <div id={style.sideMenubar}>
                    <div id={style.sideMenubarImageBox}>
                        <img src={pic4} alt="Logo" />
                    </div>

                    <div id={style.sideMenubarList}>
                        <NavLink className={style.removeUnderline} to="Subject">
                            <button> <span>  Subject </span></button>
                        </NavLink>
                        <NavLink className={style.removeUnderline} to="/AdminDashboard/Exam">
                            <button> <span>  Exam </span></button>
                        </NavLink>
                        {/* <NavLink className={style.removeUnderline} to="/AdminDashboard/Question">
                            <button> <span>  Question </span></button>
                        </NavLink> */}
                        <NavLink className={style.removeUnderline} to="/AdminDashboard/Result">
                            <button> <span>  Result </span></button>
                        </NavLink>
                        <NavLink className={style.removeUnderline} to="/AdminDashboard/StudentList">
                            <button> <span>  StudentList </span></button>
                        </NavLink>
                    </div>
                </div>
                <div id={style.display}>
                    <Routes>
                        <Route path="AdminDashboard" element={<Dashboard />} />
                        <Route path="Subject" element={<Subject />} />
                        <Route path="Exam" element={<Exam />} />
                        {/* <Route path="Question" element={<Question />} /> */}
                        <Route path="Result" element={<Result />} />
                        <Route path="StudentList" element={<StudentList />} />
                        <Route path="Exam/Details/:id" element={<Details />} />
                        <Route path="Exam/ViewQuestion/:id" element={<ViewQuestion />} />
                        <Route path="Exam/AddQuestion/:id" element={<AddQuestion />} />
                        <Route path="Details/catagory/:id" element={<Student />} />
                        <Route path="*" element={<h2>Welcome to AdminDashboard</h2>}></Route>
                    </Routes>
                </div>
            </div>
        </>
    );
}

export default AdminDashboard;
