import React from "react";
import classnames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
    // this component will take in the following as props:
        // id:number - the id of the interviewer
        // name:string - the name of the interviewer
        // avatar:url - a URL to an image of the interviewer
        // selected:boolean - to determine if an interview is selected or not
        // setInterviewer:function - sets the interviewer upon selection

    const interviewerListItemClass = classnames("interviewers__item", {
        "interviewers__item--selected": props.selected
    });

    return (
        <li 
        className={interviewerListItemClass}
        onClick={()=> props.setInterviewer}
        >
            <img
            className="interviewers__item-image" 
            src= {props.avatar}
            alt= {props.name}
            />
            {props.name}
        </li>
    );
}