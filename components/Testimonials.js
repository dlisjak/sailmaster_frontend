import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useTranslation } from 'next-i18next';
import Testimonial from "components/common/Testimonial";

const Testimonials = ({ items }) => {
  const { t } = useTranslation();
  return (
    <div className="testimonial-wrapper testimonials testimonials--standalone mb-3">
      <Container className="page-home__block">
        <div className="page-home__title">
          <h2>{t("testimonials_title")}</h2>
        </div>
        <div className="row">
          {items.map((item, index) => {
            const image = item.image.thumbnail || item.profile_photo_url;
            const country = item.country ? item.country.name : null;
            return (
              <Col
                xs={12}
                sm={6}
                md={3}
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
              </Col>
            );
          })}
        </div>
        <div className="row">
          <Col xs={12}>
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
          </Col>
        </div>
      </Container>
    </div>
  );
};

export default Testimonials;
