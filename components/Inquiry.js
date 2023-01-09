import Alert from "react-bootstrap/Alert";
import React, { useState } from "react";
import { Formik } from "formik";
import { useTranslation } from 'next-i18next';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import * as Yup from "yup";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { RequiredLabel, Field, Checkbox, CountrySelect } from "../components/forms/fields";
import { DEFAULT_COUNTRY } from "../constants/index";
import { getCountryId } from "../utils/miscUtils";
import { ThankYouMessage } from "../components/ThankYouMessage";

const InquiryModal = ({ onClose, onSubmit, countries = [] }) => {
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

  return (
    <Modal show={true}
      onHide={onClose}
      dialogClassName="inquiry-modal">
      <Modal.Header closeButton>
        <Modal.Title>{t("inquiry_title")}</Modal.Title>
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
              skipper: "",
            }}
            validationSchema={ValidationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setError(null);
              try {
                await onSubmit(values);
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
                <Form.Group controlId="email">
                  <Field
                    name="email"
                    label={<RequiredLabel name={t("inquiry_email")} />}
                    formikBag={formikBag}
                    type="email"
                  />
                </Form.Group>
                <Form.Group controlId="phone">
                  <Field
                    name="phone"
                    label={<RequiredLabel name={t("inquiry_phone")} />}
                    formikBag={formikBag}
                  />
                </Form.Group>
                <Form.Row>
                  <Form.Group controlId="address" as={Col} sm="6">
                    <Field
                      name="address"
                      label={t("inquiry_address")}
                      formikBag={formikBag}
                    />
                  </Form.Group>
                  <Form.Group controlId="country" as={Col} sm="6">
                    <CountrySelect
                      countries={countries}
                      name="country"
                      label={<RequiredLabel name={t("inquiry_country")} />}
                      formikBag={formikBag}
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Group controlId="content">
                  <Field
                    name="content"
                    as="textarea"
                    rows={5}
                    label={t("inquiry_comment")}
                    formikBag={formikBag}
                    placeholder={t("inquiry_comment_placeholder")}
                  />
                </Form.Group>
                {false &&
                  <Form.Group>
                    <Checkbox
                      id="inquiry_skipper"
                      name="skipper"
                      label={t("inquiry_skipper")}
                      formikBag={formikBag}
                    />
                  </Form.Group>
                }

                <Button type="submit" disabled={formikBag.isSubmitting}>
                  {t("inquiry_submit")}
                </Button>
              </Form>
            )}
          </Formik>
        )}
        {finished && (

          <ThankYouMessage
            title={t("successful_enquiry")}
            content={<p>{t("inquiry_success")}</p>}
          />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default InquiryModal;
