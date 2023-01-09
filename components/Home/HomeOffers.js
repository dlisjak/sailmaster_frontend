import React from "react";
import moment from "moment";
import Link from "next/link";
import { useTranslation } from 'next-i18next';
import { Row, Col, Button } from "react-bootstrap";
import HomeOffer from "./HomeOffer";
import { offerLink } from "utils/url_utils";

const HomeOffers = ({ items }) => {
  const { t } = useTranslation();
  const offers = items.map((item, i) => {
    const dateFrom = moment(item.period_from.substring(0, 10)).format(
      "DD.MM.YYYY"
    );
    const dateTo = moment(item.period_to.substring(0, 10)).format("DD.MM.YYYY");

    return (
      <Col xs={12} sm={12} md={4} key={item.id}>
        <HomeOffer
          name={item.yacht.name}
          id={item.id}
          mainPicture={
            item.yacht.main_picture ||
            item.yacht.main_picture_sailmaster.thumbnail
          }
          buildYear={item.yacht.build_year}
          marine={item.yacht.location.name.name}
          region={item.yacht.location.region.name.name}
          country={item.yacht.location.region.country.name.name}
          price={parseFloat(item.client_price)}
          price_list_price={parseFloat(item.price_list_price)}
          category={item.yacht.yacht_model.category.name.name}
          model={item.yacht.yacht_model.name}
          berth={item.yacht.berths_total}
          cabins={item.yacht.cabins_total}
          length={item.yacht.yacht_model.loa}
          draft={item.yacht.draft}
          wc={item.yacht.wc}
          discount={item.discount}
          date={`${dateFrom} - ${dateTo}`}
          link={offerLink(item)}
        />
      </Col>
    );
  });

  return (
    <div className="home-offers">
      <div className="container">
        <div className="row">{offers}</div>
        <div className="row">
          <Col xs={12} sm={4} smOffset={4}>
            <Link href={t("offers_route")}>
              <Button className="gold-border-button">{t("all_offers")}</Button>
            </Link>
          </Col>
        </div>
      </div>
    </div>
  );
};

export default HomeOffers;
