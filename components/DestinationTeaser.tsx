const DestinationTeaser = ({ destination }) => {
  if (!destination) return <></>;
  return (
    <div className="destination-teaser mb-2">
      <div className="row">
        <div className="w-full pl-[15px] pr-[15px] sm:w-2/5">
          {destination?.image && (
            <img
              className="destination-teaser__img img-fluid"
              src={destination?.image.thumbnail}
              alt={destination?.name}
            />
          )}
        </div>
        <div className="w-full pl-[15px] pr-[15px] sm:w-3/5">
          <h1 className="destination-title text-2xl">{destination?.name}</h1>
          <div
            className="destination-teaser__text"
            dangerouslySetInnerHTML={{ __html: destination?.text }}
          />
        </div>
      </div>
    </div>
  );
};

export default DestinationTeaser;
