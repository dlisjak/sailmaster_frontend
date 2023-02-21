import { Helmet } from 'react-helmet';
import { useTranslation } from 'next-i18next';

import { LayoutQuickSearchSidebar } from '../components/BaseLayout';
import PartnerForm from '../components/PartnerForm';
import { createPartner } from '../lib/base';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18nextConfig from '../next-i18next.config';

function PartnersPage() {
  const { t } = useTranslation('common');

  return (
    <>
      <Helmet>
        <title>{t('partners_seo_title')}</title>
        <meta name="description" content={t('partners_seo_desc')} />
      </Helmet>
      <LayoutQuickSearchSidebar>
        <div className="page-inner">
          <h1>{t('for_partners')}</h1>
          <p>
            <span dangerouslySetInnerHTML={{ __html: t('partners_text') }} />
          </p>
          <PartnerForm onSubmit={createPartner} />
        </div>
      </LayoutQuickSearchSidebar>
    </>
  );
}

export const getStaticProps = async (ctx) => {
  const translations = await serverSideTranslations(ctx.locale, ['common'], nextI18nextConfig);

  return {
    props: {
      ...translations,
    },
  };
};

export default PartnersPage;
