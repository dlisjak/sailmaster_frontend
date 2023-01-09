import React from "react";

export default function SpecialOffer(props) {
  return (
    <div className="offer-special-offer-badge">
      <img alt="{ props.specialOffer.name }" src={props.specialOffer.image_offer} height="50" />
    </div>
  );
}
