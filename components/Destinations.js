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
          <div
            className="col--destinations2 w-full lg:w-1/4 pr-4 pl-4 md:w-1/3 pr-4 pl-4 sm:w-1/2 pr-4 pl-4"
            key={destination.id}
          >
            <Destination destination={destination} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destinations;
