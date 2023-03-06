import { useCallback, useEffect, useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import InfiniteScroll from 'react-infinite-scroller';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { SWRConfig } from 'swr';

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
import { getSearchResults, getSearchResultsFromApi } from '../../queries/getters';
import { createOfferInquiry } from '../../lib/base';
import { useSearch, useWishlist } from '../../queries/queries';
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

const OffersPage = ({ results, fallback, canonicalUrl }) => {
  const { t } = useTranslation('najemplovil');
  const router = useRouter();
  const search = router.asPath;

  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [enquiryProps, setEnquiryProps] = useState({
    offerId: null,
    yachtModel: null,
    yachtTerm: null,
    yachtPrice: null,
  });
  const [displayTotalPrice, setDisplayTotalPrice] = useState(true);
  const [filterValues, setFilterValues] = useState({});
  const { wishlist, mutateWishlist } = useWishlist();

  const [yachts, setYachts] = useState([]);
  const [loadNext, setLoadNext] = useState(null);
  const { data, isLoading } = useSearch(search);

  useEffect(() => {
    setFilterValues(getValuesFromUrl(window.location.search));
    setYachts([]);
    setLoadNext(data?.next);
  }, [data]);

  const handleLoadMore = useCallback(async () => {
    const { data: response } = await getSearchResults(loadNext);
    setYachts((prev) => [...new Set([...prev, ...response.results])]);

    setLoadNext(response.next);
  }, [loadNext]);

  return (
    <SWRConfig value={{ fallback }}>
      <Head>
        <title>
          {/* {t('rental_meta_title', {
            yachtType: yachtType ? yachtType : 'Plovil',
            destination: destination ? destination.name : 'na Jadranu',
          })} */}
        </title>
        <meta
          name="title"
          content={t('rental_meta_title', {
            // yachtType: yachtType ? yachtType : 'Plovil',
            // destination: destination ? destination.name : 'na Jadranu',
          })}
        />
        <meta name="description" content={t('rental_meta_description')} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta
          property="og:title"
          content={t('rental_meta_title', {
            // yachtType: yachtType ? yachtType : 'Plovil',
            // destination: destination ? destination.name : 'na Jadranu',
          })}
        />
        <meta property="og:description" content={t('rental_meta_description')} />
        <meta property="og:image" content={`/media/header-opt.jpg`} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta
          property="twitter:title"
          content={t('rental_meta_title', {
            // yachtType: yachtType ? yachtType : 'Plovil',
            // destination: destination ? destination.name : 'na Jadranu',
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
          {!data?.results && (
            <>
              <p className="offers_num_result">
                {t('offers_num_result', { count: results?.count })}
              </p>

              {results.map((offer, index) => (
                <OfferTeaser
                  priority={index < 2}
                  displayTotalPrice={displayTotalPrice}
                  key={offer.id}
                  offer={offer}
                  inWishlist={Array.from(wishlist).includes(offer.id.toString())}
                  handleHeartClick={(id) => {
                    const { array } = handleHeartClick(id);
                    mutateWishlist(array);
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
            </>
          )}
          {isLoading && <Loader />}

          <DestinationTeaser destination={data?.destination} />
          {!isLoading && !data?.count && <NoResults />}
          {data?.count && (
            <p className="offers_num_result">{t('offers_num_result', { count: data?.count })}</p>
          )}
          {data?.results.length > 0 && (
            <InfiniteScroll
              pageStart={0}
              loadMore={handleLoadMore}
              hasMore={!!loadNext}
              loader={<Loader key={0} />}
              threshold={1200}
            >
              <>
                {[...new Set([...data?.results, ...yachts])]?.map((offer, index) => {
                  return (
                    <OfferTeaser
                      priority={index < 2}
                      displayTotalPrice={displayTotalPrice}
                      key={offer.id}
                      offer={offer}
                      inWishlist={Array.from(wishlist).includes(offer.id.toString())}
                      handleHeartClick={(id) => {
                        const { array } = handleHeartClick(id);
                        mutateWishlist(array);
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
                  );
                })}
              </>
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
    </SWRConfig>
  );
};

export const getStaticProps = async ({ locale }) => {
  const translations = await serverSideTranslations(
    locale,
    ['najemplovil', 'common'],
    nextI18nextConfig
  );

  const { data } = await getSearchResultsFromApi();

  const canonicalUrl = '/najem-plovil';

  return {
    props: {
      results: data?.results,
      canonicalUrl: process.env.NEXT_PUBLIC_DOMAIN_URL + canonicalUrl,
      ...translations,
      fallback: {
        '/najem-plovil': data,
      },
    },
  };
};

export default OffersPage;
