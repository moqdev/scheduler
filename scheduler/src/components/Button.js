import React from "react";
import "./Button.scss";

const classname = require("classnames");

export default function Button(props) {
  const buttonClass = classname("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger,
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