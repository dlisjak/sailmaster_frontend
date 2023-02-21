import { useEffect, useState } from 'react';
import Head from 'next/head';
import nextI18nextConfig from '../next-i18next.config';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { Row, Col } from 'react-bootstrap';
import { fromJS, List } from 'immutable';
import Alert from 'react-bootstrap/Alert';

import moment from 'moment';
import Link from 'next/link';

import Anchor from '../components/icons/Anchor';
import Close from '../components/icons/Close';

import formatMoney from '../components/common/utils/formatMoney';
import { offerLink } from '../utils/url_utils';

import OfferInquiry from '../components/OfferInquiry';
import { createOfferInquiry } from '../lib/base';
import { useWishlist } from '../queries/queries';
import { getWishlist } from '../queries/getters';

const Wishlist = () => {
  const [offers, setOffers] = useState([]);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [offerId, setOfferId] = useState(null);
  const { t } = useTranslation('common');
  const { wishlist, mutateWishlist } = useWishlist();

  useEffect(() => {
    const fetchOffers = async () => {
      const ar = localStorage.getItem('wishlist');
      if (!ar) return;
      const data = await getWishlist(ar);
      setOffers(data);
    };
    fetchOffers();
  }, [wishlist, mutateWishlist]);

  const openEnquiryModal = () => {
    setShowEnquiryModal(true);
    setOfferId(localStorage.getItem('wishlist'));
  };

  const handleWishlistItemRemove = (id) => {
    let arr = List();
    let jsArray = [];

    if (localStorage.getItem('wishlist')) {
      arr = fromJS(localStorage.getItem('wishlist').split(','));
      if (arr.contains(id.toString())) {
        arr = arr.filterNot((x) => id.toString() === x);
      } else {
        arr = arr.push(id.toString());
      }
      jsArray = arr.toJS();
      localStorage.setItem('wishlist', jsArray.toString());
    } else {
      arr = arr.push(id.toString());
      jsArray = arr.toJS();
      localStorage.setItem('wishlist', jsArray.toString());
    }

    mutateWishlist({ ...arr });
  };

  const ads = offers?.map((item) => {
    let image = '';

    if (item.sailmaster) {
      image = item.yacht?.main_picture_sailmaster.thumbnail;
    } else {
      image = item.yacht?.main_picture;
    }

    const periodFrom = moment(item.period_from?.substring(0, 10)).format('DD.MM.YYYY');
    const periodTo = moment(item.period_to?.substring(0, 10)).format('DD.MM.YYYY');

    // Get prices
    let clientPrice = parseFloat(item.client_price);
    const priceListPrice = parseFloat(item.price_list_price);

    // Get discount
    const discount =
      clientPrice !== priceListPrice ? Number(100 - (clientPrice * 100.0) / priceListPrice) : 0;

    let price = <div className="wishlist-offer-final-price">{`${formatMoney(clientPrice)}€`}</div>;

    if (discount > 0) {
      price = (
        <div>
          <div className="wishlist-offer-price-wrapper">
            <div className="wishlist-offer-price">{`${formatMoney(priceListPrice)}€`}</div>
            <div className="wishlist-offer-discount">{`-${discount}%`}</div>
          </div>
          <div className="wishlist-offer-final-price">{`${formatMoney(clientPrice)}€`}</div>
        </div>
      );
    }

    return (
      <Col xs={12} sm={6} md={3} className="wishlist-offer" key={item.id}>
        <div className="wishlist-offer-image">
          <div className="wishlist-close-wrapper" onClick={() => handleWishlistItemRemove(item.id)}>
            <Close />
          </div>
          <Link href={offerLink(item)}>
            <div className="wishlist-image" style={{ backgroundImage: `url(${image})` }} />
          </Link>
        </div>
        <div className="wishlist-offer-row">
          <div className="wishlist-offer-row--title">{t('yacht_type')}</div>
          <div className="wishlist-offer-row--value">
            {item.yacht?.yacht_model.category.name.name}
          </div>
        </div>

        <div className="wishlist-offer-row">
          <div className="wishlist-offer-row--title">{t('model')}</div>
          <div className="wishlist-offer-row--value">
            {item.yacht?.yacht_model.name.replace('cab.', t('cab'))}
          </div>
        </div>

        <div className="wishlist-offer-row">
          <div className="wishlist-offer-row--title">{t('build_year')}</div>
          <div className="wishlist-offer-row--value">{item.yacht?.build_year}</div>
        </div>

        <div className="wishlist-offer-row">
          <div className="wishlist-offer-row--title">{t('country')}</div>
          <div className="wishlist-offer-row--value">
            {item.yacht?.location.region.country.name.name}
          </div>
        </div>

        <div className="wishlist-offer-row">
          <div className="wishlist-offer-row--title">{t('marina')}</div>
          <div className="wishlist-offer-row--value wishlist-offer-row--marina">
            {item.yacht?.location.name.name}
          </div>
        </div>

        <div className="wishlist-offer-row">
          <div className="wishlist-offer-row--title">{t('cabins')}</div>
          <div className="wishlist-offer-row--value">
            {item.yacht?.cabins_total ? item.yacht.cabins_total : '/'}
          </div>
        </div>

        <div className="wishlist-offer-row">
          <div className="wishlist-offer-row--title">{t('people')}</div>
          <div className="wishlist-offer-row--value">
            {item.yacht?.berths_total ? item.yacht.berths_total : '/'}
          </div>
        </div>

        <div className="wishlist-offer-row">
          <div className="wishlist-offer-row--title">{t('wc')}</div>
          <div className="wishlist-offer-row--value">
            {item.yacht?.wc ? item.yacht.yacht_model.wc : '/'}
          </div>
        </div>

        <div className="wishlist-offer-row">
          <div className="wishlist-offer-row--title">{t('length')}</div>
          <div className="wishlist-offer-row--value">
            {item.yacht?.yacht_model.loa ? item.yacht.yacht_model.loa + 'm' : '/'}
          </div>
        </div>

        <div className="wishlist-offer-row">
          <div className="wishlist-offer-row--title">{t('width')}</div>
          <div className="wishlist-offer-row--value">
            {item.yacht?.yacht_model.beam ? item.yacht.yacht_model.beam + 'm' : '/'}
          </div>
        </div>

        <div className="wishlist-offer-row">
          <div className="wishlist-offer-row--title">{t('draft')}</div>
          <div className="wishlist-offer-row--value">
            {item.yacht?.draft ? item.yacht.draft + 'm' : '/'}
          </div>
        </div>

        <div className="wishlist-offer-row">
          <div className="wishlist-offer-row--title">{t('term')}</div>
          <div className="wishlist-offer-row--value">
            <div>{periodFrom}</div>
            <div>{periodTo}</div>
          </div>
        </div>

        <div className="wishlist-offer-row">
          <div className="wishlist-offer-row--title">{t('price')}</div>
          <div className="wishlist-offer-row--value">{price}</div>
        </div>
      </Col>
    );
  });

  return (
    <div className="wishlist">
      <Head>
        <title>
          {t('wishlist_seo_title')} - TheSailmaster.si | Najem jadrnice, katamarana, jahte - last
          minute
        </title>
        <meta name="description" content={t('wishlist_seo_description')} />
        <meta
          property="og:title"
          content={`${t(
            'wishlist_seo_title'
          )} - TheSailmaster.si | Najem jadrnice, katamarana, jahte - last minute`}
        />
        <meta property="og:description" content={t('wishlist_seo_description')} />
      </Head>

      <div className="wishlist-main">
        <div className="base-layout container">
          <h1>{`${t('wishlist_header')} (${wishlist?.size})`}</h1>
          <Row>
            <Col xs={12} sm={12} md={3} className="menu-side">
              <ul>
                <li>
                  <div className="anchor-wrapper">
                    <Anchor />
                    <span className="menu-class">{t('menu')}</span>
                  </div>
                </li>
                <li>
                  <button onClick={openEnquiryModal} className="gold-button">
                    {t('enquiry')}
                  </button>
                </li>
              </ul>
            </Col>
            <Col xs={12} sm={12} md={9} className="wishlist-wrapper">
              {offers && Array.from(offers).length ? (
                <Row>{ads}</Row>
              ) : (
                <Alert variant="warning">{t('wishlist_empty')}</Alert>
              )}
            </Col>
          </Row>
        </div>
      </div>

      <OfferInquiry
        show={showEnquiryModal}
        offerId={offerId}
        onClose={() => setShowEnquiryModal(false)}
        onSubmit={createOfferInquiry}
      />
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const translations = await serverSideTranslations(
    ctx.locale,
    ['najemplovil', 'common'],
    nextI18nextConfig
  );

  return {
    props: {
      ...translations,
    },
  };
};

export default Wishlist;
