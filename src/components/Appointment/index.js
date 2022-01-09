import React , {useState} from "react";

import "components/Appointment";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status"
import { useVisualMode } from "hooks/useVisualMode";
import Form from "./Form";
import { useEffect } from "react";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
    const EMPTY = "EMPTY";
    const SHOW = "SHOW";
    const CREATE = "CREATE";
    const SAVING = "SAVING";
    const DELETING = "DELETING";
    const CONFIRM = "CONFIRM";
    const EDIT = "EDIT";
    const ERROR_SAVE = "ERROR_SAVE";
    const ERROR_DELETE = "ERROR_DELETE";
    

    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
    );

    function save(name, interviewer) {
        const interview = {
          student: name,
          interviewer
        };

        transition(SAVING);

        props.bookInterview(props.id, interview)
        .then(() => transition(SHOW))
        .catch((error) => {
            console.log("Error attempting to Save:", error)
            transition(ERROR_SAVE, true);
        });

    }

    function remove () {
        if(mode === SHOW){
            transition(CONFIRM)
          }
          else {
            transition(DELETING, true)
            props.cancelInterview(props.id)
            .then(()=>transition(EMPTY))
            .catch((error) => {
                console.log("Error attempting to Delete:", error)
                transition(ERROR_DELETE, true);
            });
          }
    }

    function edit () {
        transition(EDIT);
    }

    return (
        <article className = "appointment">
            <Header time = {props.time} />
                {mode === EMPTY && (
                    <Empty 
                        onAdd={() => transition(CREATE)} 
                    />
                )}
                {mode === SHOW && (
                    <Show
                        student={props.interview.student}
                        interviewer={props.interview.interviewer}
                        onDelete = {remove}
                        onEdit = {edit}
                    />
                )}
                {mode === CREATE && (
                    <Form 
                        interviewers={props.interviewers} 
                        onCancel={back} 
                        onSave={save}
                    />
                )}
                {mode === SAVING && (
                    <Status message = "Saving"
                    />
                )}
                {mode === DELETING && (
                    <Status message = "Deleting"
                    />
                )}
                {mode === CONFIRM && (
                    <Confirm
                        onCancel={back}
                        onConfirm={remove}
                        message="Are you sure you would like to delete?" 
                    />
                )}
                {mode === EDIT && (
                    <Form  
                        interviewers = {props.interviewers}
                        value = {props.interview.interviewer.id}
                        name = {props.interview.student}
                        onCancel={back} 
                        onSave={save}
                    />
                )}
                {mode === ERROR_SAVE && (
                    <Error
                        message="Could not save appointment"
                        onClose={back}
                    />
                )}
                {mode === ERROR_DELETE && (
                    <Error
                        message="Could not delete appointment"
                        onClose={back}
                    />
                )}
        </article> 
    );
}
