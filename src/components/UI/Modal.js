import React from "react";
import Classes from "./Modal.css";
import Aux from "../../hoc/Aux";

export default function Modal(props) {
  return (
    <Aux>
      <div className={Classes.Modal}>{props.children}</div>
    </Aux>
  );
}
