import React from "react";

export default function OfferLabel(props) {
  return (
    <div
      className="offer-label"
      style={{
        background: props.label.style,
      }}
    >
      {props.label.name}
    </div>
  );
}
