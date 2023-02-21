import Alert from "react-bootstrap/Alert";
import React, { useState } from "react";
import { Formik } from "formik";
import { useTranslation } from 'next-i18next';
import Form from "react-bootstrap/Form";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";

import {
  RequiredLabel,
  Field,
  DefaultSelectField,
} from "../components/forms/fields";
import { ThankYouMessage } from "../components/ThankYouMessage";

const PartnerForm = ({ onSubmit }) => {
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState(false);
  const { t } = useTranslation("common");

  const requiredMsg = t("form_field_required");
  const invalidEmail = t("form_field_email_invalid");
  const ValidationSchema = Yup.object().shape({
    person: Yup.string().required(requiredMsg),
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
            type: "charter podjetje",
            person: "",
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
                <DefaultSelectField
                  name="type"
                  label={<RequiredLabel name={t("partner_type")} />}
                  formikBag={formikBag}
                  items={[
                    { id: "charter podjetje", name: t("partner_type_1") },
                    { id: "skiper", name: t("partner_type_2") },
                    { id: "hostesa", name: t("partner_type_3") },
                    { id: "ostalo", name: t("partner_type_4") },
                  ]}
                />
              </Form.Group>
              <Form.Group controlId="person" className="mt-3">
                <Field
                  name="person"
                  label={<RequiredLabel name={t("inquiry_name")} />}
                  formikBag={formikBag}
                />
              </Form.Group>
              <Form.Group controlId="email" className="mt-3">
                <Field
                  name="email"
                  label={<RequiredLabel name={t("inquiry_email")} />}
                  formikBag={formikBag}
                  type="email"
                />
              </Form.Group>
              <Form.Group controlId="phone" className="mt-3">
                <Field
                  name="phone"
                  label={<RequiredLabel name={t("inquiry_phone")} />}
                  formikBag={formikBag}
                />
              </Form.Group>
              <Form.Group controlId="comment" className="mt-3">
                <Field
                  name="comment"
                  as="textarea"
                  rows={5}
                  label={t("inquiry_comment")}
                  formikBag={formikBag}
                />
              </Form.Group>

              <Button className="mt-4" type="submit" disabled={formikBag.isSubmitting}>
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

export default PartnerForm;
