
import React from "react";
import "components/InterviewerListItem.scss";
let classNames = require('classnames');

export default function InterviewerListItem(props) {

  let interviewerClass=classNames({
    'interviewers__item': true,
    'interviewers__item--selected': props.selected
  });

  return (
    <li className={interviewerClass} onClick={() => props.setInterviewer(props.name)}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt="Sylvia Palmer"
      />
      {props.name}
    </li>
  );
}
