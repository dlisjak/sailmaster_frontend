import { useCallback, useEffect, useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18nextConfig from '../../next-i18next.config';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import InfiniteScroll from 'react-infinite-scroller';
import Head from 'next/head';
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

import { createOfferInquiry } from '../../api/base';
import { formatOfferPeriod, formatOfferPrice } from '../../utils/offerUtils';
import { getValuesFromUrl, valuesToSearch } from '../../utils/search_utils';
import { handleHeartClick } from '../../utils/wishlistUtils';
import { wishlistClickedReducerAction } from '../../actions/wishlist';
import { getSearchResults } from '../../queries/getters';
import { OFFERS_URL } from '../../constants/urls';
import { useWishlist } from '../../queries/queries';

const NoResults = () => {
  const { t } = useTranslation();
  return (
    <div className="no-results">
      <Compass />
      <div className="no-results__text">{t('no_offers')}</div>
    </div>
  );
};

const OffersPage = ({ error, results, next, count, destination, loading }) => {
  const { t } = useTranslation();
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
  const [yachts, setYachts] = useState([]);
  const [loadNext, setLoadNext] = useState(next);
  const { wishlist, mutateWishlist } = useWishlist();

  useEffect(() => {
    setFilterValues(getValuesFromUrl(window.location.search));
    setYachts([]);
    setLoadNext(next);
  }, [router]);

  const handleLoadMore = useCallback(async () => {
    const { data } = await getSearchResults(loadNext);

    setYachts((prev) => [...prev, ...data.results]);
    setLoadNext(data.next);
  }, [loadNext]);

  return (
    <>
      <Head>
        <title>
          {t('seo_offers_title', {
            destination: destination ? `: ${destination.name}` : '',
          })}
        </title>
        <meta name="description" content={t('offers_seo_desc')} />
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
        <OffersHeader
          filterValues={filterValues}
          onSetOrdering={(o) =>
            router.push(`${OFFERS_URL}?${valuesToSearch({ ...filterValues, o })}`)
          }
          displayTotalPrice={displayTotalPrice}
          setDisplayTotalPrice={setDisplayTotalPrice}
        />
        {error && (
          <Alert className="mt-3" variant="danger">
            {t(error)}
          </Alert>
        )}
        {loading && <Loader />}
        {destination && <DestinationTeaser destination={destination} />}
        {![...results, ...yachts].length && <NoResults />}
        {count ? <p className="offers_num_result">{t('offers_num_result', { count })}</p> : ''}
        {[...results, ...yachts] && (
          <InfiniteScroll
            pageStart={0}
            loadMore={handleLoadMore}
            hasMore={!!loadNext}
            loader={<Loader key={0} />}
            threshold={1200}
          >
            {[...results, ...yachts]?.map((offer, index) => (
              <OfferTeaser
                displayTotalPrice={displayTotalPrice}
                key={offer.id}
                offer={offer}
                inWishlist={wishlist.array.contains(offer.id.toString())}
                handleHeartClick={(id) => {
                  const result = handleHeartClick(id);
                  console.log({ result });
                  return;
                  mutateWishlist({ ...result, success: true });
                  dispatch(
                    wishlistClickedReducerAction({
                      ...result,
                      success: true,
                    })
                  );
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
    ['home', 'common'],
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
