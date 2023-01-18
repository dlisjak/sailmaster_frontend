import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Compass from '../components/icons/Compass';

import nextI18nextConfig from '../next-i18next.config';

const Custom404 = () => {
  const { t } = useTranslation('common');

  return (
    <div className="not-found">
      <div className="container">
        <div className="row row-not-found">
          <div className="compass-wrapper sm:w-1/2 pr-4 pl-4 w-full">
            <Compass />
          </div>

          <div className="text-wrapper sm:w-1/2 pr-4 pl-4 w-full">
            <h1>{t('page_not_found')}</h1>
            <p>{t('page_not_found_text_1')}</p>
            <p dangerouslySetInnerHTML={{ __html: t('page_not_found_text_2') }} />
          </div>
        </div>
      </div>
    </div>
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

export default Custom404;
