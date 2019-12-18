import React from "react";
import "components/Button.scss";
let classNames = require('classnames');

export default function Button(props) {
  // let buttonClass = 'button';

  // if (props.confirm) {
  //   buttonClass += ' button--confirm';
  // }

  // if (props.danger) {
  //   buttonClass += ' button--danger';
  // }

  const buttonClass = classNames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger
  });
 
  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
