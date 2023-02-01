import Link from "next/link";
import Image from "next/image";

import Rating from "../Rating";

const Testimonial = ({ country, author_url, image, name, rating, text }) => {
  const modifiedCountry = country ? " - " + country : "";

  return (
    <div className="testimonial">
      <div className="testimonial-image">
        <Link href={author_url}>
          <div className="img-circle img-fluid">
            <Image
              src={image}
              width={150}
              height={150}
              alt={name}
            />
          </div>
        </Link>
      </div>
      <div className="testimonial-name">
        <Link href={author_url}>
          <h3>{name}</h3>
        </Link>
        {modifiedCountry}
      </div>
      {rating && (
        <div className="testimonial-rating">
          <Rating rating={rating} />
        </div>
      )}
      <div className="testimonial-text">{text}</div>
    </div>
  );
};

export default Testimonial;
