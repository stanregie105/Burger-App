import React from "react";
import Classes from "./Modal.css";

export default function Modal(props) {
  return <div className={Classes.Modal}>{props.children}</div>;
}
