import React from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
    
    const currentNameOfStudent = props.name;
    
    return (
        <main className="appointment__card appointment__card--create">
        <section className="appointment__card-left">
            <form autoComplete="off">
            <input
                className="appointment__create-input text--semi-bold"
                name={props.name}
                type="text"
                placeholder={currentNameOfStudent? currentNameOfStudent: "Please enter your name"}
                /*
                This must be a controlled component
                */
            />
            </form>
            <InterviewerList interviewers={props.interviewers} value={props.value} onChange={props.value}/>
        </section>
        <section className="appointment__card-right">
            <section className="appointment__actions">
            <Button danger onCancel={props.onCancel}>Cancel</Button>
            <Button confirm onSave={props.onSave}>Save</Button>
            </section>
        </section>
        </main>
    )
};