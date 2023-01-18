import Link from "next/link";
import { valuesToSearch, parseDestinations } from "utils/search_utils";

import { OFFERS_URL } from "../constants";

const Destination = ({ destination }) => {
  const link =
    OFFERS_URL +
    "?" +
    valuesToSearch({
      destinations: parseDestinations(destination.destination_hash.split("|")),
    });

  return (
    <div className="destination2" style={{ backgroundImage: `url(${destination.image.thumbnail})` }}>
      <Link className="destinations2__link btn btn-lg btn-primary" href={link}>
        {destination.name}
      </Link>
    </div>
  );
};

const Destinations = ({ destinations }) => {
  return (
    <div className="destinations2">
      <div className="row">
        {destinations?.map((destination) => (
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
