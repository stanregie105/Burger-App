import React from "react";
import Classes from "./Backdrop.css";

const Backdrop = props => {
  
  return props.show ? (
    <div onClick={props.isPurchasingHandle} className={Classes.Backdrop}></div>
  ) : null;
};

export default Backdrop;
