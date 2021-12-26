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
                <Button confirm onSubmit={event => event.preventDefault()} onClick={event => props.onSave(currentNameOfStudent, currentInterviewer)}>Save</Button>
            </section>
        </section>
        </main>
    )
};