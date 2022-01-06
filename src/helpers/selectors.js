/*
  A selector function to that returns the Appointments for a Day
*/

export function getAppointmentsForDay(state, day) {
    //... returns an array of appointments for that day
    
    //creating an empty array that will be used to append the appointments for a given day to it
    //based of the state passed.
    let appointmentArray = [];
    
    for (const dayFromState of state.days){
        if (dayFromState.name === day) {
            dayFromState.appointments.forEach(apptId => appointmentArray.push(apptId)); 
        }
    };
   
    const matchingAppointments = appointmentArray.map( id => state.appointments[id]);
    return matchingAppointments;

}

/*
    A helper function that returns an object containing the student and the 
    interviewer based off an interview passed and the state passed to the function.
*/

export function getInterview(state,interview) {
    //checking to see if the interview being passed is null, if null then return nothing.
    if (!interview) {
        return null;
    }
    // otherwise return the student based off the interview passed and the interviewer based off 
    // what's in the interview being passed down to the function. 
    return {
        student: interview.student,
        interviewer: state.interviewers[interview.interviewer]
    }
}

/*
    A selector function to obtain the Interviewers for a Day, contains
    slight modification of the variables from getAppointmentDays selector
    function above in the file. 
*/

export function getInterviewersForDay(state, day) {
    //... returns an array of interviewers for that day
    
    //creating an empty array that will be used to append the interviewers for a given day to it
    //based of the state passed.
    let interviewerArray = [];
    
    for (const dayFromState of state.days){
        if (dayFromState.name === day) {
            dayFromState.interviewers.forEach(interviewerId => interviewerArray.push(interviewerId)); 
        }
    };
   
    const matchingInterviewers = interviewerArray.map( id => state.interviewers[id]);
    return matchingInterviewers;

}