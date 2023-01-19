import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useTranslation } from 'next-i18next';
import { Helmet } from 'react-helmet';
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
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18nextConfig from '../../next-i18next.config';
import { getSearchResults } from '../../queries/getters';
import { useRouter } from 'next/router';

import { OFFERS_URL } from '../../constants/urls';

const NoResults = () => {
  const { t } = useTranslation();
  return (
    <div className="no-results">
      <Compass />
      <div className="no-results__text">{t('no_offers')}</div>
    </div>
  );
};

const OffersPage = ({
  search,
  error,
  results,
  next,
  dispatch,
  wishlist,
  count,
  destination,
  loading,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [enquiryProps, setEnquiryProps] = useState({});
  const [displayTotalPrice, setDisplayTotalPrice] = useState(true);
  const [filterValues, setFilterValues] = useState({});

  useEffect(() => {
    setTimeout(() => {
      setFilterValues(getValuesFromUrl(window.location.search));
    }, 250);
  }, [router]);

  return (
    <>
      <Helmet>
        <title>
          {t('seo_offers_title', {
            destination: destination ? `: ${destination.name}` : '',
          })}
        </title>
        <meta name="description" content={t('offers_seo_desc')} />
      </Helmet>

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
        {!results?.length && <NoResults />}
        {count ? <p className="offers_num_result">{t('offers_num_result', { count })}</p> : ''}
        {results && (
          <InfiniteScroll
            pageStart={0}
            loadMore={() => next && dispatch({ type: 'SEARCH_LOAD_MORE', next })}
            hasMore={!!next}
            loader={<Loader key={0} />}
            threshold={1200}
          >
            {results.map((offer, index) => (
              <OfferTeaser
                displayTotalPrice={displayTotalPrice}
                key={offer.id}
                offer={offer}
                // inWishlist={wishlist.array.contains(offer.id.toString())}
                handleHeartClick={(id) => {
                  const result = handleHeartClick(id);
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
      {/* <OfferInquiry
        {...enquiryProps}
        onClose={() => setShowEnquiryModal(false)}
        show={showEnquiryModal}
        countries={countries}
        onSubmit={createOfferInquiry}
      /> */}
    </>
  );
};

function mapStateToProps(state) {
  return {
    error: state.search.error,
    results: state.search.results,
    next: state.search.next,
    loading: state.search.loading,
    wishlist: state.wishlist,
    destination: state.search.destination,
    count: state.search.count,
    yachtType: state.yachtType,
    brands: state.brands,
    countries: state.countriesEnquiry || [],
  };
}

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
      ...translations,
    },
  };
};

export default OffersPage;
