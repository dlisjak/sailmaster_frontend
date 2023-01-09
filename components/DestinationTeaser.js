import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const DestinationTeaser = ({ destination }) => {
  return (
    <div className="destination-teaser mb-4">
      <div className="row">
        <Col sm={5}>
          {destination.image && (
            <img
              className="destination-teaser__img img-fluid"
              src={destination.image.thumbnail}
              alt={destination.name}
            />
          )}
        </Col>
        <Col sm={7}>
          <h3 className="destination-title">{destination.name}</h3>
          <div
            className="destination-teaser__text"
            dangerouslySetInnerHTML={{ __html: destination.text }}
          />
        </Col>
      </div>
    </div>
  );
};

export default DestinationTeaser;
