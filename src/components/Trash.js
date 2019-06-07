import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

import "./Trash.css";

const Heart = props => (
  <FontAwesomeIcon
    className="ourIcon"
    icon={faTrashAlt}
    color="grey"
    onClick={props.onClick}
  />
);

export default Heart;
