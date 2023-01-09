import React from "react";
import { useTranslation } from 'next-i18next';
import Carousel from "react-bootstrap/Carousel";

import Rating from "../components/Rating";
import LinkIf from "../components/LinkIf";
import { useAPI } from "../utils/hooks";
import { getTestimonials } from "../api/base";

export const SidebarTestimonials = ({ items }) => {
  const { t } = useTranslation();
  return (
    <div className="sidebar__testimonials sidebar-testimonials">
      <a
        href="https://www.google.com/maps/place/TheSailmaster.si+-+najem+jadrnice,+katamarana,+jahte/@46.0624786,14.5115861,17z/data=!3m1!4b1!4m7!3m6!1s0x477acd357b03fa45:0xdf35888269b1eab6!8m2!3d46.0624786!4d14.5137748!9m1!1b1"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="google-review-icon"
          src="/static/media/GoogleReview_logo.png"
          alt={t("testimonials_more")}
        />
      </a>
      <Carousel
        indicators={false}
        interval={30000}
        className="sidebar-testimonials__carousel"
      >
        {items.map((item, index) => {
          const image = item.image.thumbnail || item.profile_photo_url;
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

const ConnectedSidebarTestimonials = () => {
  const { i18n } = useTranslation();
  const testimonials = useAPI(getTestimonials, i18n.language);
  if (!testimonials.data) {
    return null
  }
  return (
    <SidebarTestimonials items={testimonials.data.results} />
  )
}


export default ConnectedSidebarTestimonials;
