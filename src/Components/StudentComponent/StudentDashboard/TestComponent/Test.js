import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "../StudentDashboard.module.css";
import baseUrl from "../../../baseUrl";

function Test() {
    // ---------------------------------------------------------
    let { id } = useParams();  // Get exam ID from URL params
    let { category } = useParams();  // Get category name from URL params

    const [allQuestions, setAllQuestions] = useState([]);  // State to store all questions
    const [answer, setAnswer] = useState({});  // State to store user's answers dynamically

    const [checkSubmit, setCheckSubmit] = useState(false);  // For handling submit status
    const navigate = useNavigate();  // For navigating to other pages

    useEffect(() => {
        // Fetch all questions for this exam from the backend
        async function getAllQuestions() {
            try {
                let value = await axios.get(`${baseUrl}/exam/${id}/question`);
                setAllQuestions(value.data);  // Store questions in state
            } catch (error) {
                console.error("Error fetching questions: ", error);
            }
        }
        getAllQuestions();
    }, [id]);

    // ---------------------------------------------------------
    // Function to handle radio button changes and store answers dynamically
    function onRadioButtonChange(e) {
        setAnswer({
            ...answer,
            [e.target.name]: e.target.value  // Dynamically update the answer object
        });
    }

    // ---------------------------------------------------------
    // Function to handle test submission and calculate the score
    async function submitTest() {
        // Collect all the correct answers for comparison
        let correctAnswers = allQuestions.map(question => question.answer);  // Extract correct answers

        let score = 0;

        // Compare user answers with correct answers
        allQuestions.forEach((question, index) => {
            if (correctAnswers[index] === answer[`answer${index + 1}`]) {
                score++;  // Increment score if the answer is correct
            }
        });

        // Determine the result status
        let status = score >= 3 ? "Pass" : "Fail";

        // Get current date and time
        const date = new Date();
        const d = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
        const t = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

        // Prepare result data to send to the backend
        let data = {
            status: status,
            score: score,
            email: { email: sessionStorage.getItem("user") },  // User email
            edate: d + " " + t,  // Exam date and time
            sname: { name: category },  // Subject name (category)
            totalMarks: allQuestions.length.toString(),  // Total marks based on number of questions
            examId: { id: id },  // Exam ID
            totalQuestion: allQuestions.length.toString()  // Total questions count
        };

        // Send result data to the backend
        try {
            await axios.post(`${baseUrl}/result`, data);
            setCheckSubmit(true);  // Set the flag to true when the test is submitted
            navigate("/StudentDashboard/Result");  // Navigate to the result page
        } catch (error) {
            console.error("Error submitting result: ", error);
        }
    }

    // ---------------------------------------------------------
    // Handle navigating back to the dashboard (or any other page)
    function handleGoBack() {
        navigate("/StudentDashboard");  // Go back to the dashboard
    }

    // ---------------------------------------------------------
    return (
        <>
            <div id={style.displayBoxQuestionHeadingBox}>
                <h1>Answer all the questions</h1>
            </div>

            {/* Render all questions dynamically */}
            {allQuestions.map((data, i) => {
                const questionIndex = i + 1;  // Question number
                return (
                    <div id={style.displayBoxQuestionBox} key={i}>
                        <div id={style.divQuestion}> <span>{data.qname}</span> </div>

                        <div>
                            <input
                                onChange={onRadioButtonChange}
                                value={data.optionOne}
                                id={`option1_${questionIndex}`}
                                name={`answer${questionIndex}`}
                                type="radio"
                            />
                            <label htmlFor={`option1_${questionIndex}`}>{data.optionOne}</label>
                        </div>

                        <div>
                            <input
                                onChange={onRadioButtonChange}
                                value={data.optionTwo}
                                id={`option2_${questionIndex}`}
                                name={`answer${questionIndex}`}
                                type="radio"
                            />
                            <label htmlFor={`option2_${questionIndex}`}>{data.optionTwo}</label>
                        </div>

                        <div>
                            <input
                                onChange={onRadioButtonChange}
                                value={data.optionThree}
                                id={`option3_${questionIndex}`}
                                name={`answer${questionIndex}`}
                                type="radio"
                            />
                            <label htmlFor={`option3_${questionIndex}`}>{data.optionThree}</label>
                        </div>

                        <div>
                            <input
                                onChange={onRadioButtonChange}
                                value={data.optionFour}
                                id={`option4_${questionIndex}`}
                                name={`answer${questionIndex}`}
                                type="radio"
                            />
                            <label htmlFor={`option4_${questionIndex}`}>{data.optionFour}</label>
                        </div>
                    </div>
                );
            })}

            {/* Submit button */}
            <div id={style.submitExam}>
                <button onClick={submitTest}>Submit Exam</button>
            </div>

            {/* Go back button */}
            <div id={style.goBack}>
                <button onClick={handleGoBack}>Go Back</button>
            </div>
        </>
    );
}

export default Test;
