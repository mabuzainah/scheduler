import React from "react";
import classnames from "classnames";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
    // this component will take in the following as props:
        // interviewers:array - an array of objects containing the information of
        // each interviewer
        // interviewer:number - the id of an interviewer
        // setInterviewer:function - a function that accepts an interviewer id

    const interviewerList = props.interviewers.map(interviewer => {
        return (<InterviewerListItem
                key= {interviewer.id}
                interviewer={interviewer.interviewer} 
                setInterviewer= {props.setInterviewer}
                name= {interviewer.name}
                avatar= {interviewer.avatar}
                selected= {interviewer.selected === props.selected}
                > 
                    {interviewer} 
                </InterviewerListItem>);
    });

    return (
        <section className="interviewers">
            <h4 className="interviewers__header text--light">Interviewer</h4>
            <ul className="interviewers__list">
                {interviewerList}
            </ul>
        </section>
    );
}