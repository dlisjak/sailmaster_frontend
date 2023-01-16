import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../next-i18next.config.js';

import Header from '../components/Home/Header';
import Destinations from '../components/Destinations';
import HomeSpecialOffers from '../components/Home/HomeSpecialOffers';
import HomeIcons from '../components/Home/HomeIcons';
import HomeBlogs from '../components/Home/HomeBlogs';
import Testimonials from '../components/Testimonials';
import HomeNewsletter from '../components/Home/HomeNewsletter2';
import FeaturedYachts from '../components/FeaturedYachts';
import {
  getDestinations,
  getFeaturedYachts,
  getHomeBlogs,
  getTestimonials,
} from '../queries/getters.js';
import { subscribeNewsletter } from '../api/base';

import { searchDestinations } from '../api/search';
// import { OFFERS_URL } from '../constants/index';
// import { valuesToSearch } from '../utils/search_utils';

const Index = ({ featuredYachts, destinations, testimonials, homeBlogs }) => {
  const { i18n, t } = useTranslation('home');
  const lang = i18n.language;

  return (
    <div className="page-home">
      <Head>
        <title>{t('meta_title')}</title>
        <meta name="description" content={t('meta_description')} />
      </Head>

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

        <div className="page-home__block">
          <div className="page-home__title">
            <h2>{t('page_destinations_title')}</h2>
          </div>
          <Destinations items={destinations?.results} />
        </div>

        <Testimonials items={testimonials?.results} />
      </div>
      <HomeBlogs items={homeBlogs?.results} />
      <HomeNewsletter onSubmit={subscribeNewsletter} />
    </div>
  );
};

export const getStaticProps = async ({ locale }) => {
  const translations = await serverSideTranslations(locale, ['home', 'common'], nextI18NextConfig);
  const featuredYachtsResponse = await getFeaturedYachts(locale);
  const destinationsResponse = await getDestinations(locale, true);
  const testimonialsResponse = await getTestimonials(locale);
  const homeBlogsResponse = await getHomeBlogs(locale);

  return {
    props: {
      featuredYachts: featuredYachtsResponse?.data,
      destinations: destinationsResponse?.data,
      testimonials: testimonialsResponse?.data,
      homeBlogs: homeBlogsResponse?.data,
      ...translations,
    },
    revalidate: 3600,
  };
};

export default Index;
