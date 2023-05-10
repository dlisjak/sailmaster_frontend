import Link from "next/link";

import { useDestinations } from "../queries/queries";

const getUrl = (destinationName) => {
  switch (destinationName) {
    case "Hrvaška":
      return "/hrvaska";
    case "Istra":
      return "/istra";
    case "Kvarner":
      return "/kvarner";
    case "Zadarska regija":
      return "/zadar";
    case "Šibenska regija":
      return "/sibenik";
    case "Splitska regija":
      return "/split";
    case "Dubrovnik regija":
      return "/dubrovnik";
    case "Črna gora":
      return "/crna-gora";
    case "Slovenija":
      return "/slovenija";
    default:
      return "/";
  }
}

const Destination = ({ destination }) => {
  const url = `/najem-plovil${getUrl(destination.name)}`

  return (
    <Link className="w-full h-full" href={url}>
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
