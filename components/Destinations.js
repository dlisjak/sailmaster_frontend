import Image from "next/image";
import Link from "next/link";
import { valuesToSearch, parseDestinations } from "utils/search_utils";

import { OFFERS_URL } from "../constants";
import { useDestinations } from "../queries/queries";

const Destination = ({ destination }) => {
  const link =
    OFFERS_URL +
    "?" +
    valuesToSearch({
      destinations: parseDestinations(destination.destination_hash.split("|")),
    });

  return (
    <Link className="w-full h-full" href={link}>
      <div className="destination2 w-full flex relative items-center justify-center">
        <img className="object-cover object-center w-full h-full" src={destination.image.thumbnail} alt={`Najem plovil ${destination.name}`} />
        <h3 className="absolute btn btn-lg btn-primary">
          {destination.name}
        </h3>
      </div>
    </Link>
  );
};

const Destinations = ({ items }) => {
  const { destinations } = useDestinations();

  return (
    <div className="destinations2">
      <ul className="row">
        {(destinations || items).results.map((destination) => (
          <li
            className="col--destinations2 w-full lg:w-1/4 pr-[15px] pl-[15px] md:w-1/3 pr-[15px] pl-[15px] sm:w-1/2 pr-[15px] pl-[15px]"
            key={destination.id}
          >
            <Destination destination={destination} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Destinations;
