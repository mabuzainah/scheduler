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
    // NaN, null, "", 0, underfined, false    are FALSY values.  
    // modified line 33 to be {props.selected && props.name} instead of {props.name}. The reason
    // why we put this in there, is to allow the name only to display if interviewer was selected. 
    // then we put props.selected ahead of props.name, to get the name to return. 
    // So when selected === false, then the && operator will return false and not return anything.

    return (
        <li 
        className={interviewerListItemClass}
        onClick= {props.setInterviewer}
        >
            <img
            className="interviewers__item-image" 
            src= {props.avatar}
            alt= {props.name}
            />
            {props.selected && props.name}
        </li>
    );
}