import Head from 'next/head';
import { SWRConfig } from 'swr';
import { useRouter } from 'next/router';
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

const Index = ({ fallback, featuredYachts, destinations, testimonials, homeBlogs }) => {
  const { t } = useTranslation('home');

  return (
    <SWRConfig value={{ fallback }}>
      <div className="page-home">
        <Head>
          <title>{t('meta_title')}</title>
          <meta name="description" content={t('meta_description')} />
        </Head>

        <Header />

        <div className="container container-xl mx-auto px-4 py-8">
          {/* {specialOffers.data && <HomeSpecialOffers specialOffers={specialOffers.data.results} />} */}

          <div className="page-home__block">
            <div className="page-home__title">
              <h2>{t('featured_yachts')}</h2>
            </div>
            <FeaturedYachts items={featuredYachts} />
          </div>

          <div className="page-home__block">
            <HomeIcons />
          </div>

          <div className="page-home__block">
            <div className="page-home__title">
              <h2>{t('page_destinations_title')}</h2>
            </div>
            <Destinations items={destinations} />
          </div>

          <Testimonials items={testimonials} />
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
  const testimonials = await getTestimonials(4);
  const homeBlogs = await getHomeBlogs();

  return {
    props: {
      destinations,
      homeBlogs,
      ...translations,
      fallback: {
        '/api/featured-yachts': featuredYachts,
        '/api/destinations': destinations,
        '/api/yacht-brands': yachtBrands,
        '/api/testimonials': testimonials,
        '/api/yacht-types': yachtTypes,
      },
    },
    revalidate: 3600,
  };
};

export default Index;
