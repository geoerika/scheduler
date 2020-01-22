import React from "react";

import 'components/Appointment/styles.scss';
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";

export default function Appointment(props) {

  let showEmpty = () => {
    return props.interview ? <Show interview={props.interview}/> : <Empty/>;
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {props.interview ? (<Show interview={props.interview}/>) : (<Empty/>) }
    </article>)
}