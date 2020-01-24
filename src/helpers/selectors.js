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
