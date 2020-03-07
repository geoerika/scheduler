import React from "react";
import InterviewerListItem from 'components/InterviewerListItem';
import "components/InterviewerList.scss";
import PropTypes from 'prop-types';

export default function InterviewerList(props) {

  InterviewerList.prototype = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
  }

  let interviewerList = props.interviewers.map(interviewer => (
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      selected={interviewer.id === props.value}
      avatar={interviewer.avatar}
      setInterviewer={() => props.onChange(interviewer.id)}
    />
  ));

  return (
    <section>
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewerList}
      </ul>
    </section>

  );
}
