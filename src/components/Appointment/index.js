import React from "react";

import 'components/Appointment/styles.scss';
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const EDIT = 'EDIT';
const DELETE = 'DELETE';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';

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

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

  async function deleteInterview(id) {

    transition(DELETE, true);

    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  }

  return (

    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty
                            onAdd={() => transition(CREATE)}
                          />}
      {mode === SHOW && <Show
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
                            onCancel= { () => back(SHOW)}
                          />}
      {mode === EDIT && <Form
                          name={ props.interview.student }
                          interviewer={ props.interview.interviewer.name }
                          interviewers={ props.interviewers }
                          value={ props.interview.interviewer.id }
                          onSave={ save }
                          onCancel={ () => back(SHOW) }
                        />}
      {mode === ERROR_SAVE && <Error
                                message={'There was an error when saving appointment.'}
                                onClose={ () => back(Form) }
                              />}
      {mode === ERROR_DELETE && <Error
                                  message={'There was an error when deleting appointment.'}
                                  onClose={ () => back(SHOW) }
                                />}
    </article>)
}