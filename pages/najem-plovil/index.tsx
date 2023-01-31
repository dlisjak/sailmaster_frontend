import { useCallback, useEffect, useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import InfiniteScroll from 'react-infinite-scroller';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Head from 'next/head';

import SidebarTestimonials from '../../components/SidebarTestimonials';
import DestinationTeaser from '../../components/DestinationTeaser';
import { LayoutWithSidebar } from '../../components/BaseLayout';
import OfferFilter from '../../components/filter/OfferFilter';
import OffersHeader from '../../components/OffersHeader';
import OfferInquiry from '../../components/OfferInquiry';
import QuickContact from '../../components/QuickContact';
import OfferTeaser from '../../components/OfferTeaser';
import Compass from '../../components/icons/Compass';
import Loader from '../../components/Loader';

import { formatOfferPeriod, formatOfferPrice } from '../../utils/offerUtils';
import { getValuesFromUrl, valuesToSearch } from '../../utils/search_utils';
import { handleHeartClick } from '../../utils/wishlistUtils';
import nextI18nextConfig from '../../next-i18next.config';
import { getSearchResults } from '../../queries/getters';
import { createOfferInquiry } from '../../lib/base';
import { useWishlist } from '../../queries/queries';
import { OFFERS_URL } from '../../constants/urls';

const NoResults = () => {
  const { t } = useTranslation('common');
  return (
    <div className="no-results">
      <Compass />
      <div className="no-results__text">{t('no_offers')}</div>
    </div>
  );
};

const OffersPage = ({ yachtType, results, next, count, destination, loading, canonicalUrl }) => {
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
            yachtType: yachtType ? yachtType : 'Plovil',
            destination: destination ? destination.name : 'na Jadranu',
          })}
        </title>
        <meta
          name="title"
          content={t('rental_meta_title', {
            yachtType: yachtType ? yachtType : 'Plovil',
            destination: destination ? destination.name : 'na Jadranu',
          })}
        />
        <meta name="description" content={t('rental_meta_description')} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta
          property="og:title"
          content={t('rental_meta_title', {
            yachtType: yachtType ? yachtType : 'Plovil',
            destination: destination ? destination.name : 'na Jadranu',
          })}
        />
        <meta property="og:description" content={t('rental_meta_description')} />
        <meta property="og:image" content={`/media/header-opt.jpg`} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta
          property="twitter:title"
          content={t('rental_meta_title', {
            yachtType: yachtType ? yachtType : 'Plovil',
            destination: destination ? destination.name : 'na Jadranu',
          })}
        />
        <meta property="twitter:description" content={t('rental_meta_description')} />
        <meta property="twitter:image" content={`/media/header-opt.jpg`} />

        <link rel="canonical" href={canonicalUrl} />
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
          <DestinationTeaser t={t} destination={destination} yachtType={yachtType} />
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
                  inWishlist={wishlist && Array.from(wishlist).includes(offer.yacht.id.toString())}
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
  const { destinations, yacht__yacht_model__category__yachtdisplaycategory } = ctx.query;
  const destination = data?.destination || null;
  const translations = await serverSideTranslations(
    ctx.locale,
    ['najemplovil', 'common'],
    nextI18nextConfig
  );

  const yachtTypes = [
    { id: 1, value: 'Jadrnice' },
    { id: 2, value: 'Katamarana' },
    { id: 10, value: 'Motornega katamarana' },
    { id: 6, value: 'Jahte' },
    { id: 5, value: 'Gumenjaka' },
    { id: 3, value: 'Guleta' },
    { id: 9, value: 'Luksuzne motorne jahte' },
    { id: 8, value: 'Luksuzne jadrnice' },
    { id: 4, value: 'Jet ski' },
    { id: 7, value: 'Trimarana' },
  ];

  const yachtType = yachtTypes.find(
    (type) => type.id == yacht__yacht_model__category__yachtdisplaycategory
  );

  const canonicalUrl =
    destination && !yachtType?.id
      ? `/najem-plovil?destinations=${destinations}`
      : !destination && yachtType?.id
      ? `/najem-plovil?yacht__yacht_model__category__yachtdisplaycategory=${yachtType?.id}`
      : destination && yachtType?.id
      ? `/najem-plovil?destinations=${destinations}&yacht__yacht_model__category__yachtdisplaycategory=${yachtType?.id}`
      : '/najem-plovil';

  return {
    props: {
      destination,
      yachtType: yachtType?.value || null,
      results: data?.results,
      count: data?.count || null,
      next: data?.next || null,
      canonicalUrl: process.env.NEXT_PUBLIC_DOMAIN_URL + canonicalUrl,
      ...translations,
    },
  };
};

export default OffersPage;
