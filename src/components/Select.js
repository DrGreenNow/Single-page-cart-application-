import React from "react";

import "./Select.css";

const select = props => {
  return (
    <label>
      <select onChange={props.handleChange.bind(this, props.data)}>
        {props.data.nodes.map(element => (
          <option key={element.id} value={element.id}>
            {element.model}
          </option>
        ))}
      </select>
    </label>
  );
};

export default select;
