import React from "react";
import Classes from "./Backdrop";

const backdrop = props => {
  return props.show ? <div className={Classes.Backdrop}></div> : null;
};

export default backdrop;
