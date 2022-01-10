import { useReducer } from "react";
import { useState } from "react";
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
          interview: action.value
        };
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }
  const setDay = day => dispatch({ type: SET_DAY, value: day });
    
  function updateSpots(days, id, increment = true) {
    const updatedDay = days.map((day) => {
      if (increment === false) {
        if (day.appointments.includes(id)) {
          day.spots = day.spots - 1;
        }
        return day;
      } else {
        if (day.appointments.includes(id)) {
          day.spots = day.spots + 1;
        }
        return day;
      }
    });
    return updatedDay;
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
      // setState(
      //   {...state, appointments, updatedDays}
      // );
      dispatch({
        type: SET_INTERVIEW,
        value: {
          appointments: appointments,
          interview: interview
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
        // setState(
        //   {...state, appointments, updatedDays}
        // );
        dispatch({
          type: SET_INTERVIEW,
          value: {
            appointments: appointments,
            interview: null
          }
        });
      });
  }

  // USING PROMISE ALL to fetch the Days using AXIOS and Appointments using
  // AXIOS concurrently. 
  function getDaysAxios() {
      return axios.get('http://localhost:8001/api/days');
  }

  function getAppointmentsAxios() {
      return axios.get('http://localhost:8001/api/appointments');
  }

  function getInterviewersAxios() {
      return axios.get('http://localhost:8001/api/interviewers');
  }

  useEffect(() => {
      Promise.all([
      getDaysAxios(),
      getAppointmentsAxios(),
      getInterviewersAxios(),
      ]).then((all) => {
      //setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
        dispatch({
          type: SET_APPLICATION_DATA,
          value: {
            days: all[0].data,
            appointments: all[1].data,
            interviewers: all[2].data
          }
        });
      });
  }, [])

  return {
      state,
      setDay,
      bookInterview,
      cancelInterview
  };
}