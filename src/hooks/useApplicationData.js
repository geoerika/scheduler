import { useEffect, useReducer } from 'react';
import axios from 'axios';
import update from 'immutability-helper';

export default function useApplicationData() {

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // const SET_DAY = 'SET_DAY';
  // const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
  // const SET_INTERVIEW = 'SET_INTERVIEW';

  function reducer(state, action) {
    switch (action.type) {
      case 'SET_DAY':
        return { ...state, day: action.value }
      case 'SET_APPLICATION_DATA':
        return { ...state, ...action.value }
      case 'SET_INTERVIEW':
        let days = updateDaySpots(state, action);

        return update(state, {
          days: { $set: days },
          appointments: { [action.value.id]: { interview: { $set: action.value.interview }}},
        });

        // code previous using update
        // const appointment = {
        //   ...state.appointments[action.value.id],
        //   interview: action.value.interview
        // }
        // const appointments = {
        //   ...state.appointments,
        //   [action.value.id]: appointment
        // };
        // return { ...newState, days: days, appointments: appointments }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const setDay = day => dispatch({ type: 'SET_DAY', value: day });

  const axiosGet = (url) => {
    return axios
            .get(url)
            .catch((error) => {
              console.log(error.response.status);
              console.log(error.response.headers);
              console.log(error.response.data);
            })
  };

  useEffect(() => {
    let ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    ws.onopen = function (event) {
      ws.send('ping');
    };
    ws.onmessage = event => {
      console.log(`Message Received: ${event.data}`);
      let msg = JSON.parse(event.data);
      let id = msg.id;
      let interview = msg.interview;
      let spots = 0;
      if (msg.interview) {
        spots = -1;
      } else {
        spots = 1;
      }
      if (msg.type === 'SET_INTERVIEW') {
         dispatch({ type: 'SET_INTERVIEW', value: { id, interview, spots }})

      // switch(msg.type) {
      // case 'SET_INTERVIEW':
      //   update(state, {
      //     appointments: { [msg.id]: { interview: { $set: msg.interview }}},
      //   });
      //   break;
      // }
      }
    };
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
          let days = all[0].data;
          let appointments = all[1].data;
          let interviewers = all[2].data;
          dispatch({ type: 'SET_APPLICATION_DATA', value: { days, appointments, interviewers }});
    });
  }, []);

  async function bookInterview(id, interview) {
    await axios.put(`http://localhost:8001/api/appointments/${id}`,
               { interview : interview })
          .then(function (response) {
            console.log('put response: ', response);
          });
  }

  async function cancelInterview(id) {

    await axios.delete(`http://localhost:8001/api/appointments/${id}`)
          .then(function (response) {
            console.log('put response: ', response);
          });
  }

  function updateDaySpots(state, action) {

    return state.days.map((day) => {
      if (day.name !== state.day) {
        return day
      }
      return update(day, {spots: { $set: (day.spots + action.value.spots)}})
      // code previous update
      // {
      //   ...day,
      //   spots: day.spots + action.value.spots
      // }
    })
  }

  return { state, setDay, bookInterview, cancelInterview }
}