export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";


function getDaysWithRemainingSpots(days, appointments) {
    const daysWithSpots = days.map((item) => {
      //console.log("Console log of what's in item appointments: ", item.appointments);
      let spotsAvailable = 0;
      for (const appt of item.appointments) {
        //console.log("console log of appointments :", appointments);
        if (appointments[appt].interview === null) {
          spotsAvailable++;
        }
      }
      //returning an object that involves the days and their spots
      return {
        ...item,
        spots: spotsAvailable,
      };
    });
    return daysWithSpots;
}

export default function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { 
            ...state, 
            day: action.value  
          };
      case SET_APPLICATION_DATA:
        return { 
          ...state, 
          days: action.value.days,
          appointments: action.value.appointments,
          interviewers: action.value.interviewers
        };
      case SET_INTERVIEW: 
        //console.log ("logging what's in action.value.interview: ", action.value.interview);
        return { 
          ...state,
          appointments: action.value.appointments,
          interview: action.value.interview,

          //error occurs below with websocket as expecting to receive 5 appts but receiving one only.
          //as observe from console log in line 32.
          days: getDaysWithRemainingSpots(state.days, action.value.appointments)
        };
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
}