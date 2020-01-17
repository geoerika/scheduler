import React from "react";
import DayListItem from 'components/DayListItem';

export default function DayList(props) {

  let dayList = props.days.map(day => (
        <DayListItem key={day.id}
                     spots={day.spots}
                     selected={day.name === props.day}
                     setDay={() => props.setDay(day.name)}/>
  ));

  return (
    <ul>
      {dayList}
    </ul>
  );
}
