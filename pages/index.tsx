import nextI18NextConfig from '../next-i18next.config.js';
import { useTranslation } from 'next-i18next';
import { SWRConfig } from 'swr';
import Head from 'next/head';

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
          <title>{t('index_meta_title')}</title>
          <meta name="title" content={t('index_meta_title')} />
          <meta name="description" content={t('index_meta_description')} />

          <meta property="og:type" content="website" />
          <meta property="og:url" content={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/`} />
          <meta property="og:title" content={t('index_meta_title')} />
          <meta property="og:description" content={t('index_meta_description')} />
          <meta property="og:image" content={`/media/header-opt.jpg`} />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/`} />
          <meta property="twitter:title" content={t('index_meta_title')} />
          <meta property="twitter:description" content={t('index_meta_description')} />
          <meta property="twitter:image" content={`/media/header-opt.jpg`} />

          <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/`} />
        </Head>

        <Header />

        <div className="container container-xl mx-auto px-4">
          {/* {specialOffers.data && <HomeSpecialOffers specialOffers={specialOffers.data.results} />} */}

          <div className="page-home__block lg:py-4">
            <div className="page-home__title flex">
              <h2>{t('featured_yachts')}</h2>
            </div>
            <p className="mb-4 lg:mb-8">{t('featured_yachts_p')}</p>
            <FeaturedYachts items={featuredYachts} />
          </div>

          <div className="page-home__block lg:py-4">
            <HomeIcons />
          </div>

          <div className="page-home__block lg:py-4">
            <div className="page-home__title">
              <h2>{t('page_destinations_title')}</h2>
            </div>
            <p className="mb-4 lg:mb-8">{t('page_destinations_p')}</p>
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
  const serverSideTranslations = (await import('next-i18next/serverSideTranslations'))
    .serverSideTranslations;
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
