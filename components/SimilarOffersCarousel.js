import React from "react";
import Slider from "react-slick";
import classnames from "classnames";

import { formatPeriod, formatMoneyAmount } from "utils/formats";
import { offerUrl } from "utils/url_utils";
import Link from "next/link";
import { useTranslation } from 'next-i18next';

import "../node_modules/slick-carousel/slick/slick-theme.css"

const SimiliarOffer = ({ offer, current, link }) => {
  const { t } = useTranslation("common");
  const classNames = classnames("similar-offers__offer", {
    "similar-offers__offer--disabled": !offer.final_price,
    "similar-offers__offer--current": current,
    "similar-offers__offer--available": offer.final_price && !current,
  });
  const period = formatPeriod(offer.period_from, offer.period_to);
  return (
    <div className={classNames}>
      <div className="similar-offers__offer-period">
        {link ? <Link scroll={false} href={link}>{period}</Link> : period}
      </div>
      <div className="similar-offers__offer-price">
        {!offer.final_price
          ? t("similar-offer__not-available")
          : formatMoneyAmount(offer.final_price)}
      </div>
    </div>
  );
};

const SimilarOffersCarousel = ({
  yachtId,
  modelName,
  offers,
  currentOffer,
}) => {
  const current = offers.findIndex(item => item.id === currentOffer)
  const settings = {
    draggable: false,
    slidesToScroll: 2,
    initialSlide: Math.max(current - 2, 0),
    //infinite: false,
    variableWidth: true,
  };
  return (
    <div className="similar-offers">
      <Slider {...settings} >
        {offers.map((offer) => {
          const current = currentOffer === offer.id;
          const link =
            !offer.final_price || current
              ? null
              : offerUrl(yachtId, modelName, offer.id);
          return <SimiliarOffer key={offer.id} current={current} offer={offer} link={link} />;
        })}
      </Slider>
    </div>
  );
};

export default SimilarOffersCarousel;
