import { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'next-i18next';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { ThankYouMessage } from './ThankYouMessage';
import { RequiredLabel, Field, Checkbox, CountrySelect } from './forms/fields';

import { DEFAULT_COUNTRY } from '../constants/urls';
import { getCountryId } from '../utils/miscUtils';
import { createInquiry } from '../api/base';
import { useCountriesEnquiry } from '../queries/queries';

const InquiryModal = ({ showInquiry, onClose }) => {
  const { countriesEnquiry } = useCountriesEnquiry();
  const { t } = useTranslation('common');
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState(false);

  const selectedCountry = getCountryId(countriesEnquiry || [], DEFAULT_COUNTRY);
  const requiredMsg = t('form_field_required');
  const invalidEmail = t('form_field_email_invalid');
  const ValidationSchema = Yup.object().shape({
    name: Yup.string().required(requiredMsg),
    phone: Yup.string().required(requiredMsg),
    country: Yup.string().required(requiredMsg),
    email: Yup.string().email(invalidEmail).required(requiredMsg),
  });

  return (
    <Modal show={showInquiry} onHide={onClose} dialogClassName="inquiry-modal">
      <Modal.Header closeButton>
        <h4 className="modal-title">{t('inquiry_title')}</h4>
      </Modal.Header>
      <div className="modal-body">
        {error && <Alert variant="danger">{error}</Alert>}
        {!finished && (
          <Formik
            initialValues={{
              name: '',
              email: '',
              phone: '',
              address: '',
              country: selectedCountry,
              skipper: '',
            }}
            validationSchema={ValidationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setError(null);
              try {
                await createInquiry(values);
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
                <div className="form-group">
                  <Field
                    name="email"
                    label={<RequiredLabel name={t('inquiry_email')} />}
                    formikBag={formikBag}
                    type="email"
                  />
                </div>
                <div className="form-group">
                  <RequiredLabel name={t('inquiry_phone')} />
                  <Field
                    name="phone"
                    label={<RequiredLabel name={t('inquiry_phone')} />}
                    formikBag={formikBag}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group col-sm-6">
                    <Field name="address" label={t('inquiry_address')} formikBag={formikBag} />
                  </div>
                  <div className="form-group col-sm-6">
                    <CountrySelect
                      countries={countriesEnquiry}
                      name="country"
                      label={<RequiredLabel name={t('inquiry_country')} />}
                      formikBag={formikBag}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <Field
                    name="content"
                    as="textarea"
                    rows={5}
                    label={t('inquiry_comment')}
                    formikBag={formikBag}
                    placeholder={t('inquiry_comment_placeholder')}
                  />
                </div>
                {false && (
                  <div className="form-group">
                    <Checkbox
                      id="inquiry_skipper"
                      name="skipper"
                      label={t('inquiry_skipper')}
                      formikBag={formikBag}
                    />
                  </div>
                )}
                <Button type="submit" disabled={formikBag.isSubmitting}>
                  {t('inquiry_submit')}
                </Button>
              </form>
            )}
          </Formik>
        )}
        {finished && (
          <ThankYouMessage
            title={t('successful_enquiry')}
            content={<p>{t('inquiry_success')}</p>}
          />
        )}
      </div>
    </Modal>
  );
};

export default InquiryModal;
