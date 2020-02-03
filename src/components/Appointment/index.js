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
const DELETE = 'DELETE';

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  async function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    try {
      await props.bookInterview(props.id, interview);
    }
    catch(error) {
      console.error(error);
    }
    console.log('after book Interview');
    transition(SHOW);
  }

  async function deleteInterview(id) {
    transition(DELETE);
    await props.cancelInterview(props.id);
    transition(EMPTY);
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
          onDelete={ () => transition(CONFIRM) }
          onEdit={ () => transition(EDIT) }
        />}
      {mode === CREATE && <Form
                             interviewers={ props.interviewers }
                             onSave={ save }
                             onCancel={() => back(EMPTY)}
                          />}
      {mode === SAVING && <Status
                            message={'Saving..'}
                          />}
      {mode === DELETE && <Status
                            message={'Deleting..'}
                          />}
      {mode === CONFIRM && <Confirm
                            message={'Are you sure you would like to delete?'}
                            onConfirm={ deleteInterview }
                          />}
      {mode === EDIT && <Form
                          name={ props.interview.student }
                          interviewer={ props.interview.interviewer.name }
                          interviewers={ props.interviewers }
                          value={ props.interview.interviewer.id }
                          onSave={ save }
                          onCancel={ () => back(SHOW)}
                        />}
    </article>)
}