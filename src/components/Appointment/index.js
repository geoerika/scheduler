import React from "react";

import 'components/Appointment/styles.scss';
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const EDIT = 'EDIT';

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview);
    transition(SHOW);
  }

  function deleteInterview(id) {
    transition(CONFIRM);
    props.cancelInterview(props.id);
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty
                            onAdd={() => transition(CREATE)}
                          />}
      {mode === SHOW &&
        <Show
          student={props.interview.student}
          interviewer={ props.interview.interviewer.name}
          onDelete = { deleteInterview }
          onEdit = { () => transition(EDIT) }
        />}
      {mode === CREATE && <Form
                             interviewers={ props.interviewers }
                             onSave={ save }
                             onCancel={() => back(EMPTY)}
                          />}
      {mode === SAVING && <Status
                            message={'Saving..'}
                          />}
      {mode === CONFIRM && <Confirm
                            message={'Are you sure you would like to delete?'}
                            onConfirm={() => transition(EMPTY)}
                          />}
      {mode === EDIT && <Form
                          name={ props.interview.student }
                          interviewer={ props.interview.interviewer.name }
                          interviewers={ props.interviewers }
                          value={ props.interview.interviewer.id }
                          onSave={ save }
                        />}
    </article>)
}