import React from "react";
import classnames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
    const dayListItemClass = classnames("day-list__item", {
        "day-list__item--selected": props.selected,
        "day-list__item--full": !(props.spots)
     });
    
    const formatSpots = function (spotsAvailable) {
        if (!spotsAvailable) {
            return `no spots remaining`;
        } else if (spotsAvailable === 1) {
            return `${spotsAvailable} spot remaining`;
        }
        return `${spotsAvailable} spots remaining`;
    };

    const availableSpots = formatSpots(props.spots);

    return (
        <li data-testid="day"
            onClick={() => props.setDay(props.name)}
            className= {dayListItemClass}
        >
        <h2 className="text--regular">{props.name}</h2> 
        <h3 className="text--light">{availableSpots}</h3>
        </li>
    );
}