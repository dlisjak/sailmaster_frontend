import Alert from "react-bootstrap/Alert";
import React, { useState } from "react";
import { Formik } from "formik";
import { useTranslation } from 'next-i18next';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import * as Yup from "yup";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { language } from "../constants";
import {
  RequiredLabel,
  Field,
  Checkbox,
  CountrySelect,
} from "components/forms/fields";
import { DEFAULT_COUNTRY } from "constants/index";
import { getCountryId } from "utils/miscUtils";
import { ThankYouMessage } from "components/ThankYouMessage";

const Details = ({ yachtModel, yachtTerm, yachtPrice }) => {
  const { t } = useTranslation();
  return (
    <div className="inquiry__header-description">
      {yachtModel && (
        <div className="enquiry-modal-title-data-item">
          <span>{t("model")}:</span> {yachtModel}
        </div>
      )}

      {yachtTerm && (
        <div className="enquiry-modal-title-data-item">
          <span>{t("term")}:</span> {yachtTerm}
        </div>
      )}

      {yachtPrice && (
        <div className="enquiry-modal-title-data-item">
          <span>{t("price")}:</span> {yachtPrice}
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
  countries = [],
  yachtModel,
  yachtTerm,
  yachtPrice,
}) => {
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState(false);
  const { t } = useTranslation();

  const requiredMsg = t("form_field_required");
  const invalidEmail = t("form_field_email_invalid");
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
    <Modal
      show={show}
      onHide={onCloseClearMessage}
      dialogClassName="inquiry-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {t("enquiry")}
          <Details
            yachtModel={yachtModel}
            yachtTerm={yachtTerm}
            yachtPrice={yachtPrice}
          />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {!finished && (
          <Formik
            initialValues={{
              name: "",
              email: "",
              phone: "",
              address: "",
              country: getCountryId(countries, DEFAULT_COUNTRY),
            }}
            validationSchema={ValidationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setError(null);
              try {
                await onSubmit({ id: offerId, ...values });
                setFinished(true);
              } catch (e) {
                setError("error");
              }
            }}
          >
            {(formikBag) => (
              <Form noValidate onSubmit={formikBag.handleSubmit}>
                <Form.Group controlId="name">
                  <Field
                    name="name"
                    label={<RequiredLabel name={t("inquiry_name")} />}
                    formikBag={formikBag}
                  />
                </Form.Group>
                <Form.Row>
                  <Form.Group controlId="email" as={Col} sm="6">
                    <Field
                      name="email"
                      label={<RequiredLabel name={t("inquiry_email")} />}
                      formikBag={formikBag}
                      type="email"
                    />
                  </Form.Group>
                  <Form.Group controlId="phone" as={Col} sm="6">
                    <Field
                      name="phone"
                      label={<RequiredLabel name={t("inquiry_phone")} />}
                      formikBag={formikBag}
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group controlId="address" as={Col} sm="6">
                    <Field
                      name="address"
                      label={t("inquiry_address")}
                      formikBag={formikBag}
                    />
                  </Form.Group>
                  <Form.Group controlId="zip" as={Col} sm="6">
                    <Field
                      name="zip"
                      label={t("inquiry_zip_code")}
                      formikBag={formikBag}
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Group controlId="country">
                  <CountrySelect
                    countries={countries}
                    name="country"
                    label={<RequiredLabel name={t("inquiry_country")} />}
                    formikBag={formikBag}
                  />
                </Form.Group>
                <Form.Group controlId="comment">
                  <Field
                    name="comment"
                    as="textarea"
                    rows={5}
                    label={t("inquiry_comment")}
                    formikBag={formikBag}
                  />
                </Form.Group>
                {false && (
                  <Form.Group>
                    <Checkbox
                      id="inquiry_skipper"
                      name="skipper"
                      label={t("inquiry_skipper")}
                      formikBag={formikBag}
                    />
                  </Form.Group>
                )}

                <Button type="submit" disabled={formikBag.isSubmitting}>
                  {t("send_enquiry")}
                </Button>
              </Form>
            )}
          </Formik>
        )}
        {finished && (
          <ThankYouMessage
            title={t("successful_enquiry")}
            content={<p>{t("successful_enquiry_message")}</p>}
          >
            {language === "si" && (
              <a
                className="enquiry-link"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.vzajemna.si/sl/zavarovanja/zavarovanje-za-tujino/o-zavarovanju-za-tujino/?utm_source=sailmaster&utm_medium=banner&utm_campaign=tujina"
              >
                <img src="/static/media/vzajemna-2021.jpg" alt="vzajemna" />
              </a>
            )}
          </ThankYouMessage>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default OfferInquiry;
