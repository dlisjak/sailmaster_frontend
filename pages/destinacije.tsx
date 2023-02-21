import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18nextConfig from '../next-i18next.config';

import Destinations from '../components/Destinations';

import { getDestinations } from '../queries/getters';
import Head from 'next/head';

const Destinacije = ({ destinations }) => {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{t('seo_destinations_title') + t('seo_title')}</title>
        <meta name="description" content={t('seo_destinations_description')} />
      </Head>
      <div className="base-layout container">
        <h1>{t('page_destinations_title')}</h1>
        <Destinations items={destinations} />
      </div>
    </>
  );
};

export const getStaticProps = async ({ locale }) => {
  const translations = await serverSideTranslations(locale, ['common'], nextI18nextConfig);
  const destinationsResponse = await getDestinations(true);

  return {
    props: {
      destinations: destinationsResponse,
      ...translations,
    },
    revalidate: 3600,
  };
};

export default Destinacije;
