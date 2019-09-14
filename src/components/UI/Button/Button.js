import React from "react";
import classes from "./Button.css";

export default function Button(props) {
  console.log(props);
  return (
    <button
      onClick={props.clicked}
      className={[classes.Button, classes[props.btnType]].join(" ")}
    >
      {props.children}
    </button>
  );
}
