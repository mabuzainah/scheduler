import React  from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay } from "helpers/selectors";
import { getInterview } from "helpers/selectors";
import { getInterviewersForDay } from "helpers/selectors";
import { useApplicationData } from "hooks/useApplicationData";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

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
