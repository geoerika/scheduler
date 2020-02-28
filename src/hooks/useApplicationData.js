import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {

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

  async function bookInterview(id, interview) {
    // console.log('bookInterview: ', id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // let axiosDone;
    setState({...state, appointments});
    await axios.put(`http://localhost:8001/api/appointments/${id}`,
               { interview : interview })
          .then(function (response) {
            // axiosDone = response;
            console.log('put response: ', response);
          });
  }

  async function cancelInterview(id) {

    await axios.delete(`http://localhost:8001/api/appointments/${id}`)
          .then(function (response) {
            console.log('put response: ', response);
          });

    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({...state, appointments});
  }

  return { state, setDay, bookInterview, cancelInterview }
}