import { useTranslation } from 'next-i18next';
import Compass from '../components/icons/Compass';

import { Row, Col } from 'react-bootstrap';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18nextConfig from '../next-i18next.config';

const Custom404 = () => {
  const { t } = useTranslation('common');

  return (
    <div className="not-found">
      <div className="container">
        <Row className="row-not-found">
          <Col xs={12} sm={6} className="compass-wrapper">
            <Compass />
          </Col>

          <Col xs={12} sm={6} className="text-wrapper">
            <h1>{t('page_not_found')}</h1>
            <p>{t('page_not_found_text_1')}</p>
            <p dangerouslySetInnerHTML={{ __html: t('page_not_found_text_2') }} />
          </Col>
        </Row>
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
