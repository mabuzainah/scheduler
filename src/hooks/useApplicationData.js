import { useReducer } from "react";
import axios  from "axios";
import { useEffect } from "react";

export function useApplicationData() {

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  const [state, dispatch] = useReducer( reducer, {
      day: "Monday",
      days: [],
      appointments: {},
      interviewers: []
  });
  function reducer(state, action) {
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
        return { 
          ...state,
          appointments: action.value.appointments,
          interview: action.value.interview,
          // spots: action.value.spots,
          days: getDaysWithRemainingSpots(state.days, action.value.appointments)
        };
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }
  const setDay = day => dispatch({ type: SET_DAY, value: day });
  
  // function updateSpots(days, id, increment = true) {
  //   const updatedDay = days.map((day) => {
  //     if (increment === false) {
  //       if (day.appointments.includes(id)) {
  //         day.spots = day.spots - 1;
  //       }
  //       return day;
  //     } else {
  //       if (day.appointments.includes(id)) {
  //         day.spots = day.spots + 1;
  //       }
  //       return day;
  //     }
  //   });
  //   return updatedDay;
  // }  
  
  function getDaysWithRemainingSpots(days, appointments) {
    const daysWithSpots = days.map((item) => {
      let spotsAvailable = 0;
      for (const appt of item.appointments) {
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
  
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    //const updatedDays = updateSpots(state.days, id, false);
    //Make put request to update state locally and on server
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(result => {
      dispatch({
        type: SET_INTERVIEW,
        value: {
          appointments: appointments,
          interview: interview,
          //spots: updatedDays
        }
      });
    })
  }
  
  function cancelInterview (id) {
      const appointment = {
        ...state.appointments[id],
        interview: null
      }
      const appointments = {
        ...state.appointments,
        [id] : appointment
      }
      //const updatedDays = updateSpots(state.days, id, true);
      //Make put request to update state locally and on server
      return axios.delete(`/api/appointments/${id}`)
      .then(result =>{
        dispatch({
          type: SET_INTERVIEW,
          value: {
            appointments: appointments,
            interview: null,
            //spots: updatedDays
          }
        });
      });
  }

  // USING PROMISE ALL to fetch the Days using AXIOS and Appointments using
  // AXIOS concurrently. 
  function getDaysAxios() {
      //return axios.get('http://localhost:8001/api/days');
      return axios.get('/api/days');

  }

  function getAppointmentsAxios() {
      //return axios.get('http://localhost:8001/api/appointments');
      return axios.get('/api/appointments');
  }

  function getInterviewersAxios() {
      //return axios.get('http://localhost:8001/api/interviewers');
      return axios.get('/api/interviewers');
  }

  useEffect(() => {
      Promise.all([
      getDaysAxios(),
      getAppointmentsAxios(),
      getInterviewersAxios(),
      ]).then((all) => {
        dispatch({
          type: SET_APPLICATION_DATA,
          value: {
            days: all[0].data,
            appointments: all[1].data,
            interviewers: all[2].data
          }
        });
        // const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
        // socket.onopen = () => {
        //   console.log("Web socket opened");
        //   socket.send("Ping...");
        // };
        // socket.onmessage = appointmentData => {
        //   const appointment = JSON.parse(appointmentData.data);
        //   console.log("message to Websocket server: ", appointment);
 
        //   debugger;
 
        //   const appointments = {
        //     ...state.appointments,
        //     [appointment.id]: appointment
        //   };
 
        //    if (appointment.type === "SET_INTERVIEW") {
        //      console.log("I've reached the step to check for appointment.type response from WebSocket to SET_INTERVIEW")
        //      dispatch(
        //       { 
        //         type: SET_INTERVIEW, 
        //         value: {
        //           appointments: appointments
        //         }
        //       });
        //   }
        // };


      });
  }, [])

  return {
      state,
      setDay,
      bookInterview,
      cancelInterview
  };
}