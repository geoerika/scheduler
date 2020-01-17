import React from "react";
import InterviewerListItem from 'components/InterviewerListItem';
import "components/InterviewerList.scss";

export default function InterviewerList(props) {

  let interviewerList = props.interviewers.map(interviewer => (
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      selected={interviewer.id === props.interviewer}
      avatar={interviewer.avatar}
      setInterviewer={() => props.setInterviewer(interviewer.id)}
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
