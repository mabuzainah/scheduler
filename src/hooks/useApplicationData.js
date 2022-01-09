import { useState } from "react";
import axios  from "axios";
import { useEffect } from "react";

export function useApplicationData() {
    const [state, setState] = useState({
        day: "Monday",
        days: [],
        appointments: {},
        interviewers: {}
    });

    const setDay = day => setState({ ...state, day });
    
    function bookInterview(id, interview) {
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        //Make put request to update state locally and on server
        return axios.put(`/api/appointments/${id}`, {interview})
        .then(result =>{
          //console.log(result);
          setState(
            {...state, appointments}
          );
        });
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
        //Make put request to update state locally and on server
        return axios.delete(`/api/appointments/${id}`)
        .then(result =>{
          //console.log(result);
          setState(
            {...state, appointments}
          );
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
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
        });
    }, [])

    return {
        state,
        setDay,
        bookInterview,
        cancelInterview
    };
}