import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import Carousel from 'react-bootstrap/Carousel';

import Rating from './Rating';
import LinkIf from './LinkIf';

import GOOGLE_REVIEW from '../public/media/GoogleReview_logo.png';
import { useTestimonials } from '../queries/queries';

export const SidebarTestimonials = () => {
  const { testimonials } = useTestimonials();
  const { t } = useTranslation();

  if (!testimonials?.results) {
    return null;
  }

  return (
    <div className="sidebar__testimonials sidebar-testimonials">
      <Link
        href="https://www.google.com/maps/place/TheSailmaster.si+-+najem+jadrnice,+katamarana,+jahte/@46.0624786,14.5115861,17z/data=!3m1!4b1!4m7!3m6!1s0x477acd357b03fa45:0xdf35888269b1eab6!8m2!3d46.0624786!4d14.5137748!9m1!1b1"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image className="google-review-icon" src={GOOGLE_REVIEW} alt={t('testimonials_more')} />
      </Link>
      <Carousel indicators={false} interval={30000} className="sidebar-testimonials__carousel">
        {testimonials?.results.map((item, index) => {
          const country = item.country ? item.country.name : null;

          return (
            <Carousel.Item key={index}>
              <div className="testimonial">
                <div className="testimonial-text">{item.opinion}</div>
                <div className="testimonial-footer">
                  <div className="testimonial-rating">
                    {item.rating && <Rating rating={item.rating} />}
                  </div>
                  <div className="testimonial-name">
                    <LinkIf link={item.author_url}>
                      <span>{item.name}</span>
                    </LinkIf>
                    {country}
                  </div>
                </div>
              </div>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
};

export default SidebarTestimonials;
