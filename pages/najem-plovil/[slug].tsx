import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';
import { createOfferInquiry } from '../../api/base';
import { ConnectedBasicSearch } from '../../components/filter/OfferFilter';
import NotFound from '../../components/NotFound';
import OfferDetail from '../../components/OfferDetail';
import OfferInquiry from '../../components/OfferInquiry';

import nextI18nextConfig from '../../next-i18next.config';
import { getAllYachts, getYachtOffer } from '../../queries/getters';
import { useWishlist, useCountriesEnquiry } from '../../queries/queries';
import { formatOfferPeriod, formatOfferPrice } from '../../utils/offerUtils';
import { yachtSlug } from '../../utils/url_utils';
import { handleHeartClick } from '../../utils/wishlistUtils';

const OfferDetailPage = ({ yachtOffer }) => {
  const { wishlist, mutateWishlist } = useWishlist();
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [filterValues, setFilterValues] = useState({});

  console.log({ yachtOffer });

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
  const { count } = await getAllYachts();
  const promises = [];

  // for (let i = 1; i < count; i++) {
  for (let i = 1; i < 5; i++) {
    const promise = new Promise((resolve, reject) => {
      setTimeout(async () => {
        const { results } = await getAllYachts(10 * i);
        if (results.length) resolve(results);
      }, 1000 * i);
    });

    promises.push(promise);
  }

  const yachts = await Promise.all(promises).then((arr) => arr.flat());

  const paths = yachts.map((yacht) => ({
    params: { slug: yachtSlug(yacht.yacht_model.id, yacht.yacht_model.name) },
  }));

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
};

export const getStaticProps = async (ctx) => {
  const { slug } = ctx.params;
  const translations = await serverSideTranslations(
    ctx.locale,
    ['home', 'common'],
    nextI18nextConfig
  );

  const idx = slug.indexOf('-');
  const yachtId = slug.substring(0, idx);
  const yachtSlug = slug.substring(idx + 1);

  const yachtOffer = await getYachtOffer(yachtId);

  return {
    props: {
      yachtOffer,
      ...translations,
    },
  };
};

export default OfferDetailPage;
