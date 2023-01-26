import Image from "next/image";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import { useTranslation } from 'next-i18next';
import Testimonial from "./common/Testimonial";

import GOOGLE_REVIEW from "../public/media/GoogleReview_logo.png";
import { useTestimonials } from "../queries/queries";

const Testimonials = ({ items }) => {
  const { t } = useTranslation("common");
  const { testimonials } = useTestimonials();

  return (
    <div className="testimonial-wrapper testimonials testimonials--standalone mb-3">
      <Container className="page-home__block">
        <div className="page-home__title">
          <h2>{t("testimonials_title")}</h2>
        </div>
        <div className="row">
          {(testimonials || items).results.map((item, index) => {
            const image = item.profile_photo_url || item.image.thumbnail;
            const country = item.country ? item.country.name : null;
            return (
              <div className="md:w-1/4 pr-4 pl-4 sm:w-1/2 pr-4 pl-4 w-full"
                key={`testimonial-${index}`}
              >
                <Testimonial
                  image={image}
                  name={item.name}
                  text={item.opinion}
                  country={country}
                  source={item.source}
                  rating={item.rating}
                  author_url={item.author_url}
                />
              </div>
            );
          })}
        </div>
        <div className="row">
          <div className="w-full">
            <Link
              href="https://www.google.com/maps/place/TheSailmaster.si+-+najem+jadrnice,+katamarana,+jahte/@46.0624786,14.5115861,17z/data=!3m1!4b1!4m7!3m6!1s0x477acd357b03fa45:0xdf35888269b1eab6!8m2!3d46.0624786!4d14.5137748!9m1!1b1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="google-review-icon"
                src={GOOGLE_REVIEW}
                width={150}
                height={75}
                alt={t("testimonials_more")}
              />
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Testimonials;
