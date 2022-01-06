import { useState } from "react"

export function useVisualMode(intialMode) {
    const [mode, setMode] = useState(intialMode);
    // keeping track of the actions on the UI such that we are initially 
    // storing the initial mode in an array. Interaction of the history
    // will be done through the Transition and Back functions/actions.

    const [history, setHistory] = useState([intialMode]); // This line is new!
    
    function transition (mode, replace = false) {
        if (replace) {
            setMode(mode);
            
        } else {
            setMode(mode);
            //using the array method of push to append to the end of 
            //the array.
            history.push(mode);
        }
    }

    function back () {
        if (history.length >= 1) {
            //using the array method of Pop to remove the last element 
            //from the array
            history.pop();
            // setting the mode to the last element of the array; accessed 
            // based off array length.
            setMode(history[history.length - 1]);
        } if (history.length < 1) {
            setMode(mode);
        }
    }

    return {mode, transition, back};
}