import React from "react";
import classnames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
    const dayListItemClass = classnames("day-list__item", {
        "day-list__item--selected": props.selected,
        "day-list__item--full": !(props.spots)
        // ^ props.spots returns number of spots available. So if no spots are 
        // available then we would have to use !props.spots to apply the full styling. 
        // previous code of props.full doesn't make sense as there's nothing being
        // passed to DayListItem as a prop indicating being full. 
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
        <li 
            onClick={() => props.setDay(props.name)}
            className= {dayListItemClass}
        >
        <h2 className="text--regular">{props.name}</h2> 
        <h3 className="text--light">{availableSpots}</h3>
        </li>
    );
}