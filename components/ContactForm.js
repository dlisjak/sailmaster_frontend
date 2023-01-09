import Alert from "react-bootstrap/Alert";
import React, { useState } from "react";
import { Formik } from "formik";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useTranslation } from 'next-i18next';
import Form from "react-bootstrap/Form";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";

import Mail from "components/icons/Mail";
import { ReactComponent as Phone } from "icons/phone.svg";
import Smartphone from "components/icons/Smartphone";
import Skype from "components/icons/SkypeNew";
import { RequiredLabel, Field } from "components/forms/fields";
import { ThankYouMessage } from "components/ThankYouMessage";

export const IdCard = () => {
  const { t } = useTranslation();
  return (

    <div className="contact-data">
      <div className="row">
        <Col xs={12} sm={6}>
          <ul>
            <li>{t("company_name")}</li>
            <li>{t("company_address")}</li>
            <li>{t("company_zip")}</li>
          </ul>
          <ul>
            <li>{t("tax_number")}</li>
            <li>{t("tax_payer")}</li>
            <li>{t("company_number")}</li>
          </ul>
        </Col>
        <Col xs={12} sm={6}>
          <ul className="icons-ul">
            <li>
              <div className="contact-icon">
                <Mail />
              </div>
              {t("mail")}
            </li>
            <li>
              <div className="contact-icon">
                <Skype />
              </div>
              {t("skype")}
            </li>
            <li>
              <div className="contact-icon">
                <Phone className="phone-icon" />
              </div>
              {t("phone386")}
            </li>
            <li>
              <div className="contact-icon">
                <Smartphone />
              </div>
              {t("mobile_phone386")}
            </li>
          </ul>
        </Col>

        <Col xs={12} sm={12} className="last-ul">
          <ul>
            <li>{t("contact_info_1")}</li>
            <li>{t("contact_info_2")}</li>
            <li>{t("contact_info_3")}</li>
          </ul>
        </Col>
      </div>
    </div>
  );
};

const ContactForm = ({ onSubmit }) => {
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState(false);
  const { t } = useTranslation();

  const requiredMsg = t("form_field_required");
  const invalidEmail = t("form_field_email_invalid");
  const ValidationSchema = Yup.object().shape({
    name: Yup.string().required(requiredMsg),
    phone: Yup.string().required(requiredMsg),
    email: Yup.string().email(invalidEmail).required(requiredMsg),
  });

  return (
    <>
      <p>{t("contact_text")}</p>
      {error && <Alert variant="danger">{error}</Alert>}
      {!finished && (
        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            comment: "",
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
              <Form.Group controlId="comment">
                <Field
                  name="comment"
                  as="textarea"
                  rows={5}
                  label={t("inquiry_comment")}
                  formikBag={formikBag}
                />
              </Form.Group>

              <Button type="submit" disabled={formikBag.isSubmitting}>
                {t("send_message")}
              </Button>
            </Form>
          )}
        </Formik>
      )}
      {finished && (
        <ThankYouMessage
          title={t("successful_email")}
          content={<p>{t("successful_email_1")}</p>}
        />
      )}
    </>
  );
};

export default ContactForm;
