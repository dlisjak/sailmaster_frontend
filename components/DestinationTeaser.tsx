import Image from 'next/image';

const DestinationTeaser = ({ destination }) => {
  if (!destination) return;
  return (
    <div className="destination-teaser mb-2">
      <div className="row">
        <div className="w-full pr-[15px] pl-[15px] sm:w-2/5">
          {destination?.image && (
            <Image
              className="destination-teaser__img img-fluid"
              src={`${process.env.NEXT_PUBLIC_DOMAIN_URL}${destination?.image.thumbnail}`}
              alt={destination?.name}
              width={325}
              height={217}
            />
          )}
        </div>
        <div className="w-full pr-[15px] pl-[15px] sm:w-3/5">
          <h3 className="destination-title">{destination?.name}</h3>
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
