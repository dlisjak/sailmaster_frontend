import Alert from 'react-bootstrap/Alert';
import { useState } from 'react';
import { Formik } from 'formik';
import { useTranslation } from 'next-i18next';
import * as Yup from 'yup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { RequiredLabel, Field, Checkbox, CountrySelect } from '../components/forms/fields';
import { ThankYouMessage } from '../components/ThankYouMessage';
import { DEFAULT_COUNTRY } from '../constants/urls';
import { getCountryId } from '../utils/miscUtils';
import { useCountriesEnquiry } from '../queries/queries';

const language = process.env.NEXT_PUBLIC_REACT_APP_LANGUAGE;

const Details = ({ yachtModel, yachtTerm, yachtPrice }) => {
  const { t } = useTranslation('common');
  return (
    <div className="inquiry__header-description">
      {yachtModel && (
        <div className="enquiry-modal-title-data-item">
          <span>{t('model')}:</span> {yachtModel}
        </div>
      )}

      {yachtTerm && (
        <div className="enquiry-modal-title-data-item">
          <span>{t('term')}:</span> {yachtTerm}
        </div>
      )}

      {yachtPrice && (
        <div className="enquiry-modal-title-data-item">
          <span>{t('price')}:</span> {yachtPrice}
        </div>
      )}
    </div>
  );
};

const OfferInquiry = ({
  offerId,
  show,
  onClose,
  onSubmit,
  yachtModel = null,
  yachtTerm = null,
  yachtPrice = null,
}) => {
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState(false);
  const { t } = useTranslation('common');
  const { countriesEnquiry } = useCountriesEnquiry();

  const requiredMsg = t('form_field_required');
  const invalidEmail = t('form_field_email_invalid');
  const ValidationSchema = Yup.object().shape({
    name: Yup.string().required(requiredMsg),
    phone: Yup.string().required(requiredMsg),
    country: Yup.string().required(requiredMsg),
    email: Yup.string().email(invalidEmail).required(requiredMsg),
  });

  const onCloseClearMessage = () => {
    setFinished(false);
    onClose();
  };

  return (
    <Modal show={show} onHide={onCloseClearMessage} dialogClassName="inquiry-modal">
      <Modal.Header closeButton>
        <Modal.Title>
          {t('enquiry')}
          <Details yachtModel={yachtModel} yachtTerm={yachtTerm} yachtPrice={yachtPrice} />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {!finished && (
          <Formik
            initialValues={{
              name: '',
              email: '',
              phone: '',
              address: '',
              country: getCountryId(countriesEnquiry, DEFAULT_COUNTRY),
            }}
            validationSchema={ValidationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setError(null);
              try {
                await onSubmit({ id: offerId, ...values });
                setFinished(true);
              } catch (e) {
                setError(e);
              }
            }}
          >
            {(formikBag) => (
              <form noValidate onSubmit={formikBag.handleSubmit}>
                <div className="form-group">
                  <Field
                    name="name"
                    label={<RequiredLabel name={t('inquiry_name')} />}
                    formikBag={formikBag}
                  />
                </div>
                <div className="form-row">
                  <div className="mb-4 w-full pr-1 pl-1 sm:w-1/2">
                    <Field
                      name="email"
                      label={<RequiredLabel name={t('inquiry_email')} />}
                      formikBag={formikBag}
                      type="email"
                    />
                  </div>
                  <div className="mb-4 w-full pr-1 pl-1 sm:w-1/2">
                    <Field
                      name="phone"
                      label={<RequiredLabel name={t('inquiry_phone')} />}
                      formikBag={formikBag}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="mb-4 w-full pr-1 pl-1 sm:w-1/2">
                    <Field name="address" label={t('inquiry_address')} formikBag={formikBag} />
                  </div>
                  <div className="mb-4 w-full pr-1 pl-1 sm:w-1/2">
                    <Field name="zip" label={t('inquiry_zip_code')} formikBag={formikBag} />
                  </div>
                </div>
                <div className="mb-4">
                  <CountrySelect
                    countries={countriesEnquiry}
                    name="country"
                    label={<RequiredLabel name={t('inquiry_country')} />}
                    formikBag={formikBag}
                  />
                </div>
                <div className="mb-4">
                  <Field
                    name="comment"
                    as="textarea"
                    rows={5}
                    label={t('inquiry_comment')}
                    formikBag={formikBag}
                  />
                </div>
                {false && (
                  <div className="mb-4">
                    <Checkbox
                      id="inquiry_skipper"
                      name="skipper"
                      label={t('inquiry_skipper')}
                      formikBag={formikBag}
                    />
                  </div>
                )}

                <Button type="submit" disabled={formikBag.isSubmitting}>
                  {t('send_enquiry')}
                </Button>
              </form>
            )}
          </Formik>
        )}
        {finished && (
          <ThankYouMessage
            title={t('successful_enquiry')}
            content={<p>{t('successful_enquiry_message')}</p>}
          >
            {language === 'si' && (
              <a
                className="enquiry-link"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.vzajemna.si/sl/zavarovanja/zavarovanje-za-tujino/o-zavarovanju-za-tujino/?utm_source=sailmaster&utm_medium=banner&utm_campaign=tujina"
              >
                <img src="/media/vzajemna-2021.jpg" alt="vzajemna" />
              </a>
            )}
          </ThankYouMessage>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default OfferInquiry;
