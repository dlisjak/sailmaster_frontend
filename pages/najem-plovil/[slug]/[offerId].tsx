import { useState } from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';

import { ConnectedBasicSearch } from '../../../components/filter/OfferFilter';
import OfferInquiry from '../../../components/OfferInquiry';
import OfferDetail from '../../../components/OfferDetail';
import NotFound from '../../../components/NotFound';

import { formatOfferPeriod, formatOfferPrice } from '../../../utils/offerUtils';
import { handleHeartClick } from '../../../utils/wishlistUtils';
import nextI18nextConfig from '../../../next-i18next.config';
import { createOfferInquiry } from '../../../lib/base';
import { useBlogLatest, useWishlist } from '../../../queries/queries';
import { yachtSlug } from '../../../utils/url_utils';
import { stripHtmlTags } from '../../../utils/miscUtils';
import { yachtLink } from '../../../utils/url_utils';

const OfferDetailPage = ({ offer, canonicalUrl }) => {
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const { wishlist, mutateWishlist } = useWishlist();
  const inWishlist = wishlist && Array.from(wishlist).includes(offer.id.toString());
  const { t } = useTranslation('common');
  const { posts } = useBlogLatest();

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
        <link rel="canonical" href={canonicalUrl} />
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
  const fetch = (await import('node-fetch')).default;

  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }

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

  const paths = yachts.map((offer) => ({
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

  console.log({ offerId });

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

  const slug = yachtLink(offer);
  const canonicalUrl = process.env.NEXT_PUBLIC_DOMAIN_URL + '/najem-plovil/' + slug;

  return {
    props: {
      offer,
      canonicalUrl,
      ...translations,
    },
    // 12h
    revalidate: 60 * 60 * 12,
  };
};

export default OfferDetailPage;
