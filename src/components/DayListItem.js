import React from "react";
import "components/DayListItem.scss";
let classNames = require('classnames');

export default function DayListItem(props) {

  let dayClass = classNames({
    'day-list__item': true,
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0
  });

  const formatSpots = () => {
    if (props.spots === 0) {
      return 'no spots remaining';
    } else if (props.spots === 1) {
        return '1 spot remaining';
      } else {
          return `${props.spots} spots remaining`;
        }
  };

  return (
    <li className={dayClass} onClick={props.setDay}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}
