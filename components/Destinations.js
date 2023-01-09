import React from "react";
import Link from "next/link";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { valuesToSearch, parseDestinations } from "utils/search_utils";
import { OFFERS_URL } from "../constants";

const Destination = ({ destination }) => {
  const style = {
    backgroundImage: `url(${destination.image.thumbnail})`,
  };
  const link =
    OFFERS_URL +
    "?" +
    valuesToSearch({
      destinations: parseDestinations(destination.destination_hash.split("|")),
    });
  return (
    <div className="destination2 destinations2__link btn btn-lg btn-primary" style={style}>
      <Link href={link}>
        {destination.name}
      </Link>
    </div>
  );
};

const Destinations = ({ items }) => {
  return (
    <div className="destinations2">
      <div className="row">
        {items.map((destination) => (
          <Col
            key={destination.id}
            sm="6"
            md="4"
            lg="3"
            className="col--destinations2"
          >
            <Destination destination={destination} />
          </Col>
        ))}
      </div>
    </div>
  );
};

export default Destinations;
