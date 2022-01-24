import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types';

export default function InterviewerList(props) {
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