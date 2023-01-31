import { useState } from 'react';
import fs from 'fs';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { createOfferInquiry } from '../../../lib/base';
import { ConnectedBasicSearch } from '../../../components/filter/OfferFilter';
import NotFound from '../../../components/NotFound';
import OfferDetail from '../../../components/OfferDetail';
import OfferInquiry from '../../../components/OfferInquiry';

import nextI18nextConfig from '../../../next-i18next.config';
import { useWishlist } from '../../../queries/queries';
import { formatOfferPeriod, formatOfferPrice } from '../../../utils/offerUtils';
import { handleHeartClick } from '../../../utils/wishlistUtils';
import { yachtSlug } from '../../../utils/url_utils';

const OfferDetailPage = ({ offer }) => {
  const { wishlist, mutateWishlist } = useWishlist();
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [filterValues, setFilterValues] = useState({});

  if (!offer) {
    return <NotFound />;
  }

  return (
    <>
      <OfferDetail
        offer={offer}
        inWishlist={wishlist && Array.from(wishlist).includes(offer.id.toString())}
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
  const data: any = fs.readFileSync('yachts.json');

  const paths = data.map((offer) => ({
    params: { slug: yachtSlug(offer.yacht.id, offer.yacht.yacht_model.name), offerId: offer.id },
  }));

  return {
    paths,
    fallback: 'blocking', // can also be true or 'blocking'
  };
};

export const getStaticProps = async (ctx) => {
  const fetch = (await import('node-fetch')).default;
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
