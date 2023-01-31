import { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import { Helmet } from 'react-helmet';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import classnames from 'classnames';
import chunk from 'lodash/chunk';
import zip from 'lodash/zip';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

import { LayoutWithSidebar } from './BaseLayout';
import QuickContact from './QuickContact';
import Location from './Location';
import PriceBlock from './PriceBlock';
import Faq from './Faq';
import {
  formatMoneyAmount,
  formatVolume,
  joinPlus,
  formatLength,
  suffix,
  formatPower,
  formatDateLong,
  diffDays,
} from '../utils/formats';
import { optionalServices, obligatoryServices } from '../utils/offerUtils';
import SimilarOffersCarousel from './SimilarOffersCarousel';
import GoogleMap from './Googlemap';
import { stripHtmlTags } from '../utils/miscUtils';
import SidebarTestimonials from './SidebarTestimonials';

import Heart from '../public/icons/priljubljeno.svg';
import PinIcon from '../public/icons/zemljevid1.svg';
import ShareIcon from '../public/icons/deli.svg';
import Check from '../public/icons/check.svg';
import { INSURANCE_URL } from '../constants/urls';

import ZAVAROVANJE_IMAGE from "../public/media/yacht-pool-Financial_System_2022.jpg"

export const OfferImageGalery = ({ offer }) => {
  const items = offer.yacht.pictures.map((url, i) => {
    const alt = `${offer.yacht.yacht_model.category_name} ${offer.yacht.yacht_model.name} ${offer.location_from.region_name}, ${offer.location_from.country_name} ${i + 1}`;

    return ({
      thumbnail: url,
      renderItem: () => (
        <div className='relative'>
          <Image src={url} alt={alt} width={825} height={550} priority={i === 0} quality={80} />
        </div>
      ),
      renderThumbInner: () => (
        <div className='relative min-h-[69px]'>
          <Image src={url} alt={`${alt} thumbnail`} width={150} height={100} quality={20} />
        </div>
      )
    })
  });
  return <ImageGallery items={items} />;
};

const Section = ({ title = '', children }) => (
  <section className="section">
    {title && <h2>{title}</h2>}
    {children}
  </section>
);

const Equipment = ({ category, items }) => {
  const size = Math.ceil(items.length / 2);
  return (
    <div className="row flex equipment">
      <div className='w-full sm:w-1/3 pr-4 pl-4'>
        <div className="equipment__category">{category}</div>
      </div>
      {chunk(items, size).map((colItems, colIndex) => (
        <div className='w-full sm:w-1/3 pr-4 pl-4' key={colIndex}>
          {colItems.map((item, index) => (
            <div key={index} className="equipment__item flex items-center">
              <Check className="equipment__item-check" />
              {item.name}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export const ServicePrice = ({ amount, measure, obligatory }) => {
  const { t } = useTranslation("common");
  const legendClassName = classnames('service-price__legend', {
    'service-price__legend--obligatory': obligatory,
  });
  const legend = obligatory ? t('service_required') : t('service_optional');

  return (
    <div className="service-price">
      {formatMoneyAmount(amount)}
      {measure && ` / ${measure}`} <span className={legendClassName}>{legend}</span>
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
                <div className="season-items__description">{item.description}</div>
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
              <strong>{item.name}</strong>{' '}
              {item.comment && <div className="season-items__comment">{item.comment}</div>}
              {item.condition && <div className="season-items__condition">{item.condition}</div>}
            </th>
            <td>
              <ServicePrice amount={item.price} measure={item.price_measure} obligatory={false} />
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
      <div className="attribute__label flex">
        {icon && (
          <Image
            className="mr-2"
            src={`/images/attributes/${icon}`}
            width={24}
            height={24}
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
  const { t } = useTranslation("common");
  const berths = joinPlus(yacht.berths_cabin, yacht.berths_salon, yacht.berths_crew);
  const cabins = joinPlus(yacht.cabins, yacht.cabins_crew);
  const col1 = [
    {
      label: t('base_attributes_build_year'),
      value: yacht.build_year,
      icon: 'leto-izdelave.svg',
    },
    {
      label: t('base_attributes_number_berths'),
      value: berths,
      icon: 'st-lezisc.svg',
    },
    {
      label: t('base_attributes_wc'),
      value: yacht.wc,
      icon: 'wc.svg',
    },
    {
      label: t('base_attributes_width'),
      value: formatLength(yacht.yacht_model.beam),
      icon: 'sirina.svg',
    },
    {
      label: t('base_attributes_water_tank'),
      value: formatVolume(yacht.water_tank),
      icon: 'voda.svg',
    },
    {
      label: t('base_attributes_main_sail_type'),
      value: yacht.sail_type_name,
      icon: 'glavno-jadro.svg',
      comment: yacht.sail_renewed && `${t('renewed')}: ${yacht.sail_renewed}`,
    },
  ];
  const col2 = [
    {
      label: t('base_attributes_length'),
      icon: 'dolzina.svg',
      value: formatLength(yacht.yacht_model.loa),
    },
    {
      label: t('base_attributes_cabins'),
      value: cabins,
      icon: 'kabine.svg',
    },
    {
      label: t('base_attributes_draft'),
      icon: 'ugrez.svg',
      value: formatLength(yacht.draft),
    },
    {
      label: t('base_attributes_engine_power'),
      value: suffix(yacht.engines, ' X ') + formatPower(yacht.engine_power),
      icon: 'motor.svg',
    },
    {
      label: t('base_attributes_fuel_tank'),
      value: formatVolume(yacht.fuel_tank),
      icon: 'gorivo.svg',
    },
    {
      label: t('base_attributes_genoa'),
      value: yacht.genoa_type_name,
      icon: 'genova.svg',
      comment: yacht.genoa_renewed && `${t('renewed')}: ${yacht.genoa_renewed}`,
    },
  ];
  return (
    <div className="base-attributes">
      {zip(col1, col2).map((row, index) => (
        <div className="row" key={index}>
          <div className='w-full sm:w-1/2 pr-4 pl-4'>
            <Attribute label={row[0].label} value={row[0].value} icon={row[0].icon} />
          </div>
          <div className='w-full sm:w-1/2 pr-4 pl-4'>
            <Attribute label={row[1].label} value={row[1].value} icon={row[1].icon} />
          </div>
        </div>
      ))}
    </div>
  );
};

const OfferSelectedPeriod = ({ offer, onEnquiry }) => {
  const { t } = useTranslation("common");

  return (
    <div className="offer-selected-period">
      <Container>
        <div className="row offer-selected-period__header">
          <div className="w-full sm:w-1/2 pr-4 pl-4 offer-selected-period__period">
            <div className="offer-selected-period__label">
              {t('offer-selected-period__period-from')}
            </div>
            <div className="offer-selected-period__date">{formatDateLong(offer.period_from)}</div>
          </div>
          <div className="w-full sm:w-1/2 pr-4 pl-4 offer-selected-period__period">
            <div className="offer-selected-period__label">
              {t('offer-selected-period__period-to')}
            </div>
            <div className="offer-selected-period__date">{formatDateLong(offer.period_to)}</div>
          </div>
        </div>
      </Container>
      <div className="offer-selected-period__other-dates">
        <SimilarOffersCarousel
          yachtId={offer.yacht.id}
          modelName={offer.yacht.yacht_model.name}
          offers={offer.similar_offers}
          currentOffer={offer.id}
        />
      </div>
      <div className="row offer-selected-period__main">
        <div className="w-full sm:w-1/2 pr-4 pl-4 offer-selected-period__info">
          <div className="offer-selected-period__info-name">
            {offer.yacht.yacht_model.category_name} - {offer.yacht.yacht_model.name}
          </div>
          <PriceBlock offer={offer} />
          <div className="offer-selected-period__info-price-period">
            {t('offer-selected-period__info-price-period', {
              numDays: diffDays(offer.period_to, offer.period_from),
            })}
          </div>
        </div>
        <div className="w-full sm:w-1/2 pr-4 pl-4 offer-selected-period__inquiry">
          <Button size="lg" className="btn--inquiry" variant="secondary" onClick={onEnquiry}>
            {t('offer-selected-period__inquiry')}
          </Button>
        </div>
      </div>
    </div>
  );
};

const OfferDetail = ({
  offer,
  searchComponent,
  inWishlist,
  handleHeartClick,
  setShowEnquiryModal,
}) => {
  const [showMap, setShowMap] = useState(false);
  const router = useRouter();
  const { t } = useTranslation("common");
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
  const emailLink = `mailto:?subject=${pageTitle}&body=${router.asPath}`;

  return (
    <>
      <Helmet>
        <title>
          {pageTitle} {t('seo_title')}
        </title>
        <meta name="description" content={stripHtmlTags(yacht.get_description)} />
      </Helmet>
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
                {t('enquiry')}
              </Button>
              <Button
                onClick={() => router.back()}
                className="w-100 mb-1"
                variant="outline-secondary"
              >
                {t('offer_back_button')}
              </Button>
            </div>
            <div className="d-none d-md-block">
              {searchComponent}
              <QuickContact />

              <SidebarTestimonials />

              <Link href={INSURANCE_URL}>
                <Image
                  src={ZAVAROVANJE_IMAGE}
                  alt={t('insurance')}
                  width={255}
                  height={250}
                />
              </Link>
            </div>
          </>
        }
      >
        <>
          <div className="offer-detail__header">
            <h1>{pageTitle}</h1>
            <div className="offer-detail__header-line">
              <Location
                location={offer.location_from}
                onLocationClick={() => setShowMap(!showMap)}
              />
              <div className="offer-detail__buttons flex flex-wrap">
                <Link className="btn btn-info flex items-center" href={emailLink}>
                  <ShareIcon />
                  {t('offer_share_email')}
                </Link>
                <button className="btn btn-info flex items-center" role="button" onClick={handleHeartClick}>
                  <Heart />
                  {inWishlist ? t('wishlist_remove') : t('wishlist_add')}
                </button>
                <button
                  className="btn btn-info flex items-center"
                  role="button"
                  onClick={() => setShowMap(!showMap)}
                >
                  <PinIcon />
                  {showMap ? t('hide_map') : t('show_map')}
                </button>
              </div>
            </div>
          </div>

          {showMap && (
            <div className="offer-teaser-map">
              <GoogleMap
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

          <Section title={t('offer_yacht_selected_period')}>
            <OfferSelectedPeriod offer={offer} onEnquiry={() => setShowEnquiryModal(true)} />
          </Section>

          {yacht.get_description && (
            <Section title={t('offer_yacht_description')}>
              <div
                className="offer__description"
                dangerouslySetInnerHTML={{ __html: yacht.get_description }}
              />
            </Section>
          )}

          <Section title={t('offer_yacht_equipment')}>
            {yacht.grouped_equipment.map((group, index) => (
              <Equipment
                key={index}
                category={group.category || t('offer_yacht_equipment_other')}
                items={group.items}
              />
            ))}
          </Section>
          {!!services.length && (
            <Section title={t('offer_yacht_obligatory_services')}>
              <Services items={services} />
            </Section>
          )}
          {!!optServices.length && (
            <Section title={t('offer_yacht_services')}>
              <Services items={optServices} />
            </Section>
          )}
          {!!offer.season_specific_data.equipment.length && (
            <Section title={t('offer_yacht_additional_equipment')}>
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
                {t('send_enquiry')}
              </Button>
            </div>
          </Section>

          <Section title={t('offer_faq')}>
            <Faq
              items={[
                { title: t('faq_1_title'), content: t('faq_1_content') },
                { title: t('faq_2_title'), content: t('faq_2_content') },
                { title: t('faq_3_title'), content: t('faq_3_content') },
                { title: t('faq_4_title'), content: t('faq_4_content') },
                { title: t('faq_5_title'), content: t('faq_5_content') },
              ]}
            />
          </Section>
        </>
      </LayoutWithSidebar>
    </>
  );
};

export default OfferDetail;
