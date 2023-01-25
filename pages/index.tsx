import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../next-i18next.config.js';

import Header from '../components/Home/Header';
import Destinations from '../components/Destinations';
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
  getYachtBrands,
  getYachtTypes,
} from '../queries/getters.js';
import { subscribeNewsletter } from '../lib/base';

import { searchDestinations } from '../lib/search';
import { SWRConfig } from 'swr';
// import { OFFERS_URL } from '../constants/index';
// import { valuesToSearch } from '../utils/search_utils';

const Index = ({ fallback, yachtTypes, featuredYachts, destinations, testimonials, homeBlogs }) => {
  const { t } = useTranslation('home');

  return (
    <SWRConfig value={{ fallback }}>
      <div className="page-home">
        <Head>
          <title>{t('meta_title')}</title>
          <meta name="description" content={t('meta_description')} />
        </Head>

        <Header
          searchDestinations={searchDestinations}
          yachtTypes={yachtTypes}
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
            <Destinations destinations={destinations?.results} />
          </div>

          <Testimonials items={testimonials?.results} />
        </div>
        <HomeBlogs items={homeBlogs?.results} />
        <HomeNewsletter onSubmit={subscribeNewsletter} />
      </div>
    </SWRConfig>
  );
};

export const getStaticProps = async ({ locale }) => {
  const translations = await serverSideTranslations(locale, ['home', 'common'], nextI18NextConfig);
  const yachtTypes = await getYachtTypes();
  const yachtBrands = await getYachtBrands();
  const featuredYachts = await getFeaturedYachts();
  const destinations = await getDestinations(true);
  const testimonials = await getTestimonials();
  const homeBlogs = await getHomeBlogs();

  return {
    props: {
      yachtTypes,
      featuredYachts,
      destinations,
      testimonials,
      homeBlogs,
      ...translations,
      fallback: {
        '/api/yacht-brands': yachtBrands,
        '/api/testimonials': testimonials,
        '/api/yacht-types': yachtTypes,
      },
    },
    revalidate: 3600,
  };
};

export default Index;
