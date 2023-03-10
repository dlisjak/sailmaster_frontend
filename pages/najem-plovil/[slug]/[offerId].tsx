import { useState } from 'react';

import { ConnectedBasicSearch } from '../../../components/filter/OfferFilter';
import OfferInquiry from '../../../components/OfferInquiry';
import OfferDetail from '../../../components/OfferDetail';
import NotFound from '../../../components/NotFound';

import { formatOfferPeriod, formatOfferPrice } from '../../../utils/offerUtils';
import { handleHeartClick } from '../../../utils/wishlistUtils';
import nextI18nextConfig from '../../../next-i18next.config';
import { createOfferInquiry } from '../../../lib/base';
import { useWishlist } from '../../../queries/queries';
import { yachtSlug } from '../../../utils/url_utils';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import { stripHtmlTags } from '../../../utils/miscUtils';

const OfferDetailPage = ({ offer }) => {
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const { wishlist, mutateWishlist } = useWishlist();
  const inWishlist = wishlist && Array.from(wishlist).includes(offer.yacht.id.toString());
  const { t } = useTranslation('common');

  if (!offer) {
    return <NotFound />;
  }

  const yacht = offer.yacht;
  const yacht_model = yacht.yacht_model;
  const pageTitle = `${yacht_model.category_name} - ${yacht_model.name}`;

  return (
    <>
      <Head>
        <title>{pageTitle + t('seo_title')}</title>
        <meta name="description" content={stripHtmlTags(yacht.get_description)} />
      </Head>
      <OfferDetail
        offer={offer}
        inWishlist={inWishlist}
        setShowEnquiryModal={setShowEnquiryModal}
        handleHeartClick={(id) => {
          const { array } = handleHeartClick(id);
          mutateWishlist({ ...array });
        }}
        searchComponent={<ConnectedBasicSearch />}
      />
      <OfferInquiry
        show={showEnquiryModal}
        offerId={offer.id}
        yachtModel={offer.yacht.yacht_model.name}
        yachtTerm={formatOfferPeriod(offer)}
        yachtPrice={formatOfferPrice(offer)}
        onClose={() => setShowEnquiryModal(false)}
        onSubmit={createOfferInquiry}
      />
    </>
  );
};

export const getStaticPaths = async () => {
  const fs = (await import('fs')).default;
  const data: any = fs.readFileSync('yachts.json');

  const arr = JSON.parse(data);

  const paths = arr.map((offer) => ({
    params: {
      slug: yachtSlug(offer.yacht.id, offer.yacht.yacht_model.name),
      offerId: `${offer.id}`,
    },
  }));

  return {
    paths,
    fallback: 'blocking', // can also be true or 'blocking'
  };
};

export const getStaticProps = async (ctx) => {
  const fetch = (await import('node-fetch')).default;
  const serverSideTranslations = (await import('next-i18next/serverSideTranslations'))
    .serverSideTranslations;
  const { offerId } = ctx.params;
  const translations = await serverSideTranslations(
    ctx.locale,
    ['home', 'common'],
    nextI18nextConfig
  );

  const url = process.env.NEXT_PUBLIC_API_URL + '/search/' + offerId + '/';
  const response = await fetch(url);
  const contentType = response.headers.get('content-type');
  let offer: any;
  if (contentType && contentType.indexOf('application/json') !== -1) {
    offer = await response.json();
  } else {
    return {
      notFound: true,
    };
  }

  if (!offer) {
    return {
      notFound: true,
    };
  }

  if (!!offer.detail) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      offer,
      ...translations,
    },
    // 12h
    revalidate: 60 * 60 * 12,
  };
};

export default OfferDetailPage;
