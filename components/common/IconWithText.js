import React from "react";

const IconWithText = (props) => (
  <div className="icon-with-text">
    <div className="icon-with-text--icon">{props.children}</div>
    <div className="icon-with-text--text">{props.text}</div>
  </div>
);

export default IconWithText;
