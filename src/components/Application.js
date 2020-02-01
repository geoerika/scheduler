import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DayList from './DayList';
import Appointment from 'components/Appointment/index';
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from '../helpers/selectors';

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

  const axiosGet = (url) => {
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
        axiosGet('http://localhost:8001/api/days')
      ),
      Promise.resolve(
        axiosGet('http://localhost:8001/api/appointments')
      ),
       Promise.resolve(
        axiosGet('http://localhost:8001/api/interviewers')
      )
    ]).then((all) => {
        setState(prev => ({
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }));
    });
  }, []);

  let dayAppointments = getAppointmentsForDay(state, state.day);
  let dayInterviewers = getInterviewersForDay(state, state.day);

  function bookInterview(id, interview) {
    // console.log('bookInterview: ', id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({...state, appointments});
    axios.put(`http://localhost:8001/api/appointments/${id}`,
               { interview : interview })
          .then(function (response) {
            console.log('put response: ', response);
          })
          .catch(function (error) {
            console.log(error);
          });
  }

  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({...state, appointments});
    axios.delete(`http://localhost:8001/api/appointments/${id}`)
          .then(function (response) {
            console.log('put response: ', response);
          })
          .catch(function (error) {
            console.log(error);
          });
  }

  let appointmentList = dayAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview)
    return <Appointment
              key={appointment.id}
              id={appointment.id}
              time={appointment.time}
              interview={interview}
              interviewers={dayInterviewers}
              bookInterview={ bookInterview }
              cancelInterview={ cancelInterview }
            />
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
