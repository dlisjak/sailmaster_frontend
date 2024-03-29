import { useState } from 'react';

import OfferDetail from '../../../components/OfferDetail';
import OfferInquiry from '../../../components/OfferInquiry';
import NotFound from '../../../components/NotFound';
import { ConnectedBasicSearch } from '../../../components/filter/OfferFilter';

import { createOfferInquiry } from '../../../lib/base';
import nextI18nextConfig from '../../../next-i18next.config';
import { useWishlist } from '../../../queries/queries';
import { formatOfferPeriod, formatOfferPrice } from '../../../utils/offerUtils';
import { handleHeartClick } from '../../../utils/wishlistUtils';
import { yachtSlug } from '../../../utils/url_utils';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import { stripHtmlTags } from '../../../utils/miscUtils';

const OfferDetailPage = ({ yachtOffer, canonicalUrl }) => {
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const { wishlist, mutateWishlist } = useWishlist();
  const inWishlist = wishlist && Array.from(wishlist).includes(yachtOffer.id.toString());
  const { t } = useTranslation('common');

  if (!yachtOffer) {
    return <NotFound />;
  }

  const yacht = yachtOffer.yacht;
  const yacht_model = yacht.yacht_model;
  const pageTitle = `${yacht_model.category_name} - ${yacht_model.name}`;

  return (
    <>
      <Head>
        <title>{pageTitle + t('seo_title')}</title>
        <meta name="description" content={stripHtmlTags(yacht.get_description)} />
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <OfferDetail
        offer={yachtOffer}
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

  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }

  console.log('getStaticPaths');

  const url = process.env.NEXT_PUBLIC_API_URL + `/search/?limit=10&offset=10`;
  const response = await fetch(url);
  const data: any = await response.json();
  const count = data.count;
  const promises = [];

  for (let i = 0; i < Math.ceil(count / 10); i++) {
    const promise = new Promise((resolve, reject) => {
      setTimeout(async () => {
        const url = process.env.NEXT_PUBLIC_API_URL + `/search/?limit=10&offset=${10 * i}`;
        const response = await fetch(url);
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          const data: any = await response.json();
          return resolve(data.results);
        } else {
          return response.text().then((text) => {
            console.log(text);
            return reject(text);
          });
        }
      }, 100 * i);
    });

    promises.push(promise);
  }

  const yachts = await Promise.all(promises).then((arr) => arr.flat());
  console.log(yachts.length);

  const paths = yachts.map(({ yacht }) => ({
    params: { slug: yachtSlug(yacht.id, yacht.yacht_model.name) },
  }));

  return {
    paths,
    fallback: 'blocking', // can also be true or 'blocking'
  };
};

export const getStaticProps = async (ctx) => {
  const serverSideTranslations = (await import('next-i18next/serverSideTranslations'))
    .serverSideTranslations;
  const fetch = (await import('node-fetch')).default;
  const { slug } = ctx.params;

  const idx = slug.indexOf('-');
  const yachtId = slug.substring(0, idx);

  const translations = await serverSideTranslations(
    ctx.locale,
    ['home', 'common'],
    nextI18nextConfig
  );

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

  const canonicalUrl = process.env.NEXT_PUBLIC_DOMAIN_URL + '/najem-plovil/' + slug;

  return {
    props: {
      yachtOffer,
      canonicalUrl,
      ...translations,
    },
    // 12h
    revalidate: 60 * 60 * 12,
  };
};

export default OfferDetailPage;
