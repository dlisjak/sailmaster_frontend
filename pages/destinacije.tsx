import { Helmet } from 'react-helmet';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18nextConfig from '../next-i18next.config';

import Destinations from '../components/Destinations';

import { getDestinations } from '../queries/getters';

const Destinacije = ({ destinations }) => {
  const { t } = useTranslation('common');

  return (
    <>
      <Helmet>
        <title>{t('seo_destinations_title') + t('seo_title')}</title>
        <meta name="description" content={t('seo_destinations_description')} />
      </Helmet>
      <div className="base-layout container">
        <h1>{t('page_destinations_title')}</h1>
        <Destinations destinations={destinations?.results} />
      </div>
    </>
  );
};

export const getStaticProps = async ({ locale }) => {
  const translations = await serverSideTranslations(locale, ['home', 'common'], nextI18nextConfig);
  const destinationsResponse = await getDestinations(locale, true);

  return {
    props: {
      destinations: destinationsResponse?.data,
      ...translations,
    },
    revalidate: 3600,
  };
};

export default Destinacije;
