import React , {useState} from "react";
import { useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay } from "helpers/selectors";
import { getInterview } from "helpers/selectors";
import { getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function bookInterview(id, interview) {
    console.log(id, interview);
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
      console.log(result);
      setState(
        {...state, appointments}
      );
    });
    
    // setState({
    //   ...state,
    //   appointments
    // });
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
      console.log(result);
      setState(
        {...state, appointments}
      );
    });
  }

  const dailyAppointments = getAppointmentsForDay(state, state.day); 
  // console.log("daily appointments: " + dailyAppointments);
  // appointmentList is basically the schedule for the day.
  const appointmentList = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    const dayInterviewers = getInterviewersForDay(state, state.day);
    // console.log("interviewers:" + state.interviewers.id);
    // console.log("Day Interviewers: " + dayInterviewers);
    return (<Appointment
            key= {appointment.id}
            id={appointment.id}
            time={appointment.time}
            interview={interview}
            interviewers = {dayInterviewers}
            bookInterview = {bookInterview}
            cancelInterview = {cancelInterview}
            > 
          </Appointment>);
    });  
  const setDay = day => setState({ ...state, day });

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
      const [first, second, third] = all;
      console.log(first, second, third);
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });
  }, [])

  return (
    <main className="layout">
      <section className="sidebar">
        <img 
          className="sidebar--centered" 
          src="images/logo.png" 
          alt="Interview Scheduler"
        />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {appointmentList}
        <Appointment key="last" time="5pm"/>
      </section>
    </main>
  );
}
