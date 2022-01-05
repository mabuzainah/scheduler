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