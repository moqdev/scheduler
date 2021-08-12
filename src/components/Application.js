import React from "react";
import "./Application.scss";
import DayList from "./daylist";
import Appointment from "./Appointment";
import {
  getInterviewersForDay,
  getInterview,
  getAppointmentsForDay,
} from "../helper/selector";
import useApplicationData from "../hooks/useApplicationData";

export default function Application() {
  const { state, setDay, bookInterview, deleteInterview, updateSpots } =
    useApplicationData();
  const interviewers = getInterviewersForDay(state, state.day);
  const dailyAppointments = getAppointmentsForDay(state, state.day);

const parsedAppointments = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        deleteInterview={deleteInterview}
        applicationState={state}
        applicationStateDay={state.day}
        updateSpots={updateSpots}
      />
    );
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
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">{parsedAppointments}</section>
    </main>
  );
}