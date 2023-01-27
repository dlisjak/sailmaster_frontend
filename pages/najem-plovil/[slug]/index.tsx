import { useState } from 'react';
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

const OfferDetailPage = ({ yachtOffer }) => {
  const { wishlist, mutateWishlist } = useWishlist();
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [filterValues, setFilterValues] = useState({});

  if (!yachtOffer) {
    return <NotFound />;
  }

  return (
    <>
      <OfferDetail
        offer={yachtOffer}
        inWishlist={wishlist && Array.from(wishlist).includes(yachtOffer.id.toString())}
        setShowEnquiryModal={setShowEnquiryModal}
        handleHeartClick={(id) => {
          const { array } = handleHeartClick(id);
          mutateWishlist({ ...array });
        }}
        searchComponent={<ConnectedBasicSearch />}
      />
      <OfferInquiry
        show={showEnquiryModal}
        offerId={yachtOffer.id}
        yachtModel={yachtOffer.yacht.yacht_model.name}
        yachtTerm={formatOfferPeriod(yachtOffer)}
        yachtPrice={formatOfferPrice(yachtOffer)}
        onClose={() => setShowEnquiryModal(false)}
        onSubmit={createOfferInquiry}
      />
    </>
  );
};

export const getStaticPaths = async () => {
  const fetch = (await import('node-fetch')).default;
  const url = process.env.NEXT_PUBLIC_API_URL + `/yachts/?limit=10&offset=10`;
  const response = await fetch(url);
  const data: any = await response.json();
  const count = data.count;
  const promises = [];

  // for (let i = 1; i < count; i++) {
  for (let i = 1; i < 70; i++) {
    const promise = new Promise((resolve, reject) => {
      setTimeout(async () => {
        const url = process.env.NEXT_PUBLIC_API_URL + `/yachts/?limit=10&offset=${10 * i}`;
        const response = await fetch(url);
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          const data: any = await response.json();
          if (data.results.length) resolve(data.results);
        } else {
          return response.text().then((text) => {
            reject(text);
          });
        }
      }, 1000 * i);
    });

    promises.push(promise);
  }

  const yachts = await Promise.all(promises).then((arr) => arr.flat());

  console.log(yachts);

  const paths = yachts.map((yacht) => ({
    params: { slug: yachtSlug(yacht.yacht_model.id, yacht.yacht_model.name) },
  }));

  return {
    paths,
    fallback: 'blocking', // can also be true or 'blocking'
  };
};

export const getStaticProps = async (ctx) => {
  const fetch = (await import('node-fetch')).default;
  const { slug } = ctx.params;
  const translations = await serverSideTranslations(
    ctx.locale,
    ['home', 'common'],
    nextI18nextConfig
  );

  const idx = slug.indexOf('-');
  const yachtId = slug.substring(0, idx);

  console.log({ yachtId });

  const url = process.env.NEXT_PUBLIC_API_URL + '/yacht-offer/' + yachtId + '/';
  const response = await fetch(url);
  const contentType = response.headers.get('content-type');
  let yachtOffer: any;
  if (contentType && contentType.indexOf('application/json') !== -1) {
    yachtOffer = await response.json();
  } else {
    return {
      notFound: true,
    };
  }

  if (!yachtOffer) {
    return {
      notFound: true,
    };
  }

  if (!!yachtOffer.detail) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      yachtOffer,
      ...translations,
    },
    revalidate: 3600 * 6,
  };
};

export default OfferDetailPage;
