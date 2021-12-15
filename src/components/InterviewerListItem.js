import React from "react";
import classnames from "classnames";
import "components/InterviewListItem.scss";

export default function InterviewListItem(props) {
    // this component will take in the following as props:
        // id:number - the id of the interviewer
        // name:string - the name of the interviewer
        // avatar:url - a URL to an image of the interviewer
        // selected:boolean - to determine if an interview is selected or not
        // setInterviewer:function - sets the interviewer upon selection
    return (
        <li className="interviewers__item">
            <img
            className="interviewers__item-image" 
            src="https://i.imgur.com/LpaY82x.png" 
            alt="Sylvia Palmer" 
            />
            Sylvia Palmer
        </li>
    );
}