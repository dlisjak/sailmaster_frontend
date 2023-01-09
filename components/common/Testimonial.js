import React from "react";

import Rating from "components/Rating";
import LinkIf from "components/LinkIf";

const Testimonial = (props) => {
  const country = props.country ? " - " + props.country : "";
  return (
    <div className="testimonial">
      <div className="testimonial-image">
        <LinkIf link={props.author_url}>
          <img
            src={props.image}
            className="img-circle img-fluid"
            alt={props.name}
          />
        </LinkIf>
      </div>
      <div className="testimonial-name">
        <LinkIf link={props.author_url}>
          <span>{props.name}</span>
        </LinkIf>
        {country}
      </div>
      {props.rating && (
        <div className="testimonial-rating">
          <Rating rating={props.rating} />
        </div>
      )}
      <div className="testimonial-text">{props.text}</div>
    </div>
  );
};

export default Testimonial;
