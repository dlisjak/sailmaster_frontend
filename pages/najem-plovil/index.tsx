import { useCallback, useEffect, useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18nextConfig from '../../next-i18next.config';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import InfiniteScroll from 'react-infinite-scroller';
import Alert from 'react-bootstrap/Alert';

import Loader from '../../components/Loader';
import Compass from '../../components/icons/Compass';
import OfferTeaser from '../../components/OfferTeaser';
import { LayoutWithSidebar } from '../../components/BaseLayout';
import DestinationTeaser from '../../components/DestinationTeaser';
import QuickContact from '../../components/QuickContact';
import OfferFilter from '../../components/filter/OfferFilter';
import OffersHeader from '../../components/OffersHeader';
import OfferInquiry from '../../components/OfferInquiry';
import SidebarTestimonials from '../../components/SidebarTestimonials';

import { createOfferInquiry } from '../../lib/base';
import { formatOfferPeriod, formatOfferPrice } from '../../utils/offerUtils';
import { getValuesFromUrl, valuesToSearch } from '../../utils/search_utils';
import { handleHeartClick } from '../../utils/wishlistUtils';
import { getSearchResults } from '../../queries/getters';
import { OFFERS_URL } from '../../constants/urls';
import { useWishlist } from '../../queries/queries';

const NoResults = () => {
  const { t } = useTranslation('common');
  return (
    <div className="no-results">
      <Compass />
      <div className="no-results__text">{t('no_offers')}</div>
    </div>
  );
};

const OffersPage = ({ error, results, next, count, destination, loading }) => {
  const { t } = useTranslation('najemplovil');
  const router = useRouter();
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [enquiryProps, setEnquiryProps] = useState({
    offerId: null,
    yachtModel: null,
    yachtTerm: null,
    yachtPrice: null,
  });
  const [displayTotalPrice, setDisplayTotalPrice] = useState(true);
  const [filterValues, setFilterValues] = useState({});
  const [yachts, setYachts] = useState(results);
  const [loadNext, setLoadNext] = useState(next);
  const { wishlist, mutateWishlist } = useWishlist();

  useEffect(() => {
    setFilterValues(getValuesFromUrl(window.location.search));
    setYachts(results);
    setLoadNext(next);
  }, [router]);

  const handleLoadMore = useCallback(async () => {
    const { data } = await getSearchResults(loadNext);
    setYachts((prev) => [...new Set([...prev, ...data.results])]);
    setLoadNext(data.next);
  }, [loadNext]);

  return (
    <>
      <Head>
        <title>
          {t('rental_meta_title', {
            destination: destination ? destination.name : 'na Jadranu',
          })}
        </title>
        <meta
          name="title"
          content={t('rental_meta_title', {
            destination: destination ? destination.name : 'na Jadranu',
          })}
        />
        <meta name="description" content={t('rental_meta_description')} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/najem-plovil`} />
        <meta
          property="og:title"
          content={t('rental_meta_title', {
            destination: destination ? destination.name : 'na Jadranu',
          })}
        />
        <meta property="og:description" content={t('rental_meta_description')} />
        <meta property="og:image" content={`/media/header-opt.jpg`} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/najem-plovil`}
        />
        <meta
          property="twitter:title"
          content={t('rental_meta_title', {
            destination: destination ? destination.name : 'na Jadranu',
          })}
        />
        <meta property="twitter:description" content={t('rental_meta_description')} />
        <meta property="twitter:image" content={`/media/header-opt.jpg`} />

        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/najem-plovil`} />
      </Head>

      <LayoutWithSidebar
        rowClassName="offers-row"
        mainClassName="offers-wrapper"
        className="offers"
        sidebar={
          <>
            <OfferFilter filterValues={filterValues} />
            <QuickContact />
            <SidebarTestimonials />
          </>
        }
      >
        <>
          <OffersHeader
            filterValues={filterValues}
            onSetOrdering={(o) =>
              router.push(`${OFFERS_URL}?${valuesToSearch({ ...filterValues, o })}`)
            }
            displayTotalPrice={displayTotalPrice}
            setDisplayTotalPrice={setDisplayTotalPrice}
          />
          {loading && <Loader />}
          {destination && <DestinationTeaser destination={destination} />}
          {!yachts.length && <NoResults />}
          {count && <p className="offers_num_result">{t('offers_num_result', { count })}</p>}
          {yachts.length > 0 && (
            <InfiniteScroll
              pageStart={0}
              loadMore={handleLoadMore}
              hasMore={!!loadNext}
              loader={<Loader key={0} />}
              threshold={1200}
            >
              {yachts?.map((offer, index) => (
                <OfferTeaser
                  displayTotalPrice={displayTotalPrice}
                  key={offer.id}
                  offer={offer}
                  inWishlist={wishlist && Array.from(wishlist).includes(offer.id.toString())}
                  handleHeartClick={(id) => {
                    const { array } = handleHeartClick(id);
                    mutateWishlist({ ...array });
                  }}
                  onEnquiry={() => {
                    setEnquiryProps({
                      offerId: offer.id,
                      yachtModel: offer.yacht.yacht_model.name,
                      yachtTerm: formatOfferPeriod(offer),
                      yachtPrice: formatOfferPrice(offer),
                    });
                    setShowEnquiryModal(true);
                  }}
                />
              ))}
            </InfiniteScroll>
          )}
        </>
      </LayoutWithSidebar>
      <OfferInquiry
        show={showEnquiryModal}
        onClose={() => setShowEnquiryModal(false)}
        onSubmit={createOfferInquiry}
        offerId={enquiryProps.offerId}
        yachtModel={enquiryProps.yachtModel}
        yachtTerm={enquiryProps.yachtTerm}
        yachtPrice={enquiryProps.yachtPrice}
      />
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const search = ctx.req.url;
  const { data } = await getSearchResults(search);
  const translations = await serverSideTranslations(
    ctx.locale,
    ['najemplovil', 'common'],
    nextI18nextConfig
  );

  return {
    props: {
      results: data?.results,
      destination: data?.destination || null,
      count: data?.count || null,
      next: data?.next || null,
      ...translations,
    },
  };
};

export default OffersPage;
