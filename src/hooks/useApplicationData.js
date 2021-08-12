import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  // const setDay = day => setState((prev) => ({ ...prev, day }));
  const setDay = day => setState({...state, day});

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  //spots function
  const updateSpots = function (appointmentId, appointments) {
    let appointmentCounter = 0;
    const matchingDay = state.days.find((day) =>
      day.appointments.includes(appointmentId)
    );
    //# of appointments booked in previous state
    matchingDay.appointments.forEach((appointment) => {
      if (appointments[appointment].interview === null) {
        appointmentCounter += 1;
      }
    });

    const updatedDayArr = state.days.map((day) => {
      if (day.name === matchingDay.name) {
        return { ...matchingDay, spots: appointmentCounter };
      }
      return day;
    });
    return updatedDayArr;
  };

  function bookInterview(id, interview) {
    const putURL = "/api/appointments";
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return new Promise((resolve, reject) => {
      return axios
        .put(`${putURL}/${id}`, appointment)
        .then((response) => {
          const updatedSpotsArr = updateSpots(id, appointments);
          setState({
            ...state,
            appointments,
            days: updatedSpotsArr,
          });
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  const deleteInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const putURL = "/api/appointments";
    return new Promise((resolve, reject) => {
      return axios
        .delete(`${putURL}/${id}`)
        .then((response) => {
          const updatedSpotsArr = updateSpots(id, appointments);
          setState({
            ...state,
            appointments,
            days: updatedSpotsArr,
          });
          resolve(response);
        })
        .catch((e) => {
          reject(e);
        });
    });
  };
  return { state, setDay, bookInterview, deleteInterview, updateSpots };
}