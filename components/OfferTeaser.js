import React, { useState } from "react";
import classNames from "classnames";
import { useTranslation } from 'next-i18next';
import Link from "next/link"

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";

import OfferLabel from "./OfferLabel";
import SpecialOffer from "./SpecialOffer";
import Properties from "./Properties";
import Gallery from "./Gallery";

import Heart from "./icons/Heart";
import { formatLength } from "utils/formats";
import { offerLink } from "utils/url_utils";
import PriceBlock from "components/PriceBlock";
import Location from "components/Location";
import Map from "components/Map";

const FeaturedEquipment = ({ items }) => {
  return (
    <div className="featured-equipment">
      {items.map((item, index) => (
        <div key={index} className="featured-equipment__item">
          <img
            className="featured-equipment__img"
            src={`${process.env.PUBLIC_URL}/static/images/featured-equipment/${item.image}`}
            alt={item.name}
          />
          <div className="featured-equipment__name">{item.name}</div>
        </div>
      ))}
    </div>
  );
};

const OfferTeaser = ({
  offer,
  onEnquiry,
  handleHeartClick,
  displayTotalPrice = true,
  inWishlist = false,
}) => {
  const [showMap, setShowMap] = useState(false);
  const { t } = useTranslation();
  const yacht = offer.yacht;
  const yacht_model = yacht.yacht_model;
  const specialOffer = offer.special_offer;
  const wrapperClass = classNames("offer-teaser", {
    "special-offer-wrapper": !!specialOffer,
  });
  const wrapperStyle = {};
  if (specialOffer) {
    if (specialOffer.style) {
      wrapperStyle.boxShadow = `0px 0px 8px ${specialOffer.style}`;
    }
  }
  const yachProperties = [
    { name: t("yacht_type"), value: yacht_model.category_name },
    { name: t("yacht_build_year"), value: yacht.build_year || "/" },
    {
      name: t("number_cabins_berths"),
      value: `${yacht.cabins_total} / ${yacht.berths_total}`,
    },
    { name: t("wc"), value: yacht.wc || "/" },
    { name: t("length"), value: formatLength(yacht_model.loa) },
    { name: t("draft"), value: formatLength(yacht.draft) },
  ];
  const link = offerLink(offer);
  return (
    <>
      <Container fluid className={wrapperClass} style={wrapperStyle}>
        <div className="row">
          <Col md={8}>
            <h3>
              <Link href={link}>{offer.yacht.yacht_model.name}</Link>
            </h3>

            <div className="row">
              <Col md={5} className="offer-teaser__left">
                <div className="offer-teaser__location">
                  <Location location={offer.location_from} onLocationClick={() => setShowMap(!showMap)} />
                </div>

                <div className="offer-teaser__properties">
                  <Properties items={yachProperties} />
                </div>
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowMap(!showMap)}
                  className="offer-teaser__map-button"
                >
                  {showMap ? t("hide_map") : t("show_map")}
                </Button>
              </Col>

              <Col md={7} className="offer-teaser__center">
                <div className="offer-carousel">
                  {offer.label && <OfferLabel label={offer.label} />}
                  <div
                    className={classNames("heart-wrapper", {
                      "heart-wrapper--active": inWishlist,
                    })}
                    onClick={() => handleHeartClick(offer.id)}
                  >
                    <Heart />
                  </div>
                  <Gallery
                    images={offer.yacht.pictures}
                    youtube={offer.yacht.youtube}
                  />
                </div>
              </Col>
            </div>
          </Col>
          <Col md={4} className="offer-teaser__right">
            <PriceBlock
              className="price-block--box price-block--hover"
              offer={offer}
              displayTotalPrice={displayTotalPrice}
            />
            <FeaturedEquipment items={offer.yacht.featured_equipment} />

            <div>
              <Link href={link}>{t("yacht_details")}</Link>

              <Button className="w-100" variant="primary" onClick={onEnquiry}>
                {t("enquiry")}
              </Button>
            </div>
          </Col>
        </div>
        {specialOffer && (
          <div className="row">
            <Col xs={12}>
              <SpecialOffer specialOffer={specialOffer} />
            </Col>
          </div>
        )}
      </Container>
      {showMap && (
        <div className="offer-teaser-map">
          <Map
            lat={parseFloat(offer.location_from.lat)}
            lng={parseFloat(offer.location_from.lon)}
          />
        </div>
      )}
    </>
  );
};

export default OfferTeaser;
