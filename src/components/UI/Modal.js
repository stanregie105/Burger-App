import React from "react";

import Backdrop from "./Backdrop/Backdrop";
import Classes from "./Modal.css";
import Aux from "../../hoc/Aux";

export default function Modal(props) {
  return (
    <Aux>
      <Backdrop
        isPurchasingHandle={props.isPurchasingHandle}
        show={props.show}
      ></Backdrop>
      <div
        style={
          props.show
            ? { transform: "translateX(0)" }
            : { transform: "translateX(-100vw)" }
        }
        className={Classes.Modal}
      >
        {props.children}
      </div>
    </Aux>
  );
}
