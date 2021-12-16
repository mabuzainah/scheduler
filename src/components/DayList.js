import React from "react";
import DayListItem from "./DayListItem";


export default function DayList(props) {
    
    const dayList = props.days.map(dayz => {
        return (<DayListItem 
                key= {dayz.id}
                name={dayz.name} 
                spots={dayz.spots}
                selected= {dayz.name === props.day}
                setDay= {props.setDay}
                > 
                </DayListItem>);
    });

    return (
        <ul>
            {dayList}
        </ul>
    );
}