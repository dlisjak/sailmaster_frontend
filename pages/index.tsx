import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../next-i18next.config.js';

// import { useTranslation } from 'react-i18next';
import { useTranslation } from 'next-i18next';
import Container from 'react-bootstrap/Container';
// import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Header from '../components/Home/Header';
// import { useAPI } from '../utils/hooks';
// import { getDestinations } from '../api/search';
// import getSpecialOffers from '../api/specialOffers';
// import { getHomeBlogs, getTestimonials, subscribeNewsletter, getFeaturedYachts } from '../api/base';
import Destinations from '../components/Destinations';
import DisplayComponent from '../components/DisplayComponent';
import HomeSpecialOffers from '../components/Home/HomeSpecialOffers';
import HomeIcons from '../components/Home/HomeIcons';
import HomeBlogs from '../components/Home/HomeBlogs';
import Testimonials from '../components/Testimonials';
import HomeNewsletter from '../components/Home/HomeNewsletter2';
import FeaturedYachts from '../components/FeaturedYachts';
import { getFeaturedYachts } from '../queries/getters.js';
import { searchDestinations } from '../api/search';
// import { searchDestinations } from '../api/search';
// import { OFFERS_URL } from '../constants/index';
// import { valuesToSearch } from '../utils/search_utils';

const Index = ({ featuredYachts }) => {
  const { i18n, t } = useTranslation('home');
  const lang = i18n.language;

  return (
    <div className="page-home">
      <Helmet>
        <title>{t('meta_title')}</title>
        <meta name="description" content={t('meta_description')} />
      </Helmet>
      <Header
        yachtType={[]}
        searchDestinations={searchDestinations}
        onSearch={(values) => {
          // history.push(OFFERS_URL + '?' + valuesToSearch(values));
        }}
      />
      <div className="container container-xl mx-auto px-4 py-8">
        {/* {specialOffers.data && <HomeSpecialOffers specialOffers={specialOffers.data.results} />} */}

        <div className="page-home__block">
          <div className="page-home__title">
            <h2>{t('featured_yachts')}</h2>
          </div>
          <FeaturedYachts items={featuredYachts?.results} />
        </div>

        <div className="page-home__block">
          <HomeIcons />
        </div>

        <Container className="page-home__block">
          <div className="page-home__title">
            <h2>{t('page_destinations_title')}</h2>
          </div>
          {/* <DisplayComponent
          source={destinations}
          render={(data) => <Destinations items={data.results} />}
        /> */}
        </Container>

        {/* {testimonials.data && <Testimonials items={testimonials.data.results} />} */}

        {/* <DisplayComponent source={blogs} render={(data) => <HomeBlogs items={data.results} />} /> */}

        {/* <HomeNewsletter onSubmit={subscribeNewsletter} /> */}
      </div>
    </div>
  );
};

export const getStaticProps = async ({ locale }) => {
  const featuredYachtsResponse = await getFeaturedYachts(locale);
  const translations = await serverSideTranslations(locale, ['home', 'common'], nextI18NextConfig);

  return {
    props: {
      featuredYachts: featuredYachtsResponse?.data,
      ...translations,
    },
    revalidate: 3600,
  };
};

export default Index;
