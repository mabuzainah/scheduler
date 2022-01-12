import React, { useState } from 'react'
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
    
    const [currentNameOfStudent, setNameOfStudent] = useState(props.name || "");
    const [currentInterviewer, setInterviewer] = useState(props.value || null);
    
    const reset = function () {
        setNameOfStudent("");
        setInterviewer(null);
    };

    const cancel = function () {
        reset();
        props.onCancel();
    };

    /*
        Function to validate the input on the form, to not allow user to submit 
        with invalid data such as blank interviewer or name of student.
    */
    const validateFormInput = function () {
        if (currentNameOfStudent === ""){
            alert("Please input a name for the Student in the form")
        } if (!currentInterviewer) {
            alert("Please select an interviewer")
        } else if (currentNameOfStudent !== "" && currentInterviewer){
            props.onSave(currentNameOfStudent,currentInterviewer);
        }
    }

    return (
        <main className="appointment__card appointment__card--create">
        <section className="appointment__card-left">
            <form autoComplete="off">
            <input
                className="appointment__create-input text--semi-bold"
                name={currentNameOfStudent}
                onChange={(event) => setNameOfStudent(event.target.value)} 
                value = {currentNameOfStudent}
                type="text"
                placeholder={currentNameOfStudent? currentNameOfStudent: "Please enter your name"}
                /*
                This must be a controlled component
                */
            />
            </form>
            <InterviewerList interviewers={props.interviewers} value={currentInterviewer} onChange={(event) => setInterviewer(event)}/>
        </section>
        <section className="appointment__card-right">
            <section className="appointment__actions">
                <Button danger onClick={cancel}>Cancel</Button>
                <Button confirm onSubmit={event => event.preventDefault()} onClick={validateFormInput}>Save</Button>
            </section>
        </section>
        </main>
    )
};