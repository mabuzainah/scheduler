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

export default function Appointment(props) {
    const EMPTY = "EMPTY";
    const SHOW = "SHOW";
    const CREATE = "CREATE";
    const SAVING = "SAVING";
    const DELETING = "DELETING";
    const CONFIRM = "CONFIRM";
    

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
        .then(() => transition(SHOW));

    }

    function remove () {
        if(mode === SHOW){
            transition(CONFIRM)
          }
          else {
            transition(DELETING)
            props.cancelInterview(props.id)
            .then(()=>transition(EMPTY));
          }
    }

    function edit() {
        
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
        </article> 
    );
}
