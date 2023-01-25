import { Helmet } from 'react-helmet';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18nextConfig from '../next-i18next.config';

import { LayoutQuickSearchSidebar } from '../components/BaseLayout';
import ContactForm, { IdCard } from '../components/ContactForm';
import { createContact } from '../lib/base';

const Kontakt = (props) => {
  const { t } = useTranslation('common');

  return (
    <>
      <Helmet>
        <title>{t('contact_seo_title')}</title>
        <meta name="description" content={t('contact_seo_desc')} />
      </Helmet>
      <LayoutQuickSearchSidebar>
        <div className="page-inner">
          <h1>{t('contact_us')}</h1>
          <IdCard />
          <ContactForm onSubmit={createContact} />
        </div>
      </LayoutQuickSearchSidebar>
    </>
  );
};

export const getStaticProps = async ({ locale }) => {
  const translations = await serverSideTranslations(locale, ['common'], nextI18nextConfig);

  return {
    props: {
      ...translations,
    },
  };
};

export default Kontakt;
