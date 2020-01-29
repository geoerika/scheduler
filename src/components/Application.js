import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DayList from './DayList';
import Appointment from 'components/Appointment/index';
import { getAppointmentsForDay } from '../helpers/selectors';

import "components/Application.scss";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }))

  useEffect(() => {
    Promise.all([
      Promise.resolve(
        axios
          .get('http://localhost:8001/api/days')
          // .then(response => setDays(response.data)) // old code before making appointments call
          .catch((error) => {
            console.log(error.response.status);
            console.log(error.response.headers);
            console.log(error.response.data);
          })
      ),
      Promise.resolve(
        axios
          .get('http://localhost:8001/api/appointments')
          .catch((error) => {
            console.log(error.response.status);
            console.log(error.response.headers);
            console.log(error.response.data);
          }))
    ]).then((all) => {
      console.log('all: ', all);
        setState(prev => ({ days: all[0].data, appointments: all[1].data }));
    });
  }, []);

  let dayAppointments = getAppointmentsForDay(state, state.day);

  let appointmentList = dayAppointments.map(appointment => {
    return <Appointment
              key={appointment.id}
              {...appointment}
            />
  });


  getAppointmentsForDay(state, state.day)

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}/>
        <nav className="sidebar__menu"/>
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
