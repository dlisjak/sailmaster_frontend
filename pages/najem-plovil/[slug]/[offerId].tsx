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

// export const getStaticPaths = async () => {
//   const url = process.env.NEXT_PUBLIC_API_URL + `/yachts/?limit=10&offset=10`;
//   const response = await fetch(url);
//   const data: any = await response.json();
//   const count = data.count;
//   const promises = [];

//   // for (let i = 1; i < count; i++) {
//   for (let i = 1; i < 20; i++) {
//     const promise = new Promise((resolve, reject) => {
//       setTimeout(async () => {
//         const url = process.env.NEXT_PUBLIC_API_URL + `/yachts/?limit=10&offset=${10 * i}`;
//         const response = await fetch(url);
//         const contentType = response.headers.get('content-type');
//         if (contentType && contentType.indexOf('application/json') !== -1) {
//           const data: any = await response.json();
//           if (data.results.length) resolve(data.results);
//         } else {
//           return response.text().then((text) => {
//             reject(text);
//           });
//         }
//       }, 1000 * i);
//     });

//     promises.push(promise);
//   }

//   const yachts = await Promise.all(promises).then((arr) => arr.flat());

//   const paths = yachts.map((yacht) => ({
//     params: { slug: yachtSlug(yacht.yacht_model.id, yacht.yacht_model.name) },
//   }));

//   return {
//     paths,
//     fallback: false, // can also be true or 'blocking'
//   };
// };

export const getServerSideProps = async (ctx) => {
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
  };
};

export default OfferDetailPage;
