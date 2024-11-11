import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import style from "../SubjectComponent/Subject.module.css";
import baseUrl from "../../../baseUrl";

function ViewQuestion() {
    // State for displaying the edit form
    const [display, setDisplay] = useState({ display: "none" });

    // Handle showing and closing the edit form
    function handleEditQuestion(questionId) {
        setDisplay({ display: "block" });
        setDataInInputField(questionId);
    }

    function handleClose() {
        setDisplay({ display: "none" });
    }

    // Get exam ID from URL params
    const { id } = useParams();

    // State to hold the list of questions
    const [questions, setQuestions] = useState([]);

    // Fetch questions for the particular exam
    useEffect(() => {
        async function getAllQuestions() {
            let value = await axios.get(`${baseUrl}/exam/${id}/question`);
            setQuestions(value.data);
        }
        getAllQuestions();
    }, [id]);

    // State to handle the form data for editing a question
    const [updatedQ, setUpdatedQ] = useState({
        qname: "",
        optionOne: "",
        optionTwo: "",
        optionThree: "",
        optionFour: "",
        answer: "",
        ename: id,
        sname: ""  // subject name as string
    });

    // Handle changes in the text fields
    function onTextFieldChange(e) {
        setUpdatedQ({
            ...updatedQ,
            [e.target.name]: e.target.value
        });
    }

    // Set the data in the form fields when editing a question
    const [qId, setQId] = useState();
    function setDataInInputField(questionId) {
        setQId(questionId);
        const question = questions.find(q => q.id === questionId);
        if (question) {
            setUpdatedQ({
                ...question,
                sname: question.sname.name  // Set the subject name
            });
        }
    }

    // State for triggering re-fetch after update or delete
    const [check, setCheck] = useState();
    async function updateQuestion() {
        // Send only the name of the subject
        const updatedData = {
            ...updatedQ,
            sname: updatedQ.sname  // Just the name of the subject
        };

        try {
            // Send the updated question data to the backend
            await axios.put(`${baseUrl}/question/${qId}`, updatedData);

            // Refetch updated questions list
            const value = await axios.get(`${baseUrl}/exam/${id}/question`);
            setQuestions(value.data);
            setDisplay({ display: "none" });
        } catch (error) {
            console.error("Error updating question:", error);
        }
    }

    // Navigate to the previous page
    let navigate = useNavigate();
    function handleGoBack() {
        navigate("/AdminDashboard/Exam");
    }

    // State for triggering re-fetch after delete
    const [d, setD] = useState();
    async function deleteQuestion(id) {
        try {
            // Delete the question by ID
            await axios.delete(`${baseUrl}/question/${id}`);

            // Refetch the questions after deletion
            const value = await axios.get(`${baseUrl}/exam/${id}/question`);
            setQuestions(value.data);
            setD(true);
        } catch (error) {
            console.error("Error deleting question:", error);
        }
    }

    // Re-fetch questions after update or delete
    if (check || d) return <ViewQuestion />;

    return (
        <>
            <div id={style.displayHeadingBox}>
                <h2>Question List</h2>
            </div>

            <div id={style.tableBox}>
                <table>
                    <thead>
                        <tr>
                            <th id={style.center}>Question Name</th>
                            <th id={style.center}>Option one</th>
                            <th id={style.center}>Option two</th>
                            <th id={style.center}>Option three</th>
                            <th id={style.center}>Option four</th>
                            <th id={style.center}>Question Answer</th>
                            <th id={style.center}>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map((data, i) => {
                            return (
                                <tr key={i}>
                                    <td>{data.qname}</td>
                                    <td>{data.optionOne}</td>
                                    <td>{data.optionTwo}</td>
                                    <td>{data.optionThree}</td>
                                    <td>{data.optionFour}</td>
                                    <td>{data.answer}</td>
                                    <td>
                                        <button onClick={() => handleEditQuestion(data.id)}>Edit</button>
                                        <button onClick={() => deleteQuestion(data.id)}>Delete</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div id={style.addSubjectBox}>
                <button onClick={handleGoBack}>Go Back</button>
            </div>

            {/* Edit Form */}
            <div id={style.addBox} style={display}>
                <label>Enter Question </label>
                <input
                    value={updatedQ.qname}
                    onChange={onTextFieldChange}
                    name="qname"
                    type="text"
                    placeholder="Enter Question"
                />

                <label>Enter Option A </label>
                <input
                    value={updatedQ.optionOne}
                    onChange={onTextFieldChange}
                    name="optionOne"
                    type="text"
                    placeholder="Enter Option A"
                />

                <label>Enter Option B </label>
                <input
                    value={updatedQ.optionTwo}
                    onChange={onTextFieldChange}
                    name="optionTwo"
                    type="text"
                    placeholder="Enter Option B"
                />

                <label>Enter Option C </label>
                <input
                    value={updatedQ.optionThree}
                    onChange={onTextFieldChange}
                    name="optionThree"
                    type="text"
                    placeholder="Enter Option C"
                />

                <label>Enter Option D </label>
                <input
                    value={updatedQ.optionFour}
                    onChange={onTextFieldChange}
                    name="optionFour"
                    type="text"
                    placeholder="Enter Option D"
                />

                <label>Enter Question Answer </label>
                <input
                    value={updatedQ.answer}
                    onChange={onTextFieldChange}
                    name="answer"
                    type="text"
                    placeholder="Enter Answer"
                />

                <label>Enter Subject </label>
                <input
                    value={updatedQ.sname}
                    onChange={onTextFieldChange}
                    name="sname"
                    type="text"
                    placeholder="Enter Subject"
                />

                <div id={style.buttonBox}>
                    <button onClick={updateQuestion}>Update Question</button>
                    <button onClick={handleClose}>Close</button>
                </div>
            </div>
        </>
    );
}

export default ViewQuestion;
