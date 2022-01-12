import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types';

export default function InterviewerList(props) {
    // this component will take in the following as props:
        // interviewers:array - an array of objects containing the information of
        // each interviewer
        // interviewer:number - the id of an interviewer
        // setInterviewer:function - a function that accepts an interviewer id
    //removed line 22 which had {interviewer} in it, as this is not needed. Mimic modification in DayList.js
    // in line 20 updated the line to be selected = {props.interviewer === interviewer.id}, to toggle the correct user. Since theoretically there's no "interviewer" prop being passed. When looking at index.js, we can see that interviewer prop is the actual ID of the interviewer. Hence why added interviewer.id
    const interviewerList = props.interviewers.map(interviewer => {
        return (<InterviewerListItem
                key= {interviewer.id}
                setInterviewer={(event) => props.onChange(interviewer.id)}
                name= {interviewer.name}
                avatar= {interviewer.avatar}
                selected= {props.value === interviewer.id}
                > 
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

InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired,
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired
};