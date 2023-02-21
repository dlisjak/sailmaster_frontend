import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

import FilterSideWrapper from '../components/common/FilterSideWrapper';
import Faq from '../components/Faq';
import nextI18nextConfig from '../next-i18next.config';

const FaqPage = () => {
  const { t } = useTranslation('common');

  return (
    <FilterSideWrapper>
      <div className="faq-page page-inner">
        <h1>{t('seo_faq_title')}</h1>
        <Head>
          <title>{t('seo_faq_title')}</title>
          <meta name="description" content={t('seo_faq_description')} />
        </Head>
        <Faq
          items={[
            { title: t('faq_1_title'), content: t('faq_1_content') },
            { title: t('faq_2_title'), content: t('faq_2_content') },
            { title: t('faq_3_title'), content: t('faq_3_content') },
            { title: t('faq_4_title'), content: t('faq_4_content') },
            { title: t('faq_5_title'), content: t('faq_5_content') },
          ]}
        />
      </div>
    </FilterSideWrapper>
  );
};

export const getStaticProps = async (ctx) => {
  const translations = await serverSideTranslations(ctx.locale, ['common'], nextI18nextConfig);

  return {
    props: {
      ...translations,
    },
  };
};

export default FaqPage;
