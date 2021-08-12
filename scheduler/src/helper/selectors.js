export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  let appointments;
  for (const dayObj of state.days) {
    if (dayObj.name === day) {
      appointments = [...dayObj.appointments];
    }
  }
  if (!appointments) {
    return [];
  }
  let dayAppointments = [];
  for (const appointment of appointments) {
    dayAppointments.push({ ...state.appointments[appointment] });
  }
  return dayAppointments;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewerInfo = state.interviewers[interview.interviewer];
  return {
    student: interview.student,
    interviewer: interviewerInfo,
  };
}

const matchIds = (appointments, ids) => {
  const matched = ids.map((id) => appointments[id]);
  return matched;
};

export function getInterviewersForDay(state, day) {
  let interviewersArr = [];
  state.days.map((dayObj) => {
    if (dayObj.name === day) {
      dayObj.interviewers.forEach((interviewerId) =>
        interviewersArr.push(interviewerId)
      );
    }
  });
  return matchIds(state.interviewers, interviewersArr);
}