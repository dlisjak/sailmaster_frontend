import classnames from "classnames";
import chunk from "lodash/chunk";
import zip from "lodash/zip";

import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useTranslation } from 'next-i18next';
import ImageGallery from "react-image-gallery";
import { Helmet } from "react-helmet";
import { useRouter } from 'next/router'
import Link from "next/link";

import { LayoutWithSidebar } from "components/BaseLayout";
import QuickContact from "components/QuickContact";
import Location from "components/Location";
import PriceBlock from "components/PriceBlock";
import {
  formatMoneyAmount,
  formatVolume,
  joinPlus,
  formatLength,
  suffix,
  formatPower,
  formatDateLong,
  diffDays,
} from "utils/formats";
import { optionalServices, obligatoryServices } from "utils/offerUtils";
import SimilarOffersCarousel from "components/SimilarOffersCarousel";
import Map from "components/Map";
import { stripHtmlTags } from "utils/miscUtils";
import Faq from "components/Faq";
import SidebarTestimonials from "components/SidebarTestimonials";
import { ReactComponent as Heart } from "icons/priljubljeno.svg";
import { ReactComponent as PinIcon } from "icons/zemljevid1.svg";
import { ReactComponent as ShareIcon } from "icons/deli.svg";
import { ReactComponent as Check } from "icons/check.svg";
import { INSURANCE_URL } from '../constants';

export const OfferImageGalery = ({ offer }) => {
  const items = offer.yacht.pictures.map((url) => ({
    original: url,
    thumbnail: url,
  }));
  return <ImageGallery items={items} />;
};

const Section = ({ title, children }) => (
  <section className="section">
    {title && <h2>{title}</h2>}
    {children}
  </section>
);

const Equipment = ({ category, items }) => {
  const size = Math.ceil(items.length / 2);
  return (
    <Row className="equipment">
      <Col sm={4}>
        <div className="equipment__category">{category}</div>
      </Col>
      {chunk(items, size).map((colItems, colIndex) => (
        <Col key={colIndex} sm={4}>
          {colItems.map((item, index) => (
            <div key={index} className="equipment__item">
              <Check className="equipment__item-check" />
              {item.name}
            </div>
          ))}
        </Col>
      ))}
    </Row>
  );
};

export const ServicePrice = ({ amount, measure, obligatory }) => {
  const { t } = useTranslation();
  const legendClassName = classnames("service-price__legend", {
    "service-price__legend--obligatory": obligatory,
  });
  const legend = obligatory ? t("service_required") : t("service_optional");
  return (
    <div className="service-price">
      {formatMoneyAmount(amount)}
      {measure && ` / ${measure}`}{" "}
      <span className={legendClassName}>{legend}</span>
    </div>
  );
};

const Services = ({ items }) => {
  return (
    <Table className="season-items">
      <tbody>
        {items.map((item, index) => (
          <tr key={index} className="season-items__item">
            <th>
              <strong>{item.name}</strong>
              {item.description && (
                <div className="season-items__description">
                  {item.description}
                </div>
              )}
            </th>
            <td>
              <ServicePrice
                amount={item.price}
                measure={item.price_measure}
                obligatory={item.obligatory}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const AdditionalEquipment = ({ items }) => {
  return (
    <Table className="season-items">
      <tbody>
        {items.map((item, index) => (
          <tr key={index} className="season-items__item">
            <th>
              <strong>{item.name}</strong>{" "}
              {item.comment && (
                <div className="season-items__comment">{item.comment}</div>
              )}
              {item.condition && (
                <div className="season-items__condition">{item.condition}</div>
              )}
            </th>
            <td>
              <ServicePrice
                amount={item.price}
                measure={item.price_measure}
                obligatory={false}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const Attribute = ({ label, value, icon = null, comment = null }) => {
  return (
    <div className="attribute">
      <div className="attribute__label">
        {icon && (
          <img
            className="attribute__icon"
            src={`${process.env.PUBLIC_URL}/static/images/attributes/${icon}`}
            alt={label}
          />
        )}
        {label}
      </div>
      <div className="attribute__value">
        {value}
        {comment && <span className="attribute__value-comment">{comment}</span>}
      </div>
    </div>
  );
};

const BaseAttributes = ({ yacht }) => {
  const { t } = useTranslation();
  const berths = joinPlus(
    yacht.berths_cabin,
    yacht.berths_salon,
    yacht.berths_crew
  );
  const cabins = joinPlus(yacht.cabins, yacht.cabins_crew);
  const col1 = [
    {
      label: t("base_attributes_build_year"),
      value: yacht.build_year,
      icon: "leto-izdelave.svg",
    },
    {
      label: t("base_attributes_number_berths"),
      value: berths,
      icon: "st-lezisc.svg",
    },
    {
      label: t("base_attributes_wc"),
      value: yacht.wc,
      icon: "wc.svg",
    },
    {
      label: t("base_attributes_width"),
      value: formatLength(yacht.yacht_model.beam),
      icon: "sirina.svg",
    },
    {
      label: t("base_attributes_water_tank"),
      value: formatVolume(yacht.water_tank),
      icon: "voda.svg",
    },
    {
      label: t("base_attributes_main_sail_type"),
      value: yacht.sail_type_name,
      icon: "glavno-jadro.svg",
      comment: yacht.sail_renewed && `${t("renewed")}: ${yacht.sail_renewed}`,
    },
  ];
  const col2 = [
    {
      label: t("base_attributes_length"),
      icon: "dolzina.svg",
      value: formatLength(yacht.yacht_model.loa),
    },
    {
      label: t("base_attributes_cabins"),
      value: cabins,
      icon: "kabine.svg",
    },
    {
      label: t("base_attributes_draft"),
      icon: "ugrez.svg",
      value: formatLength(yacht.draft),
    },
    {
      label: t("base_attributes_engine_power"),
      value: suffix(yacht.engines, " X ") + formatPower(yacht.engine_power),
      icon: "motor.svg",
    },
    {
      label: t("base_attributes_fuel_tank"),
      value: formatVolume(yacht.fuel_tank),
      icon: "gorivo.svg",
    },
    {
      label: t("base_attributes_genoa"),
      value: yacht.genoa_type_name,
      icon: "genova.svg",
      comment: yacht.genoa_renewed && `${t("renewed")}: ${yacht.genoa_renewed}`,
    },
  ];
  return (
    <div className="base-attributes">
      {zip(col1, col2).map((row, index) => (
        <Row key={index}>
          <Col sm="6">
            <Attribute
              label={row[0].label}
              value={row[0].value}
              icon={row[0].icon}
            />
          </Col>
          <Col sm="6">
            <Attribute
              label={row[1].label}
              value={row[1].value}
              icon={row[1].icon}
            />
          </Col>
        </Row>
      ))}
    </div>
  );
};

const OfferSelectedPeriod = ({ offer, onEnquiry }) => {
  const { t } = useTranslation();

  return (
    <div className="offer-selected-period">
      <Container>
        <Row className="offer-selected-period__header">
          <Col sm={6} className="offer-selected-period__period">
            <div className="offer-selected-period__label">
              {t("offer-selected-period__period-from")}
            </div>
            <div className="offer-selected-period__date">
              {formatDateLong(offer.period_from)}
            </div>
          </Col>
          <Col sm={6} className="offer-selected-period__period">
            <div className="offer-selected-period__label">
              {t("offer-selected-period__period-to")}
            </div>
            <div className="offer-selected-period__date">
              {formatDateLong(offer.period_to)}
            </div>
          </Col>
        </Row>
      </Container>
      <div className="offer-selected-period__other-dates">
        <SimilarOffersCarousel
          yachtId={offer.yacht.id}
          modelName={offer.yacht.yacht_model.name}
          offers={offer.similar_offers}
          currentOffer={offer.id}
        />
      </div>
      <Row className="offer-selected-period__main">
        <Col sm={6} className="offer-selected-period__info">
          <div className="offer-selected-period__info-name">
            {offer.yacht.yacht_model.category_name} -{" "}
            {offer.yacht.yacht_model.name}
          </div>
          <PriceBlock offer={offer} />
          <div className="offer-selected-period__info-price-period">
            {t("offer-selected-period__info-price-period", {
              numDays: diffDays(offer.period_to, offer.period_from),
            })}
          </div>
        </Col>
        <Col sm={6} className="offer-selected-period__inquiry">
          <Button
            size="lg"
            className="btn--inquiry"
            variant="secondary"
            onClick={onEnquiry}
          >
            {t("offer-selected-period__inquiry")}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

const OfferDetail = ({
  offer,
  searchComponent,
  inWishlist,
  handleHeartClick,
  setShowEnquiryModal,
  testimonials,
}) => {
  const [showMap, setShowMap] = useState(false);
  const router = useRouter()
  const { t } = useTranslation();
  const yacht = offer.yacht;
  const yacht_model = yacht.yacht_model;
  const services = obligatoryServices(
    t,
    offer.season_specific_data.services,
    yacht.deposit,
    offer.location_from.country_code
  );
  const optServices = optionalServices(offer.season_specific_data.services);
  const pageTitle = `${yacht_model.category_name} - ${yacht_model.name}`;
  const emailLink = `mailto:?subject=${pageTitle}&body=${window.location.href}`;

  return (
    <LayoutWithSidebar
      className="container--offer offer-detail"
      sidebar={
        <>
          <div className="vertical-space-half">
            <Button
              className="w-100 mb-1"
              variant="secondary"
              onClick={() => setShowEnquiryModal(true)}
            >
              {t("enquiry")}
            </Button>
            <Button
              onClick={() => router.back()}
              className="w-100 mb-1"
              variant="outline-secondary"
            >
              {t("offer_back_button")}
            </Button>
          </div>
          <div className="d-none d-md-block">
            {searchComponent}
            <QuickContact />

            <SidebarTestimonials items={testimonials} />

            <Link href={INSURANCE_URL}>
              <img
                className="img-fluid"
                src="/static/media/yacht-pool-Financial_System_2022.jpg"
                alt={t("insurance")}
              />
            </Link>
          </div>
        </>
      }
    >
      <Helmet>
        <title>
          {pageTitle} {t("seo_title")}
        </title>
        <meta
          name="description"
          content={stripHtmlTags(yacht.get_description)}
        />
      </Helmet>
      <>
        <div className="offer-detail__header">
          <h1>{pageTitle}</h1>
          <div className="offer-detail__header-line">
            <Location
              location={offer.location_from}
              onLocationClick={() => setShowMap(!showMap)}
            />
            <div className="offer-detail__buttons">
              <Button href={emailLink} variant="info">
                <ShareIcon />
                {t("offer_share_email")}
              </Button>
              <Button variant="info" onClick={handleHeartClick}>
                <Heart />
                {inWishlist ? t("wishlist_remove") : t("wishlist_add")}
              </Button>
              <Button variant="info" onClick={() => setShowMap(!showMap)}>
                <PinIcon />
                {showMap ? t("hide_map") : t("show_map")}
              </Button>
            </div>
          </div>
        </div>

        {showMap && (
          <div className="offer-teaser-map">
            <Map
              lat={parseFloat(offer.location_from.lat)}
              lng={parseFloat(offer.location_from.lon)}
            />
          </div>
        )}

        <Section>
          <OfferImageGalery offer={offer} />
        </Section>

        <Section>
          <BaseAttributes yacht={yacht} />
        </Section>

        <Section title={t("offer_yacht_selected_period")}>
          <OfferSelectedPeriod
            offer={offer}
            onEnquiry={() => setShowEnquiryModal(true)}
          />
        </Section>

        {yacht.get_description && (
          <Section title={t("offer_yacht_description")}>
            <div
              className="offer__description"
              dangerouslySetInnerHTML={{ __html: yacht.get_description }}
            />
          </Section>
        )}

        <Section title={t("offer_yacht_equipment")}>
          {yacht.grouped_equipment.map((group, index) => (
            <Equipment
              key={index}
              category={group.category || t("offer_yacht_equipment_other")}
              items={group.items}
            />
          ))}
        </Section>
        {!!services.length && (
          <Section title={t("offer_yacht_obligatory_services")}>
            <Services items={services} />
          </Section>
        )}
        {!!optServices.length && (
          <Section title={t("offer_yacht_services")}>
            <Services items={optServices} />
          </Section>
        )}
        {!!offer.season_specific_data.equipment.length && (
          <Section title={t("offer_yacht_additional_equipment")}>
            <AdditionalEquipment items={offer.season_specific_data.equipment} />
          </Section>
        )}

        <Section>
          <div className="text-right">
            <Button
              size="lg"
              variant="secondary"
              className="btn--inquiry"
              onClick={() => setShowEnquiryModal(true)}
            >
              {t("send_enquiry")}
            </Button>
          </div>
        </Section>

        <Section title={t("offer_faq")}>
          <Faq
            items={[
              { title: t("faq_1_title"), content: t("faq_1_content") },
              { title: t("faq_2_title"), content: t("faq_2_content") },
              { title: t("faq_3_title"), content: t("faq_3_content") },
              { title: t("faq_4_title"), content: t("faq_4_content") },
              { title: t("faq_5_title"), content: t("faq_5_content") },
            ]}
          />
        </Section>
      </>
    </LayoutWithSidebar>
  );
};

export default OfferDetail;
