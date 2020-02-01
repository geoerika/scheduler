export function getAppointmentsForDay(state, dayName) {

  const dayObjArray = state.days.filter(
                        day => day.name === dayName
                      );

  if (dayObjArray.length === 0) {
    return [];
  } else {
    let appointmentsForDay = [];
    dayObjArray[0].appointments.forEach(
      id => appointmentsForDay.push(state.appointments[`${id}`])
    );
    return appointmentsForDay;
  }
}

export function getInterview(state, interview) {

  if (interview === null) {
    return null;
  } else {
    let interviewObj = {};
    interviewObj.student = interview.student;
    interviewObj.interviewer = state.interviewers[interview.interviewer];
    return interviewObj;
  }
}

export function getInterviewersForDay(state, dayName) {

   const dayObjArray = state.days.filter(
                        day => day.name === dayName
                      );

  if (dayObjArray.length === 0) {
    return [];
  } else {
    let interviewersForDay = [];
    dayObjArray[0].interviewers.forEach(
      id => interviewersForDay.push(state.interviewers[`${id}`])
    );
    return interviewersForDay;
  }
}