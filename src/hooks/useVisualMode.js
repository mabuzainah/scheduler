import { useState } from "react"

export function useVisualMode(initial) {
    
    const [mode, setMode] = useState(initial);
    // keeping track of the actions on the UI such that we are initially 
    // storing the initial mode in an array. Interaction of the history
    // will be done through the Transition and Back functions/actions.

    const [history, setHistory] = useState([initial]); // This line is new!
    
    function transition (newMode, replace = false) {
        if (replace) {
            setMode(newMode);
            setHistory((prev) => {
                prev.pop();
                prev.push(newMode)
                return prev;
            });
           // console.log("transition from " , mode, "to ", newMode);
        } else {
            setMode(newMode);
            //using the array method of push to append to the end of 
            //the array.
            setHistory((prev) => {
                prev.push(newMode);
                return prev;
            });
           // console.log("transition from " , mode, "to ", newMode);
        }
    }

    function back () {
        const newHistory = [...history];
        newHistory.pop();
        setHistory((prev) => newHistory);
        if (history.length > 1) {
            setMode(newHistory[newHistory.length - 1]);
        }    
    }

    return {mode, transition, back};
}