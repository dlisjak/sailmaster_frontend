import React from "react";

const CaretDown = (props) => {
  if (props.onClick) {
    return (
      <svg
        onClick={props.onClick}
        className={`caret-down ${props.focusClass}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20.88 13.27"
      >
        <title>CaretDown</title>
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_1-2" data-name="Layer 1">
            <polyline
              className="cls-1"
              points="1.41 1.41 10.44 10.44 19.47 1.41"
            />
          </g>
        </g>
      </svg>
    );
  }

  return (
    <svg
      className="caret-down"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20.88 13.27"
    >
      <title>CaretDown</title>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <polyline
            className="cls-1"
            points="1.41 1.41 10.44 10.44 19.47 1.41"
          />
        </g>
      </g>
    </svg>
  );
};

export default CaretDown;
