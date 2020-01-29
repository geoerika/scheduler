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
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }))

  const axiosCall = (url) => {
    return axios
            .get(url)
            // .then(response => setDays(response.data)) // old code before making appointments call
            .catch((error) => {
              console.log(error.response.status);
              console.log(error.response.headers);
              console.log(error.response.data);
            })
  };

  useEffect(() => {
    Promise.all([
      Promise.resolve(
        axiosCall('http://localhost:8001/api/days')
      ),
      Promise.resolve(
        axiosCall('http://localhost:8001/api/appointments')
      ),
       Promise.resolve(
        axiosCall('http://localhost:8001/api/interviewers')
      )
    ]).then((all) => {
      console.log('all: ', all);
        setState(prev => ({
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }));
    });
  }, []);

  let dayAppointments = getAppointmentsForDay(state, state.day);

  let appointmentList = dayAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview)
    return <Appointment
              key={appointment.id}
              id={appointment.id}
              time={appointment.time}
              interview={interview}
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
