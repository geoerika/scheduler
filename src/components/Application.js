import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DayList from './DayList';
import Appointment from 'components/Appointment/index';

import "components/Application.scss";

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//     interview: {
//       student: "Anna Gables",
//       interviewer: {
//         id: 3,
//         name: "Mildred Nazir",
//         avatar: "https://i.imgur.com/T2WwVfS.png"
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Jerry McGuire",
//       interviewer: {
//         id: 5,
//         name: "Sven Jones",
//         avatar: "https://i.imgur.com/twYrpay.jpg"
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//     interview: {
//       student: "Tom Petty",
//       interviewer: {
//         id: 2,
//         name: "Tori Malcolm",
//         avatar: "https://i.imgur.com/Nmx0Qxo.png"
//       }
//     }
//   }
// ];

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
          // .then(response => setDays(response.data))
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

  // let appointmentList = appointments.map(appointment => {
  //   return <Appointment
  //             key={appointment.id}
  //             {...appointment}
  //           />
  // });

  let appointmentList = [];
  for (const appointment in state.appointments) {
    appointmentList.push(
      <Appointment
        key={state.appointments[appointment].id}
        {...state.appointments[appointment]}
      />)
  }

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
