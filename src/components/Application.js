import React , {useState} from "react";
import { useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day); 
  const appointmentList = dailyAppointments.map(appointment => {
    return (<Appointment
            key= {appointment.id}
            {...appointment}
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
  useEffect(() => {
    Promise.all([
      getDaysAxios(),
      getAppointmentsAxios(),
    ]).then((all) => {
      const [first, second] = all;
      console.log(first, second);
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data}));
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
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
